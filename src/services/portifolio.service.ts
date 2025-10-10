// import { SectionBodyAPI } from "@/utils/dataSections";
import { Section } from "@/utils/dataSections";
import { api } from "./api";

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

export const getPortifolioByDomainUser = (domain: string) => {
    const respose = api.get<Section[]>(`/portifolio/${domain}`);
    return respose.then(response => response.data).catch(error => {
        console.error("Error fetching portifolio by domain:", error);
        throw error;
    });
}

export const getPortifolios = (token: string, locale: string) => {
    const respose = api.get<Section[]>(`/portifolio/components`, {
        headers: {
            Authorization: `Bearer ${token}`,
            locale: locale
        }
    });
    return respose.then(response => response.data).catch(error => {
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