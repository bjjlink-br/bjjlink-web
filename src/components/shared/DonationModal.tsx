"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Lock,
  Mail,
  MessagesSquare,
  Target,
  Video,
  X,
} from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

type DonationModalProps = {
  open: boolean;
  onClose: () => void;
  onSubscribe: () => void;
  isLoading?: boolean;
  athleteName: string;
  athleteImage?: string | null;
  priceInCents?: number;
};

export function DonationModal({
  open,
  onClose,
  onSubscribe,
  isLoading = false,
  athleteName,
  athleteImage,
  priceInCents = 2900,
}: DonationModalProps) {
  if (!open) return null;

  const priceFormatted = `R$ ${Math.floor(priceInCents / 100)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[520px] bg-[#23232d] border border-[#68687140] rounded-[10px] p-5 sm:p-8 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex flex-col items-center gap-3 pt-1">
          <div className="relative">
            <div className="size-20 overflow-hidden rounded-full border-4 border-[#23232d] ring-2 ring-[#0c53ff]">
              {athleteImage ? (
                <Image
                  src={athleteImage}
                  alt={athleteName}
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full bg-[#0c53ff]/30" />
              )}
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#23232d] bg-[#0c53ff] px-2.5 py-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.5px] text-white whitespace-nowrap">
                PRO MEMBER
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <h2 className="text-[22px] sm:text-[26px] font-semibold leading-[30px] text-[#d8d8e1]">
              {athleteName}
            </h2>
            <p className="text-sm text-[#ababb4]">
              Junte-se à minha equipe exclusiva
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-lg font-bold text-[#d8d8e1]">
            Benefícios Exclusivos
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BenefitCard
              icon={<Video className="h-4 w-4 text-[#0c53ff]" />}
              title="Conteúdo Premium"
              description="Acesso a treinos, bastidores e técnicas exclusivas em posts e vídeos."
            />
            <BenefitCard
              icon={<MessagesSquare className="h-4 w-4 text-[#0c53ff]" />}
              title="Grupo VIP"
              description="Interaja diretamente comigo e outros membros no grupo fechado."
            />
            <BenefitCard
              icon={<Mail className="h-4 w-4 text-[#0c53ff]" />}
              title="Sorteios Mensais"
              description="Concorra a kimonos, rash guards e ingressos para eventos sorteados pela plataforma."
            />
            <BenefitCard
              icon={<Target className="h-4 w-4 text-[#0c53ff]" />}
              title="Evolução Contínua"
              description="Receba direcionamentos e conteúdos focados na sua evolução dentro e fora do tatame."
            />
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[5px] border border-[#0c53ff4c] bg-[#0c53ff0d] p-4">
          <div className="absolute -right-12 -top-12 size-24 rounded-full bg-[#0c53ff]/20 blur-[20px]" />
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#0c53ff]">
                Plano Mensal
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-[26px] font-semibold leading-[32px] text-[#d8d8e1]">
                  {priceFormatted}
                </span>
                <span className="text-sm text-[#ababb4]">/mês</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <p className="text-[11px] text-[#ababb4]">
                Cancele quando quiser
              </p>
              <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
                <Lock className="h-3 w-3 text-[#d8d8e1]" />
                <span className="text-[11px] font-bold text-[#d8d8e1]">
                  Pagamento Seguro
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            onClick={onSubscribe}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-[#0c53ff] py-3 text-base font-semibold text-white shadow-[0px_4px_10px_rgba(12,83,255,0.4)] hover:bg-[#0a47db]"
          >
            {isLoading ? (
              "Redirecionando..."
            ) : (
              <>
                Torne-se Membro Agora
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
          <p className="text-center text-[11px] text-[#ababb4]">
            Ao assinar, você concorda com os{" "}
            <a href="#" className="text-[#d8d8e1] underline">
              Termos de Serviço
            </a>
            {" e "}
            <a href="#" className="text-[#d8d8e1] underline">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

type BenefitCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="flex gap-3 rounded-[5px] border border-[#68687140] bg-white/5 p-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[5px] border border-[#0c53ff4c] bg-[#0c53ff]/10">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <h4 className="text-sm font-semibold leading-[18px] text-[#d8d8e1]">
          {title}
        </h4>
        <p className="text-xs leading-[18px] text-[#ababb4]">{description}</p>
      </div>
    </div>
  );
}
