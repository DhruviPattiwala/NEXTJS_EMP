"use server";
import { encryptPassword, decryptPassword } from "../utils/encryption";
const secretKey = "5f34bc98e945c7hggh5656ghgh44mgjgjf";  //import.meta.env.VITE_SECRET_KEY || "";
import { api } from "./ApiClientService";
import { cookies } from 'next/headers';

export async function isUserExist(password: string, email: string) {
    if (!secretKey) { return false; }
    try {
        const encrypted_PWD = encryptPassword(password, secretKey);
        const res = await api.get(`/api/admin?email=${email}`);
        if (res.data.msg) {
            if (decryptPassword(res.data.msg.password, secretKey) == password && res.data.msg.email == email) {
                const cookieStore = await cookies();
                cookieStore.set('token', decryptPassword(res.data.msg.password, secretKey), {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 24,
                    path: '/',
                });
                return { ...res.data.msg, password: encrypted_PWD };
            }
        } else { return false; }

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return true
}
