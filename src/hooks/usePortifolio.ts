import { useQuery } from "@tanstack/react-query";
import { getPortifolioByDomainUser } from "@/services/portifolio.service";
import { Section } from "@/utils/dataSections";

export function usePortifolioByDomain(domain: string | undefined) {
  return useQuery<Section[], Error>({
    queryKey: ["portifolio", domain],
    queryFn: () => getPortifolioByDomainUser(domain!),
    enabled: !!domain,
    staleTime: 1000 * 60 * 5, // 5 min de cache
    gcTime: 1000 * 60 * 30, // 30 min em cache mesmo não usado
    retry: 1, // tenta apenas 1x se der erro
  });
}