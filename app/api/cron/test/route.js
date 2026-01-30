import { NextResponse } from "next/server";

/**
 * Cron de prueba.
 * Se puede invocar desde:
 * - Vercel Cron (vercel.json) en producción
 * - Servicios externos (cron-job.org, etc.) con header Authorization: Bearer CRON_SECRET
 * - Manualmente: curl -H "Authorization: Bearer TU_CRON_SECRET" http://localhost:3000/api/cron/test
 */
export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("[cron/test] CRON_SECRET no está definido en .env.local");
    return NextResponse.json({ error: "Cron no configurado" }, { status: 500 });
  }

  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (token !== cronSecret) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const now = new Date().toISOString();
    console.log(`[cron/test] Ejecutado a las ${now}`);

    // Aquí iría la lógica real del cron (ej: limpiar datos, enviar reportes, etc.)
    // Por ahora solo registramos que se ejecutó
    return NextResponse.json({
      ok: true,
      message: "Cron de prueba ejecutado correctamente",
      executedAt: now,
    });
  } catch (error) {
    console.error("[cron/test] Error:", error);
    return NextResponse.json(
      { error: "Error al ejecutar el cron" },
      { status: 500 },
    );
  }
}
