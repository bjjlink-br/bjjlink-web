"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"
import { UserAccountInfo } from "@/utils/types"
import DEFAULT_AVATAR from "@/assets/images/user.png"

export function ProfileSettings({ user }: { user: UserAccountInfo }) {
  const t = useTranslations("settings");

  return (
    <Card className="w-full mx-auto bg-gray-900 border-none">
      <CardHeader>
        <CardTitle className="text-gray-50">{t("profile.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.profile_photo ?? DEFAULT_AVATAR} alt="Profile picture" />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-200" htmlFor="name">{t("profile.name")}</Label>
            <Input
              className="bg-gray-800 border border-gray-600 text-gray-100"
              id="name"
              value={user.username}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-200" htmlFor="email">Email</Label>
            <Input
              className="bg-gray-800 border border-gray-600 text-gray-100"
              id="email"
              type="email"
              value={user.email}
              readOnly
            />
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full mt-5">
              {t("profile.button-delete-account")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900">{t("profile.dialog-confirmation.title")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("profile.dialog-confirmation.description")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border border-brand-blue-600 text-brand-blue-600">{t("profile.dialog-confirmation.cancel")}</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground text-red-600 hover:text-white">
                {t("profile.dialog-confirmation.delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}


