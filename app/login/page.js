"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useActionState } from "react";
// TODO: Importar acción de login cuando esté disponible
// import { loginUsuario } from "@/actions/loginUsuario-action";
import { signinUsuarioAction } from "@/actions/signinUsuarioAction";

export default function Login() {
  // TODO: Implementar cuando la acción de login esté disponible
  const [state, action, isPending] = useActionState(
    signinUsuarioAction,
    {
      error: null,
      success: null,
    }
  );

  return (
    <div className={styles.login}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Ingresa a tu cuenta</p>
        <form className={styles.form} action={action}>
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
