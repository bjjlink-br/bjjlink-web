import { api } from "./api";
export const checkoutPayment = async (token: string, locale: string, priceId: string) => {
    const response = await api.post('/checkout/session', {}, {
        headers: {
            Authorization: `Bearer ${token}`,
            locale: locale,
            priceId: priceId
        }
    });
    return response.data;
};

export const manageSubscription = async (token: string, locale: string) => {
    const response = await api.post('/checkout/subscription', {}, {
        headers: {
            Authorization: `Bearer ${token}`,
            locale: locale,
        }
    });
    return response.data;
};
