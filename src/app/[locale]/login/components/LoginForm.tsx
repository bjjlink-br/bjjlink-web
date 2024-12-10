import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from '@/utils/schema';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type LoginFormProps = {
  onSubmit: (values: z.infer<typeof loginSchema>) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                        E-mail
                    </Label>
                    <Input
                        id="email"
                        placeholder="Digite seu e-mail"
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
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                                Senha
                            </Label>
                            <Link href="#" className="text-sm text-gray-200 hover:underline">
                                Esqueceu a senha?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                placeholder="Digite a sua senha"
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
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </Button>
                        </div>
                    </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
            <Checkbox id="remember" className='border-brand-blue-500' />
            <Label htmlFor="remember" className="text-sm font-medium text-gray-200">
                Manter logado
            </Label>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading || !form.formState.isValid}
        >
          Entrar agora
        </Button>
      </form>
    </Form>
  );
}