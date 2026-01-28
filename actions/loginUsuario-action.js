"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function loginUsuario(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackUrl = formData.get("callbackUrl") || "/dashboard";

  try {
    // Primero verificar si el usuario existe y está verificado
    // Esto lo hacemos importando el modelo directamente
    const User = (await import("@/app/models/user")).default;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (user && !user.isVerified) {
      return { 
        error: "Por favor verifica tu email antes de iniciar sesión. Revisa tu bandeja de entrada.", 
        success: null, 
        redirect: null 
      };
    }

    // Usar NextAuth signIn con el provider de credentials
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // No redirigir automáticamente, manejarlo manualmente
    });

    if (result?.error) {
      // Si hay error, retornar el mensaje de error
      return { error: "Credenciales inválidas", success: null, redirect: null };
    }

    // Si el login es exitoso, redirigir directamente desde el servidor
    redirect(callbackUrl);
  } catch (error) {
    // Si el error es de redirect, dejarlo pasar (es el comportamiento esperado)
    if (error?.message === "NEXT_REDIRECT") {
      throw error;
    }
    
    console.error("Error en loginUsuario:", error);
    return { error: "Error al iniciar sesión", success: null, redirect: null };
  }
}
