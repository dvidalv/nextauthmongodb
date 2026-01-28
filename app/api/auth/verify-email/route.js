import { NextResponse } from "next/server";
import User from "@/app/models/user";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/login?error=token-missing", request.url)
      );
    }

    // Buscar usuario con el token (incluir campos con select: false)
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    })
      .select("+verificationToken +verificationTokenExpires")
      .exec();

    if (!user) {
      return NextResponse.redirect(
        new URL("/login?error=token-invalid", request.url)
      );
    }

    // Marcar usuario como verificado y limpiar el token
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    // Redirigir al login con mensaje de éxito
    return NextResponse.redirect(
      new URL("/login?verified=true", request.url)
    );
  } catch (error) {
    console.error("Error al verificar email:", error);
    return NextResponse.redirect(
      new URL("/login?error=verification-failed", request.url)
    );
  }
}
