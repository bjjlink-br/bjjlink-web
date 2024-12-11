import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { resetPasswordSchema } from '@/utils/schema';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Spinner } from '@/components/shared/Spinner';

type ResetPasswordFormProps = {
    onSubmit: (values: z.infer<typeof resetPasswordSchema>) => void;
    isLoading?: boolean;
}

export const ResetPasswordForm = ({ onSubmit, isLoading }: ResetPasswordFormProps) => {
    const t = useTranslations("reset-password")
    const [showPassword, setShowPassword] = useState(false)
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
    });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirm_password");

  const validatePasswordStrength = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  };

  useEffect(() => {
    if (password !== confirmPassword) {
        form.setError("confirm_password", {
          type: "manual",
          message: t('form.passwords-not-matching'),
        });
    } else {
        form.clearErrors("confirm_password");
    }

    if (password && confirmPassword && password === confirmPassword) {
      if (!validatePasswordStrength(password)) {
        form.setError("password", {
          type: "manual",
          message: t('form.weak-password'),
        });
      } else {
        form.clearErrors("password");
      }
    }
  }, [password, confirmPassword, form, t]); 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-1">
                    <Label htmlFor="email" className="text-sm font-normal text-gray-200">
                        {t('form.email')}
                    </Label>
                    <Input
                        id="email"
                        placeholder={t('form.email-placeholder')}
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
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                    <div className="space-y-1">
                        <Label htmlFor="password" className="text-sm font-normal text-gray-200">
                            {t('form.password')}
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                placeholder={t('form.password-placeholder')}
                                type={showPassword ? "text" : "password"}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                                disabled={isLoading}
                                {...field}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm rounded-none leading-5 rounded-tr-sm rounded-br-sm hover:bg-brand-blue-700 hover:text-white bg-brand-blue-600 text-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? t('form.hidden-password-button') : t('form.show-password-button')}
                            </Button>
                        </div>
                    </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                    <div className="space-y-1">
                        <Label htmlFor="confirm_password" className="text-sm font-normal text-gray-200">
                            {t('form.confirmation-password')}
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirm_password"
                                placeholder={t('form.confirmation-placeholder')}
                                type={showPassword ? "text" : "password"}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                                disabled={isLoading}
                                {...field}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm rounded-none leading-5 rounded-tr-sm rounded-br-sm hover:bg-brand-blue-700 hover:text-white bg-brand-blue-600 text-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? t('form.hidden-password-button') : t('form.show-password-button')}
                            </Button>
                        </div>
                        {form.formState.errors.confirm_password && (
                          <span className="text-red-400 text-sm">
                            {form.formState.errors.confirm_password.message}
                          </span>
                        )}
                        {form.formState.errors.password && (
                          <span className="text-red-400 text-sm">
                            {form.formState.errors.password.message}
                          </span>
                        )}
                    </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading || !!form.formState.errors.confirm_password}
        >
          {isLoading ? <Spinner /> : t('form.reset-password-button')}
        </Button>
      </form>
    </Form>
  )
}