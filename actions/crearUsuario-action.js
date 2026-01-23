"use server";
import axios from "axios";

export async function crearUsuario(prevState, formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/signup",
            { fullName, email, password },
            { validateStatus: () => true }
        );

        if (response.status !== 201) {
            const msg = response.data?.error || response.data?.details?.join?.(", ") || "Error al crear el usuario";
            return { error: msg, success: null };
        }
        return { success: "Usuario creado correctamente", error: null };
    } catch (err) {
        const msg = err.response?.data?.error || err.response?.data?.details?.join?.(", ") || err.message || "Error al crear el usuario";
        return { error: msg, success: null };
    }
}