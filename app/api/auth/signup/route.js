import { NextResponse } from "next/server";
import { passwordHash } from "@/utils/utils";
import User from "@/app/models/user";

export async function POST(request) {
  const body = await request.json();
  let { email, password, fullName } = body;

  try {
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Normalizar email: trim y minúsculas para evitar duplicados por formato
    email = String(email).trim().toLowerCase();

    // Validar que password sea un string
    if (typeof password !== "string") {
      return NextResponse.json(
        { error: "Password must be a string" },
        { status: 400 },
      );
    }

    // Validar longitud de la contraseña ANTES de hashearla
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    }

    // Comprobar si el email ya existe (usando el email normalizado)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = passwordHash(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      fullName: fullName.trim(),
    });
    
    // Convertir a objeto y eliminar el password antes de retornar
    const userObject = user.toObject(); // Convertir a objeto
    delete userObject.password; // Eliminar el password antes de retornar
    
    return NextResponse.json(
      { message: "User created successfully", user: userObject },
      { status: 201 },
    );
  } catch (error) {
    // Manejar errores de validación de Mongoose
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message,
      );
      return NextResponse.json(
        {
          error: "Validation error",
          details: validationErrors,
        },
        { status: 400 },
      );
    }
    // Manejar errores de duplicado (email único), p. ej. condición de carrera
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
