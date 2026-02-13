import { api } from "./api";
export const checkoutPayment = async (token: string, locale: string, priceId: string) => {
    const response = await api.post('/checkout/session', {
        headers: {
            Authorization: `Bearer ${token}`,
            locale: locale,
            priceId: priceId
        }
    });
    return response.data;
};