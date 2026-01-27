"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/actions/signout-action";
import styles from "./header.module.css";

export default function LogoutButton() {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);
            await signOutAction();
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setIsSigningOut(false);
        }
    };

    return (
        <button 
            onClick={handleSignOut}
            disabled={isSigningOut}
            className={`${styles.navLink} ${styles.logoutButton}`}
        >
            {isSigningOut ? "Cerrando..." : "Logout"}
        </button>
    );
}
