"use server";
import { signIn } from "@/auth";

export async function loginUsuario(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackUrl = formData.get("callbackUrl"); // Obtener callbackUrl del formData

  try {
    // Usar NextAuth signIn con el provider de credentials
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // No redirigir automáticamente, manejarlo en el cliente
    });

    if (result?.error) {
      // Si hay error, retornar el mensaje de error
      return { error: "Credenciales inválidas", success: null, redirect: null };
    }

    // Si el login es exitoso, retornar éxito con la ruta de redirección
    // Usar callbackUrl si existe, sino usar /dashboard por defecto
    const redirectTo = callbackUrl || "/dashboard";
    
    return { 
      error: null, 
      success: "Inicio de sesión exitoso", 
      redirect: redirectTo 
    };
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    return { error: "Error al iniciar sesión", success: null, redirect: null };
  }
}
