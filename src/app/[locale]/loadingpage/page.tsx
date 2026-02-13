"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, AlertCircle, CheckCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { checkoutPayment } from "@/services/checkout.service";

export default function LoadingPage() {
  const t = useTranslations("loadingPage")
  const router = useRouter();
  const locale = useLocale()
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  // const selectedPlan = searchParams.get("selectedPlan");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState(t("loading-message"));

  useEffect(() => {
    async function processLoginAndPlan() {
      const FREE_PLAN_KEY = "Gratuito - 7 Dias";
      const period = searchParams.get("period");
      const selectedPlan = searchParams.get("selectedPlan");
      
      const priceId = period === "annual" ? process.env.NEXT_PUBLIC_ANNUAL_PRICE : process.env.NEXT_PUBLIC_MONTHLY_PRICE;
      const freePriceId = process.env.NEXT_PUBLIC_FREE_PRICE;

      const finalPriceId = selectedPlan === FREE_PLAN_KEY ? freePriceId : priceId;

      try {
        const response = await checkoutPayment(token as string, locale, finalPriceId as string);
        setMessage(t("loading-success"));
        setStatus("success");

        router.push(response.url);
      } catch (error) {
        console.error(error);
        setMessage(t("error-message"));
        setStatus("error");
      }
    }

    processLoginAndPlan();
  }, [router, token, t, locale]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-1300">
      <div className="flex flex-col items-center gap-4 max-w-md p-6 bg-white rounded-lg shadow-lg">
        {status === "loading" && (
          <>
            <Loader className="animate-spin text-blue-500 w-10 h-10" />
            <p className="text-lg font-semibold text-center text-brand-blue-950">{message}</p>
            <p className="text-sm text-gray-1000 text-center">
              {t("title")}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="text-green-500 w-10 h-10" />
            <p className="text-lg font-semibold text-center text-brand-blue-950">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="text-red-500 w-10 h-10" />
            <p className="text-lg font-semibold text-center text-brand-blue-950">{message}</p>
            <button
              onClick={() => location.reload()}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              {t("error-button")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
