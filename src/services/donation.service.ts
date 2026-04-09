import { api } from "./api";

export type AthleteInfo = {
  name: string;
  donationsEnabled: boolean;
};

export type ConnectAccountResponse = {
  connectAccountId: string;
};

export type OnboardingLinkResponse = {
  url: string;
};

export async function getAthleteInfo(domain: string): Promise<AthleteInfo> {
  const response = await api.get<AthleteInfo>(`/donation/athlete-info/${domain}`);
  return response.data;
}

export async function createConnectAccount(token: string): Promise<ConnectAccountResponse> {
  const response = await api.post<ConnectAccountResponse>(
    "/donation/connect/account",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function createOnboardingLink(token: string): Promise<OnboardingLinkResponse> {
  const response = await api.post<OnboardingLinkResponse>(
    "/donation/connect/onboarding-link",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export type DonationSummary = {
  totalMonthlyAmountInCents: number;
  activeSupportersCount: number;
  supportersDiff: number;
  totalSupporters: number;
  currency: string;
};

export type Supporter = {
  _id: string;
  amountInCents: number;
  createdAt: string;
  currency: string;
  donorEmail: string;
  donorName: string;
  status: string;
};

export async function getDonationSummary(
  token: string,
  month?: number,
  year?: number,
): Promise<DonationSummary> {
  const params: Record<string, string> = {};
  if (month) params.month = String(month);
  if (year) params.year = String(year);
  const response = await api.get<DonationSummary>("/donation/dashboard/summary", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return response.data;
}

export type MonthlyHistoryItem = {
  month: string;
  year: number;
  monthNum: number;
  valueInCents: number;
  supporters: number;
};

export async function getDonationMonthlyHistory(
  token: string,
  months: number = 6,
  month?: number,
  year?: number,
): Promise<MonthlyHistoryItem[]> {
  const params: Record<string, string> = { months: String(months) };
  if (month) params.month = String(month);
  if (year) params.year = String(year);
  const response = await api.get<MonthlyHistoryItem[]>("/donation/dashboard/monthly-history", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return response.data;
}

export async function getDonationSupporters(token: string): Promise<Supporter[]> {
  const response = await api.get<Supporter[]>("/donation/dashboard/supporters", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
