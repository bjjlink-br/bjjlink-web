import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const UpgradePlanCard = () => {
    return (
        <Card className="bg-gray-900 border-gray-700 max-w-52">
            <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                    <div>
                        <h3 className="font-secondary text-gray-50 text-base font-bold">Plano premium</h3>
                        <p className="font-secondary text-gray-200 text-sm">Crie mais portfólio</p>
                    </div>
                    <Button className="bg-brand-blue-600 hover:bg-brand-blue-700 text-brand-blue-50">
                        Upgrade
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}