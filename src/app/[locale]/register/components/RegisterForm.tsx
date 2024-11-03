import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema } from '@/utils/schema';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type RegisterFormProps = {
  onSubmit: (values: z.infer<typeof registerSchema>) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
    const t = useTranslations("register")
    const [showPassword, setShowPassword] = useState(false)
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <FormField 
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-1">
                    <Label htmlFor="username" className="text-sm font-normal text-gray-200">
                        {t('form.user-name')}
                    </Label>
                    <Input
                        id="username"
                        placeholder={t('form.user-name-placeholder')}
                        type="username"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                        {...field}
                    />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
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
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {t('form.start-now-button')}
        </Button>
      </form>
    </Form>
  );
}