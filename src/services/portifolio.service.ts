import { Section } from "@/utils/dataSections";
import { api } from "./api";

export type PortifolioAccount = {
    name: string;
    domain: string;
    donationsEnabled: boolean;
};

export type PortifolioByDomainResponse = {
    components: Section[];
    account: PortifolioAccount;
};

export const saveSectionPortifolio = async (token: string, locale: string, section: FormData) => {
    const response = await api.post('/portifolio/components', section, {
        headers: {
            Authorization: `Bearer ${token}`,
            locale: locale
        },
    });
    return response.data;
};

export const saveSectionPortifolioWIthouFormData = async (token: string, locale: string, section: Section) => {
    const response = await api.post('/portifolio/components', section, {
        headers: {
            Authorization: `Bearer ${token}`,
            locale: locale
        },
    });
    return response.data;
};

export const getPortifolioByDomainUser = (domain: string): Promise<PortifolioByDomainResponse> => {
    const respose = api.get<PortifolioByDomainResponse>(`/portifolio/${domain}`);
    return respose.then(response => response.data).catch(error => {
        console.error("Error fetching portifolio by domain:", error);
        throw error;
    });
}

export const getPortifolios = (token: string, locale: string) => {
    const respose = api.get<{ components: Section[] }>(`/portifolio/components`, {
        headers: {
            Authorization: `Bearer ${token}`,
            locale: locale
        }
    });
    return respose.then(response => response.data.components).catch(error => {
        console.error("Error fetching portifolio by domain:", error);
        throw error;
    });
}

export const deletePortifolio = (token: string, locale: string) => {
    const response = api.delete(`/portifolio`, {
        headers: {
            Authorization: `Bearer ${token}`,
            locale: locale
        }
    });
    return response.then(response => response.data).catch(error => {
        console.error("Error deleting portifolio:", error);
        throw error;
    });
}

export const createDonationCheckout = (domain: string, amountInCents: number = 1000) => {
    const response = api.post<{ url: string }>('/donation/checkout', { domain, amountInCents });
    return response.then(response => response.data).catch(error => {
        console.error("Error creating donation checkout:", error);
        throw error;
    });
}