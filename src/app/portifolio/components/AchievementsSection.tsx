import { Award } from "lucide-react";

type AchievementText = {
    order: number;
    text: string;
};

type AchievementsSectionProps = {
    texts: AchievementText[];
};

export function AchievementsSection({ texts }: AchievementsSectionProps) {
    if (!texts || texts.length === 0) return null;

    return (
        <div className="space-y-3 mt-8 pt-6 border-t border-zinc-800/50">
            <div className="flex items-center gap-2">
                {/* <Award className="w-4 h-4 text-yellow-500" /> */}
                <h3 className="font-semibold text-lg">Conquistas</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {texts.map((achievement, index) => {
                    const [title, year, description] = achievement.text.split('|');
                    return (
                        <div
                            key={index}
                            className="group relative flex-shrink-0 bg-[#1E1E2E] hover:bg-[#252535] border-l-2 border-yellow-500 rounded-md p-4 transition-all duration-200 min-w-[200px] max-w-[280px]"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 group-hover:bg-yellow-400 transition-colors" />
                                    <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                                        {title?.trim() || 'Título'}
                                    </h4>
                                </div>
                                {year && (
                                    <span className="text-xs text-yellow-500 font-medium ml-4">
                                        {year.trim()}
                                    </span>
                                )}
                                {description && (
                                    <p className="text-xs text-zinc-400 group-hover:text-zinc-300 mt-1 ml-4 line-clamp-2 transition-colors">
                                        {description.trim()}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
