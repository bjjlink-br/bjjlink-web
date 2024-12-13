import { api } from "./api";

export const checkoutPayment = async (token: string) => {
    const response = await api.post('/checkout/session', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};