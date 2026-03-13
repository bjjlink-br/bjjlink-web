import { Handshake } from "lucide-react";

type SponsorText = {
    order: number;
    text: string;
};

type SponsorsSectionProps = {
    texts: SponsorText[];
    onOpenLink: (url: string) => void;
    normalizeLink: (url?: string) => string;
};

export function SponsorsSection({ texts, onOpenLink, normalizeLink }: SponsorsSectionProps) {
    if (!texts || texts.length === 0) return null;

    return (
        <div className="space-y-3 mt-8 pt-6 border-t border-zinc-800/50">
            <div className="flex items-center gap-2">
                {/* <Handshake className="w-4 h-4 text-brand-blue-400" /> */}
                <h3 className="font-semibold text-lg">Patrocinadores</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {texts.map((sponsor, index) => {
                    const [name, url] = sponsor.text.split('|');
                    return (
                        <button
                            key={index}
                            onClick={() => onOpenLink(normalizeLink(url?.trim()))}
                            className="group relative flex-shrink-0 bg-[#1E1E2E] hover:bg-[#252535] border-l-2 border-brand-blue-600 rounded-md px-4 py-3 transition-all duration-200 min-w-[160px]"
                            disabled={!url}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-brand-blue-600 group-hover:bg-brand-blue-500 transition-colors" />
                                <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                                    {name?.trim() || 'Patrocinador'}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
