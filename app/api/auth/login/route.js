import { NextResponse } from "next/server";
import { passwordCompare } from "@/utils/utils";
import User from "@/app/models/user";
export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    // Chain .select() before awaiting - need to get the query object first
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (user.isVerified !== true) {
      return NextResponse.json(
        { error: "Por favor verifica tu email antes de iniciar sesión." },
        { status: 403 },
      );
    }
    const isPasswordValid = passwordCompare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    if (user.isActive === false) {

      return NextResponse.json(
        { error: "Tu cuenta está desactivada. Contacta al administrador." },
        { status: 403 },
      );
    }
    const userObject = user.toObject();
    delete userObject.password;
    return NextResponse.json({ message: "Login successful", data: userObject });
  } catch (error) {
    console.error(error);
    // Handle both Axios errors and regular errors
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An error occurred during login";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
