"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserAccountInfo } from "@/utils/types"
import { Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeletePortifolio } from "@/hooks/usePortifolio"
import { useLocale } from "next-intl"
import { toast } from "@/hooks/use-toast"
import { useQueryClient } from "@tanstack/react-query"
import DEFAULT_AVATAR from "@/assets/images/user.png"
import { useRouter } from "next/navigation"
import { KEYS_STORAGE } from "@/utils/constants"
import { Section } from "@/utils/dataSections"
import { GET_COMPONENTS_KEY } from "@/contexts/AuthContext"

type PortifolioCardProps = {
    user: UserAccountInfo;
    acess_token: string;
    portfolioId?: string;
    onDeleteSuccess?: () => void;
    components: Section[];
}

export const PortifolioCard = ({ user, acess_token, portfolioId, onDeleteSuccess, components }: PortifolioCardProps) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const queryClient = useQueryClient();
    const userPhoto = components.find((component) => component.type === "PROFILE") as any;
    
    const deletePortifolioMutation = useDeletePortifolio(
        () => {
            toast({
                title: "Portfólio excluído",
                description: "Seu portfólio foi excluído com sucesso.",
            });
            setIsDeleteDialogOpen(false);
            // Invalidate and refetch the portfolios query
            queryClient.invalidateQueries({ queryKey: ["portfolios", acess_token, locale] });
            localStorage.removeItem(KEYS_STORAGE.sectionsEdit);
            localStorage.removeItem(KEYS_STORAGE.sections);
            localStorage.removeItem(GET_COMPONENTS_KEY);
            onDeleteSuccess?.();
        },
        (error) => {
            toast({
                title: "Erro ao excluir",
                description: "Ocorreu um erro ao excluir o portfólio. Tente novamente.",
                variant: "destructive",
            });
        }
    );
    
    const handleDeleteConfirm = () => {
        if (!acess_token) {
            toast({
                title: "Erro",
                description: "Informações necessárias não encontradas.",
                variant: "destructive",
            });
            return;
        }

        localStorage.removeItem(KEYS_STORAGE.sectionsEdit);
        localStorage.removeItem(KEYS_STORAGE.sections);
        
        deletePortifolioMutation.mutate({
            token: acess_token,
            locale
        });
    };

    const handleEditPortfolio = () => {
        if (!user.domain) {
            toast({
                title: "Erro",
                description: "Domínio do usuário não encontrado.",
                variant: "destructive",
            });
            return;
        }
        
        router.push(`/${locale}/portifolio/edit/${user.domain}`);
    };
    return (
        <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
                <div className="flex items-center gap-2">
                    <Image
                        src={userPhoto.images[0].url ?? DEFAULT_AVATAR}
                        alt="Profile avatar"
                        className="rounded-full"
                        width={48}
                        height={48}
                    />
                    <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-50">{user.username}</h3>
                        <p className="text-sm text-gray-200">bjjlink.site/{user.domain}</p>
                    </div>
                </div>
                <Separator className="bg-gray-600 my-4" />
                <div className="flex items-center justify-between">
                    <Button className="bg-brand-blue-600/15 text-brand-blue-300">
                        Editar link
                    </Button>
                    <div className="flex gap-2">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-brand-blue-500 hover:text-brand-blue-600 hover:bg-brand-blue-600/15"
                            onClick={handleEditPortfolio}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-brand-blue-500 hover:text-brand-blue-600  hover:bg-brand-blue-600/15">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-900 border-gray-700">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-gray-50">
                                        Confirmar exclusão
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-gray-300">
                                        Tem certeza que deseja excluir este portfólio? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700">
                                        Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction 
                                        onClick={handleDeleteConfirm}
                                        disabled={deletePortifolioMutation.isPending}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        {deletePortifolioMutation.isPending ? "Excluindo..." : "Excluir"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}