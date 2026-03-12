import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/utils/schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/shared/Spinner";

type ResetPasswordFormProps = {
  onSubmit: (values: z.infer<typeof resetPasswordSchema>) => void;
  isLoading?: boolean;
};

export const ResetPasswordForm = ({
  onSubmit,
  isLoading,
}: ResetPasswordFormProps) => {
  const t = useTranslations("reset-password");
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const validatePasswordStrength = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-1">
                  <Label
                    htmlFor="email"
                    className="text-sm font-normal text-gray-200"
                  >
                    {t("form.email")}
                  </Label>
                  <Input
                    id="email"
                    placeholder={t("form.email-placeholder")}
                    type="email"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : t("form.reset-password-button")}
        </Button>
      </form>
    </Form>
  );
};
