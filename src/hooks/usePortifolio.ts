import { useQuery, useMutation } from "@tanstack/react-query";
import { getPortifolioByDomainUser, getPortifolios, deletePortifolio } from "@/services/portifolio.service";
import { Section } from "@/utils/dataSections";
import { useEffect } from "react";
import { GET_COMPONENTS_KEY } from "@/contexts/AuthContext";

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

export function useGetListPortifolio(token: string | null, locale: string) {
  const query = useQuery<Section[], Error>({
    queryKey: ["portfolios", token, locale],
    queryFn: () => getPortifolios(token!, locale),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 min de cache
    gcTime: 1000 * 60 * 30, // 30 min em cache mesmo não usado
    retry: 1,
  });

  useEffect(() => {
    if (query.data && !query.isLoading && !query.isError) {
      localStorage.setItem(GET_COMPONENTS_KEY, JSON.stringify(query.data));
    }
  }, [query.data, query.isLoading, query.isError]);

  return query;
}

export function useDeletePortifolio(onSuccess?: () => void, onError?: (error: Error | unknown) => void) {
  return useMutation<any, Error, { token: string; locale: string; }>({
    mutationFn: ({ token, locale }) => deletePortifolio(token, locale),
    retry: 1,
    onSuccess: onSuccess,
    onError: onError,
  });
}
