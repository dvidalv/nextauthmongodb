"use server";
import axios from "axios";
export async function signinUsuarioAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
        // console.log("response:", response.data);
        if (response.status !== 200) {
            return { error: response.data.error, success: null };
        }
        return { success: response.data.message, error: null };
    } catch (error) {
        console.log("error:", error.response.data);
        // Handle both Axios errors and regular errors
        const errorMessage = error.response?.data?.error || error.message || "An error occurred during sign in";
        return { error: errorMessage, success: null };
    }
}