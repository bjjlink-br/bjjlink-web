import { api } from "./api";
export const checkoutPayment = async (token: string, locale: string) => {
    const response = await api.post('/checkout/session', {
        headers: {
            Authorization: `Bearer ${token}`,
            locale: locale
        }
    });
    return response.data;
};