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