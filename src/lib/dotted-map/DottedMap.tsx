import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  type MouseEvent as ReactMouseEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { LAND_POINTS } from "./land-points";
import { clusterByGeo } from "./clustering";
import { resolveTheme } from "./theme";
import type {
  DottedMapProps,
  ViewMode,
  HitTarget,
  MarkerData,
  AnimCluster,
} from "./types";

const DEG = Math.PI / 180;
const TWO_PI = Math.PI * 2;

export interface DottedMapRef {
  zoomIn: () => void;
  zoomOut: () => void;
  getZoom: () => number;
}

export const DottedMap = forwardRef<DottedMapRef, DottedMapProps>(function DottedMap({
  markers,
  defaultViewMode = "flat",
  viewMode: controlledViewMode,
  onViewModeChange,
  activeMarkerIds,
  onMarkerClick,
  theme,
  darkMode,
  className,
  style,
  renderMarker,
  initialRotation = [0, -20],
  initialZoom = 1,
  autoRotate: autoRotateProp = true,
  zoomRange = [0.5, 6],
  clusterCellDegrees,
}, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const rotationRef = useRef<[number, number, number]>([
    initialRotation[0],
    initialRotation[1],
    0,
  ]);
  const panOffsetRef = useRef<[number, number]>([0, 0]);
  const zoomRef = useRef(initialZoom);
  const targetZoomRef = useRef(initialZoom);

  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const lastMouseRef = useRef<[number, number]>([0, 0]);
  const velocityRef = useRef<[number, number]>([0, 0]);
  const autoRotateRef = useRef(autoRotateProp);

  const isControlled = controlledViewMode !== undefined;
  const [internalViewMode, setInternalViewMode] =
    useState<ViewMode>(defaultViewMode);
  const viewMode = isControlled ? controlledViewMode : internalViewMode;

  const setViewMode = useCallback(
    (mode: ViewMode) => {
      if (!isControlled) setInternalViewMode(mode);
      onViewModeChange?.(mode);
    },
    [isControlled, onViewModeChange]
  );

  const transitionRef = useRef(defaultViewMode === "globe" ? 1 : 0);
  const targetTransitionRef = useRef(defaultViewMode === "globe" ? 1 : 0);
  const viewModeRef = useRef<ViewMode>(defaultViewMode);

  const hitTargetsRef = useRef<HitTarget[]>([]);
  const clusterElsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const animClustersRef = useRef<AnimCluster[]>([]);

  // Resolve active IDs into a Set
  const activeSet = useMemo(() => {
    if (!activeMarkerIds) return new Set<string>();
    if (activeMarkerIds instanceof Set) return activeMarkerIds;
    return new Set(activeMarkerIds);
  }, [activeMarkerIds]);

  // Zoom-adaptive clustering
  const baseCellDeg = clusterCellDegrees ?? 15;
  const [clusterCellDeg, setClusterCellDeg] = useState(baseCellDeg);
  const geoClusters = useMemo(
    () => clusterByGeo(markers, clusterCellDeg, activeSet),
    [markers, clusterCellDeg, activeSet]
  );

  const clusterData = useMemo(() => {
    return geoClusters.map((gc) => ({
      cluster: gc,
      λ: gc.avgLng * DEG,
      cosφ: Math.cos(gc.avgLat * DEG),
      sinφ: Math.sin(gc.avgLat * DEG),
      lng: gc.avgLng,
      lat: gc.avgLat,
    }));
  }, [geoClusters]);

  const clusterDataRef = useRef(clusterData);
  clusterDataRef.current = clusterData;

  // Theme: auto-detect dark mode or use prop
  const colorsRef = useRef({
    isDark: false,
    colors: resolveTheme(false, theme),
  });

  useEffect(() => {
    const check = () => {
      const isDark =
        darkMode ?? document.documentElement.classList.contains("dark");
      if (isDark !== colorsRef.current.isDark) {
        colorsRef.current = { isDark, colors: resolveTheme(isDark, theme) };
      }
    };
    check();
    if (darkMode === undefined) {
      const obs = new MutationObserver(check);
      obs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => obs.disconnect();
    }
  }, [darkMode, theme]);

  useEffect(() => {
    viewModeRef.current = viewMode;
    targetTransitionRef.current = viewMode === "globe" ? 1 : 0;
    targetZoomRef.current = 1;
  }, [viewMode]);

  useEffect(() => {
    autoRotateRef.current = autoRotateProp;
  }, [autoRotateProp]);

  const precomputed = useMemo(
    () =>
      LAND_POINTS.map(([lng, lat]) => ({
        cosφ: Math.cos(lat * DEG),
        sinφ: Math.sin(lat * DEG),
        λ: lng * DEG,
        lng,
        lat,
      })),
    []
  );

  // ---- Render loop ----
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || precomputed.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let lastCellDeg = baseCellDeg;

    const render = () => {
      if (!ctx || width === 0) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      const colors = colorsRef.current.colors;
      const t = transitionRef.current;
      const target = targetTransitionRef.current;

      if (Math.abs(t - target) > 0.001) {
        transitionRef.current += (target - t) * 0.06;
      } else {
        transitionRef.current = target;
      }
      const tVal = transitionRef.current;

      const zoomDiff = targetZoomRef.current - zoomRef.current;
      if (Math.abs(zoomDiff) > 0.001) {
        zoomRef.current += zoomDiff * 0.2;
      } else {
        zoomRef.current = targetZoomRef.current;
      }
      const zoom = zoomRef.current;

      const newCellDeg = clusterCellDegrees ?? Math.max(2, Math.round(15 / zoom));
      if (newCellDeg !== lastCellDeg) {
        lastCellDeg = newCellDeg;
        setClusterCellDeg(newCellDeg);
      }

      if (
        autoRotateRef.current &&
        tVal > 0.5 &&
        !isDraggingRef.current
      ) {
        rotationRef.current[0] += 0.15;
      }

      if (!isDraggingRef.current) {
        const [vx, vy] = velocityRef.current;
        if (Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01) {
          if (tVal > 0.5) {
            rotationRef.current[0] += vx;
            rotationRef.current[1] += vy;
          } else {
            panOffsetRef.current[0] += vx * 2;
            panOffsetRef.current[1] += vy * 2;
          }
          velocityRef.current = [vx * 0.93, vy * 0.93];
        }
      }

      rotationRef.current[1] = Math.max(
        -60,
        Math.min(60, rotationRef.current[1])
      );

      // Clamp flat-mode pan
      if (tVal < 0.5) {
        const flatScaleForClamp = (height / 2.2) * zoom;
        const flatFactorClamp = flatScaleForClamp * DEG;
        const mapHalfW = flatFactorClamp * 180;
        const mapHalfH = flatFactorClamp * 80;
        const maxPanX = Math.max(0, mapHalfW - width / 2);
        const maxPanY = Math.max(0, mapHalfH - height / 2);
        panOffsetRef.current[0] = Math.max(
          -maxPanX,
          Math.min(maxPanX, panOffsetRef.current[0])
        );
        panOffsetRef.current[1] = Math.max(
          -maxPanY,
          Math.min(maxPanY, panOffsetRef.current[1])
        );
      }

      const panX = panOffsetRef.current[0] * (1 - tVal);
      const panY = panOffsetRef.current[1] * (1 - tVal);
      const flatCx = width / 2 + panX;
      const flatCy = height / 2 + panY;
      const globeCx = width / 2;
      const globeCy = height / 2;
      const baseRadius = Math.min(width, height) * 0.42;
      const radius = baseRadius * zoom;
      const flatScale = (height / 2.2) * zoom;

      const λ0 = -rotationRef.current[0] * DEG;
      const φ0 = -rotationRef.current[1] * DEG;
      const cosφ0 = Math.cos(φ0);
      const sinφ0 = Math.sin(φ0);
      const flatFactor = flatScale * DEG;

      ctx.clearRect(0, 0, width, height);

      // Globe background
      if (tVal > 0.01) {
        ctx.globalAlpha = tVal;
        ctx.beginPath();
        ctx.arc(globeCx, globeCy, radius, 0, TWO_PI);
        ctx.fillStyle = colors.globeFill;
        ctx.fill();
        ctx.strokeStyle = colors.outlineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Land dots
      const dotRadius = Math.max(1.4, (width / 380) * Math.min(zoom, 2));
      ctx.fillStyle = colors.dotColor;
      ctx.beginPath();

      for (let i = 0, len = precomputed.length; i < len; i++) {
        const p = precomputed[i];
        const fx = flatCx + flatFactor * p.lng;
        const fy = flatCy - flatFactor * p.lat;

        if (tVal < 0.01) {
          if (fx < -10 || fx > width + 10 || fy < -10 || fy > height + 10)
            continue;
          ctx.moveTo(fx + dotRadius, fy);
          ctx.arc(fx, fy, dotRadius, 0, TWO_PI);
          continue;
        }

        const λRel = p.λ - λ0;
        const cosλRel = Math.cos(λRel);
        const cosc = sinφ0 * p.sinφ + cosφ0 * p.cosφ * cosλRel;
        if (cosc < 0) continue;

        const sinλRel = Math.sin(λRel);
        const gx = globeCx + radius * p.cosφ * sinλRel;
        const gy =
          globeCy - radius * (cosφ0 * p.sinφ - sinφ0 * p.cosφ * cosλRel);

        if (tVal > 0.99) {
          ctx.moveTo(gx + dotRadius, gy);
          ctx.arc(gx, gy, dotRadius, 0, TWO_PI);
        } else {
          const x = fx + (gx - fx) * tVal;
          const y = fy + (gy - fy) * tVal;
          ctx.moveTo(x + dotRadius, y);
          ctx.arc(x, y, dotRadius, 0, TWO_PI);
        }
      }
      ctx.fill();

      // Project clusters to screen space
      const now = Date.now();
      const frameHitTargets: HitTarget[] = [];
      const els = clusterElsRef.current;
      const currentClusters = clusterDataRef.current;

      interface Projected {
        px: number;
        py: number;
        markers: MarkerData[];
        hasActive: boolean;
        activeCount: number;
        sourceIndices: number[];
      }
      const projected: Projected[] = [];

      for (let ci = 0; ci < currentClusters.length; ci++) {
        const cd = currentClusters[ci];
        const gc = cd.cluster;

        const fx = flatCx + flatFactor * cd.lng;
        const fy = flatCy - flatFactor * cd.lat;
        let px = fx,
          py = fy,
          visible = true;

        if (tVal > 0.01) {
          const λRel = cd.λ - λ0;
          const cosλRel = Math.cos(λRel);
          const cosc = sinφ0 * cd.sinφ + cosφ0 * cd.cosφ * cosλRel;
          if (cosc < 0) {
            visible = false;
          } else {
            const sinλRel = Math.sin(λRel);
            const gx = globeCx + radius * cd.cosφ * sinλRel;
            const gy =
              globeCy -
              radius * (cosφ0 * cd.sinφ - sinφ0 * cd.cosφ * cosλRel);
            px = fx + (gx - fx) * tVal;
            py = fy + (gy - fy) * tVal;
          }
        }

        if (
          !visible ||
          px < -30 ||
          px > width + 30 ||
          py < -30 ||
          py > height + 30
        ) {
          const el = els.get(ci);
          if (el) el.style.display = "none";
          continue;
        }

        projected.push({
          px,
          py,
          markers: gc.markers,
          hasActive: gc.hasActive,
          activeCount: gc.activeCount,
          sourceIndices: [ci],
        });
      }

      // Screen-space merge
      const minDist = 50;
      const minDistSq = minDist * minDist;
      const merged: Projected[] = [];
      const used = new Uint8Array(projected.length);

      for (let i = 0; i < projected.length; i++) {
        if (used[i]) continue;
        const m: Projected = {
          ...projected[i],
          markers: [...projected[i].markers],
          sourceIndices: [...projected[i].sourceIndices],
        };
        let totalX = m.px * m.markers.length;
        let totalY = m.py * m.markers.length;
        let totalCount = m.markers.length;

        for (let j = i + 1; j < projected.length; j++) {
          if (used[j]) continue;
          const dx = m.px - projected[j].px;
          const dy = m.py - projected[j].py;
          if (dx * dx + dy * dy < minDistSq) {
            used[j] = 1;
            const jCount = projected[j].markers.length;
            totalX += projected[j].px * jCount;
            totalY += projected[j].py * jCount;
            totalCount += jCount;
            m.markers.push(...projected[j].markers);
            m.sourceIndices.push(...projected[j].sourceIndices);
            if (projected[j].hasActive) m.hasActive = true;
            m.activeCount += projected[j].activeCount;
            m.px = totalX / totalCount;
            m.py = totalY / totalCount;
          }
        }
        merged.push(m);
      }

      // Animated cluster transitions
      const prev = animClustersRef.current;
      const next: AnimCluster[] = [];
      const matchedPrev = new Uint8Array(prev.length);
      const lerpSpeed = isDraggingRef.current ? 0.5 : 0.15;

      for (const m of merged) {
        const count = m.markers.length;
        const isSolo = count === 1;
        const targetSize = isSolo ? 16 : Math.min(14 + count * 0.4, 28);

        let bestIdx = -1;
        let bestDistSq = 80 * 80;
        for (let pi = 0; pi < prev.length; pi++) {
          if (matchedPrev[pi]) continue;
          const dx = prev[pi].tx - m.px;
          const dy = prev[pi].ty - m.py;
          const dSq = dx * dx + dy * dy;
          if (dSq < bestDistSq) {
            bestDistSq = dSq;
            bestIdx = pi;
          }
        }

        if (bestIdx >= 0) {
          matchedPrev[bestIdx] = 1;
          const p = prev[bestIdx];
          next.push({
            x: p.x + (m.px - p.x) * lerpSpeed,
            y: p.y + (m.py - p.y) * lerpSpeed,
            tx: m.px,
            ty: m.py,
            size: p.size + (targetSize - p.size) * lerpSpeed,
            tSize: targetSize,
            count: p.count + (count - p.count) * lerpSpeed,
            tCount: count,
            alpha: p.alpha + (1 - p.alpha) * lerpSpeed,
            tAlpha: 1,
            markers: m.markers,
            hasActive: m.hasActive,
            activeCount: m.activeCount,
            sourceIndices: m.sourceIndices,
            isSolo,
          });
        } else {
          next.push({
            x: m.px,
            y: m.py,
            tx: m.px,
            ty: m.py,
            size: targetSize * 0.3,
            tSize: targetSize,
            count,
            tCount: count,
            alpha: 0.2,
            tAlpha: 1,
            markers: m.markers,
            hasActive: m.hasActive,
            activeCount: m.activeCount,
            sourceIndices: m.sourceIndices,
            isSolo,
          });
        }
      }

      // Fade out dying clusters
      for (let pi = 0; pi < prev.length; pi++) {
        if (matchedPrev[pi]) continue;
        const p = prev[pi];
        const newAlpha = p.alpha * 0.8;
        if (newAlpha < 0.05) continue;
        next.push({
          ...p,
          alpha: newAlpha,
          tAlpha: 0,
          size: p.size * 0.9,
        });
      }

      animClustersRef.current = next;

      // Render animated clusters
      const usedEls = new Set<number>();

      for (const ac of next) {
        if (ac.tAlpha === 0 && ac.alpha < 0.05) continue;
        const { x: px, y: py } = ac;

        if (!ac.isSolo || ac.tAlpha === 0 || !renderMarker) {
          const size = ac.size;

          ctx.globalAlpha = ac.alpha;

          if (ac.hasActive && ac.tAlpha > 0) {
            const pulseScale =
              1 + 0.15 * Math.sin((now / 600) * Math.PI);
            ctx.beginPath();
            ctx.arc(px, py, size * 1.2 * pulseScale, 0, TWO_PI);
            ctx.fillStyle = colors.activeGlow;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(px, py, size, 0, TWO_PI);
          ctx.fillStyle = colors.clusterBg;
          ctx.fill();
          ctx.strokeStyle = colors.clusterBorder;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = colors.clusterText;
          ctx.font = `bold ${Math.min(12, size * 0.7)}px -apple-system, system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const displayCount = Math.round(ac.count);
          if (displayCount > 0) {
            ctx.fillText(String(displayCount), px, py + 0.5);
          }

          if (ac.activeCount > 0 && ac.tAlpha > 0) {
            const badgeX = px + size * 0.7;
            const badgeY = py - size * 0.7;
            ctx.beginPath();
            ctx.arc(badgeX, badgeY, 7, 0, TWO_PI);
            ctx.fillStyle = colors.activeBadge;
            ctx.fill();
            ctx.strokeStyle = colors.clusterBorder;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 7px -apple-system, system-ui, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(String(ac.activeCount), badgeX, badgeY + 0.5);
          }

          ctx.globalAlpha = 1;

          if (ac.tAlpha > 0) {
            frameHitTargets.push({
              x: px,
              y: py,
              radius: size + 4,
              markers: ac.markers,
            });
          }
        } else {
          // Solo marker — position DOM element
          const ci = ac.sourceIndices[0];
          usedEls.add(ci);
          const el = els.get(ci);
          if (el) {
            el.style.display = "";
            el.style.opacity = String(ac.alpha);
            el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%) scale(${Math.min(1, ac.size / ac.tSize)})`;
          }

          if (ac.hasActive) {
            const pulseScale =
              1 + 0.3 * Math.sin((now / 600) * Math.PI);
            ctx.globalAlpha = ac.alpha;
            ctx.beginPath();
            ctx.arc(px, py, 24 * pulseScale, 0, TWO_PI);
            ctx.fillStyle = colors.activeGlow;
            ctx.fill();
            ctx.globalAlpha = 1;
          }

          frameHitTargets.push({
            x: px,
            y: py,
            radius: 20,
            markers: ac.markers,
          });
        }
      }

      // Hide unused DOM elements
      for (const [ci, el] of Array.from(els)) {
        if (!usedEls.has(ci)) {
          el.style.display = "none";
        }
      }

      hitTargetsRef.current = frameHitTargets;
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precomputed]);

  // ---- Interaction handlers ----

  const handleMouseMoveForCursor = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container || isDraggingRef.current) return;

      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let overTarget = false;
      for (const hit of hitTargetsRef.current) {
        const dx = mx - hit.x;
        const dy = my - hit.y;
        if (dx * dx + dy * dy <= hit.radius * hit.radius) {
          overTarget = true;
          break;
        }
      }

      container.style.cursor = overTarget ? "pointer" : "grab";
    },
    []
  );

  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (hasDraggedRef.current || !onMarkerClick) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const hit of hitTargetsRef.current) {
        const dx = mx - hit.x;
        const dy = my - hit.y;
        if (dx * dx + dy * dy <= hit.radius * hit.radius) {
          onMarkerClick({
            markers: hit.markers,
            x: hit.x,
            y: hit.y,
            radius: hit.radius,
          });
          return;
        }
      }
    },
    [onMarkerClick]
  );

  const handleWheel = useCallback(
    (e: ReactWheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.003;
      const [minZoom, maxZoom] = zoomRange;
      const effectiveMax =
        viewModeRef.current === "globe" ? Math.min(maxZoom, 3) : maxZoom;
      targetZoomRef.current = Math.max(
        minZoom,
        Math.min(effectiveMax, targetZoomRef.current * (1 + delta))
      );
    },
    [zoomRange]
  );

  const handlePointerDown = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      lastMouseRef.current = [e.clientX, e.clientY];
      velocityRef.current = [0, 0];
      if (viewModeRef.current === "globe") autoRotateRef.current = false;
      const container = containerRef.current;
      if (container) container.style.cursor = "grabbing";
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      handleMouseMoveForCursor(e);

      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current[0];
      const dy = e.clientY - lastMouseRef.current[1];

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDraggedRef.current = true;

      lastMouseRef.current = [e.clientX, e.clientY];

      if (
        viewModeRef.current === "globe" ||
        transitionRef.current > 0.5
      ) {
        rotationRef.current[0] += dx * 0.3;
        rotationRef.current[1] -= dy * 0.3;
        velocityRef.current = [dx * 0.3, -dy * 0.3];
      } else {
        panOffsetRef.current[0] += dx;
        panOffsetRef.current[1] += dy;
        velocityRef.current = [dx * 0.5, dy * 0.5];
      }
    },
    [handleMouseMoveForCursor]
  );

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    const container = containerRef.current;
    if (container) container.style.cursor = "grab";
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      lastMouseRef.current = [touch.clientX, touch.clientY];
      velocityRef.current = [0, 0];
      if (viewModeRef.current === "globe") autoRotateRef.current = false;
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const touch = e.touches[0];
      const dx = touch.clientX - lastMouseRef.current[0];
      const dy = touch.clientY - lastMouseRef.current[1];

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDraggedRef.current = true;

      lastMouseRef.current = [touch.clientX, touch.clientY];

      if (
        viewModeRef.current === "globe" ||
        transitionRef.current > 0.5
      ) {
        rotationRef.current[0] += dx * 0.3;
        rotationRef.current[1] -= dy * 0.3;
        velocityRef.current = [dx * 0.3, -dy * 0.3];
      } else {
        panOffsetRef.current[0] += dx;
        panOffsetRef.current[1] += dy;
        velocityRef.current = [dx * 0.5, dy * 0.5];
      }
    },
    []
  );

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Prevent default wheel to avoid page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const prevent = (e: WheelEvent) => e.preventDefault();
    container.addEventListener("wheel", prevent, { passive: false });
    return () => container.removeEventListener("wheel", prevent);
  }, []);

  // Expose zoom methods via ref
  const zoomIn = useCallback(() => {
    const [, maxZoom] = zoomRange;
    const effectiveMax =
      viewModeRef.current === "globe" ? Math.min(maxZoom, 3) : maxZoom;
    targetZoomRef.current = Math.min(
      effectiveMax,
      targetZoomRef.current * 1.4
    );
  }, [zoomRange]);

  const zoomOut = useCallback(() => {
    const [minZoom] = zoomRange;
    targetZoomRef.current = Math.max(
      minZoom,
      targetZoomRef.current / 1.4
    );
  }, [zoomRange]);

  const getZoom = useCallback(() => zoomRef.current, []);

  useImperativeHandle(ref, () => ({ zoomIn, zoomOut, getZoom }), [zoomIn, zoomOut, getZoom]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "grab",
        userSelect: "none",
        ...style,
      }}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onClick={handleClick}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
      />
      {renderMarker && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {clusterData.map((cd, ci) => {
            const gc = cd.cluster;
            if (gc.count > 1) {
              return (
                <div
                  key={`c-${ci}`}
                  ref={(el) => {
                    if (el) clusterElsRef.current.set(ci, el);
                    else clusterElsRef.current.delete(ci);
                  }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    willChange: "transform",
                    display: "none",
                  }}
                />
              );
            }

            const marker = gc.markers[0];
            const isActive = activeSet.has(marker.id);

            return (
              <div
                key={`m-${marker.id}`}
                ref={(el) => {
                  if (el) clusterElsRef.current.set(ci, el);
                  else clusterElsRef.current.delete(ci);
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  willChange: "transform",
                  display: "none",
                }}
              >
                {renderMarker(marker, { x: 0, y: 0 }, isActive)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
