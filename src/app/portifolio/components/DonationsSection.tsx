import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

type DonationsSectionProps = {
    message: string;
    donationLink: string;
    onOpenLink: (url: string) => void;
    normalizeLink: (url?: string) => string;
};

export function DonationsSection({ message, donationLink, onOpenLink, normalizeLink }: DonationsSectionProps) {
    if (!message && !donationLink) return null;

    return (
        <div className="space-y-3 mt-8 pt-6 border-t border-zinc-800/50">
            {/* <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <h3 className="font-semibold text-lg">Apoie minha jornada</h3>
            </div> */}
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-xl p-4">
                <p className="text-sm text-zinc-300 mb-4">
                    {message || 'Sua contribuição ajuda a continuar minha jornada no esporte.'}
                </p>
                <Button
                    className="w-full bg-[#56A6FF] text-white font-semibold rounded-lg py-2.5 transition-all duration-200 shadow-lg shadow-[#56A6FF]/20"
                    onClick={() => onOpenLink(normalizeLink(donationLink))}
                    disabled={!donationLink}
                >
                    <Heart className="w-4 h-4 mr-2" />
                    Fazer uma doação
                </Button>
            </div>
        </div>
    );
}
