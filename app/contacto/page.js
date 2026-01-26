"use client";
import styles from "./page.module.css";
import { useActionState } from "react";

export default function Contacto() {
  const [state, action, isPending] = useActionState(
    async (prevState, formData) => {
      // Aquí irá la lógica de envío del formulario
      try {
        // Simulación de envío (reemplazar con la acción real)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          error: null,
          success: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
        };
      } catch (error) {
        return {
          error: "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.",
          success: null,
        };
      }
    },
    {
      error: null,
      success: null,
    }
  );

  return (
    <div className={styles.contacto}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Contacto</h1>
        <p className={styles.subtitle}>
          Contáctanos para cualquier consulta o solicitud de servicio
        </p>
        <form className={styles.form} action={action}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre completo"
            className={styles.input}
            required
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Tu teléfono"
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu email"
            className={styles.input}
            required
          />
          <textarea
            name="mensaje"
            placeholder="Tu mensaje"
            className={styles.textarea}
            rows="5"
            required
          />
          <button type="submit" className={styles.submitButton} disabled={isPending}>
            {isPending ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
        <div className={styles.messages}>
          {state.error && <p className={styles.error}>{state.error}</p>}
          {state.success && <p className={styles.success}>{state.success}</p>}
        </div>
      </div>
    </div>
  );
}