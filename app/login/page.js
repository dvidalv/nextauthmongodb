"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useActionState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { loginUsuario } from "@/actions/loginUsuario-action";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  
  const [state, action, isPending] = useActionState(
    loginUsuario,
    {
      error: null,
      success: null,
      redirect: null,
    }
  );

  // Redirigir cuando el login sea exitoso
  useEffect(() => {
    if (state.redirect) {
      router.push(state.redirect);
    }
  }, [state.redirect, router]);

  return (
    <div className={styles.login}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Ingresa a tu cuenta</p>
        <form className={styles.form} action={action}>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <input
            type="email"
            name="email"
            placeholder="Tu email"
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Iniciar Sesión
          </button>
        </form>
        <div className={styles.messages}>
          {state.error && <p className={styles.error}>{state.error}</p>}
          {state.success && <p className={styles.success}>{state.success}</p>}
          {isPending && <p className={styles.pending}>Iniciando sesión...</p>}
        </div>
        <div className={styles.registerLink}>
          ¿No tienes una cuenta? <Link href="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}
