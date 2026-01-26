"use client";
import styles from "./page.module.css";
import { signOutAction } from "@/actions/signout-action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
export default function Dashboard() {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);
    
    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);
            await signOutAction();
            // Redirigir después de cerrar sesión
            router.push("/login");
            router.refresh(); // Refrescar para limpiar el estado de la sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setIsSigningOut(false);
        }
    };

    return (
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            <Link href="/estudios">Estudios</Link>
            <button 
                onClick={handleSignOut} 
                disabled={isSigningOut}
            >
                {isSigningOut ? "Cerrando sesión..." : "Sign Out"}
            </button>
                                
        </div>
    )
}