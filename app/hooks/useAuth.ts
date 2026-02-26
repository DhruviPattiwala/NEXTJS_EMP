"use client"
import { isUserExist, logoutUser } from "../services/AuthService";
let logedUser;

export async function login(password: string, email: string) {
    logedUser = await isUserExist(password, email);
    console.log(logedUser);
    if (logedUser) {
        console.log(logedUser);
        if (typeof window !== "undefined") {
            window.localStorage.setItem("Employee-LoginData", JSON.stringify(logedUser));
            return true;
        }

    } else { return false; }
}

export function logout() {
     localStorage.removeItem("Employee-LoginData");
    return logoutUser();
}



