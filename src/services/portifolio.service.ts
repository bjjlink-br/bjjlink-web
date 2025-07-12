// import { SectionBodyAPI } from "@/utils/dataSections";
import { DataSections, Section } from "@/utils/dataSections";
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