
import bcrypt from "bcryptjs";
import User from "@/app/models/user";

export const passwordHash = (password) => {
    return bcrypt.hashSync(password, 10);
}

export const passwordCompare = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

export async function checkAdminExists() {
    try {
        // Buscar si existe al menos un usuario con rol de admin
        const adminUser = await User.findOne({ role: 'admin' });
        
        if (adminUser) {
            console.log("✅ Usuario admin encontrado:", {
                email: adminUser.email,
                fullName: adminUser.fullName,
                createdAt: adminUser.createdAt
            });
            return true;
        } else {
            console.log("⚠️ No se encontró ningún usuario con rol de admin");
            return false;
        }
    } catch (error) {
        console.error("❌ Error al buscar usuario admin:", error.message);
        return false;
    }
}