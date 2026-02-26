"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ToastService from "@/app/services/ToastService"
import { login } from "@/app/hooks/useAuth"
import {type loginType } from "@/app/features/types"
import { Mail , Lock } from "lucide-react"
import { signInSchema } from "@/app/features/employess/validation";
import locked from "../../../public/locked.png" 
import Image from "next/image";
const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(signInSchema),defaultValues: { email: "", password: "",}});
    const router = useRouter();
    async function onSubmit(data: loginType) {
        await login(data.password , data.email).then(()=>router.push('/Dashboard')).catch(()=>ToastService.error("Invalid email or password"))
    }
  
    return (
        <Card className="w-full max-w-sm  ml-11 mt-15 md:ml-140 md:mt-30">
            <Image src={locked} alt="" width={60} height={60} className=" ml-40"/>
            <CardHeader>
                <CardTitle className="text-2xl text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                             <div className="flex"> <Mail className="mt-2 mr-2" size={18}/> <Input className="inline-block" id="email" {...register('email')} /></div>
                            {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                        </div>
                        <div className="input-icons grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <div className="flex"><Lock className="mt-2 mr-2" size={18} /> <Input id="password" type='password'  {...register('password')} autoComplete="off"/></div>
                            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
                        </div>
                        <div className='flex items-center ms-3'>
                            <input type="checkbox" 
                            /><span className='ml-3'>Remember me</span>
                            <a href="#" className="ml-auto inline-block text-sm text-sky-700 underline-offset-4 hover:underline">Forgot your password?
                            </a></div>
                        <Button type="submit" className="w-full bg-sky-700">
                            Login
                        </Button>
                    </div>
                </form>
            </CardContent>

        </Card>
    )
}

export default LoginForm

