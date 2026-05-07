import type { ReactNode } from "react";

export interface MarkerData {
  id: string;
  latitude: number;
  longitude: number;
  data?: Record<string, unknown>;
}

export type ViewMode = "globe" | "flat";

export interface DottedMapTheme {
  dotColor?: string;
  globeFill?: string;
  outlineColor?: string;
  clusterColor?: string;
  clusterTextColor?: string;
  clusterBorderColor?: string;
  activeGlow?: string;
  activeBadgeColor?: string;
}

export interface MarkerCluster {
  markers: MarkerData[];
  x: number;
  y: number;
  radius: number;
}

export interface DottedMapProps {
  markers: MarkerData[];
  defaultViewMode?: ViewMode;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  activeMarkerIds?: Set<string> | string[];
  onMarkerClick?: (cluster: MarkerCluster) => void;
  theme?: DottedMapTheme;
  darkMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
  renderMarker?: (
    marker: MarkerData,
    position: { x: number; y: number },
    isActive: boolean
  ) => ReactNode;
  initialRotation?: [number, number];
  initialZoom?: number;
  autoRotate?: boolean;
  zoomRange?: [number, number];
  clusterCellDegrees?: number;
}

// Internal types
export interface HitTarget {
  x: number;
  y: number;
  radius: number;
  markers: MarkerData[];
}

export interface GeoCluster {
  avgLng: number;
  avgLat: number;
  count: number;
  markers: MarkerData[];
  hasActive: boolean;
  activeCount: number;
}

export interface AnimCluster {
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  tSize: number;
  count: number;
  tCount: number;
  alpha: number;
  tAlpha: number;
  markers: MarkerData[];
  hasActive: boolean;
  activeCount: number;
  sourceIndices: number[];
  isSolo: boolean;
}
