# Uso de los controladores de comprobantes desde Next.js

Los controladores en `app/controllers/comprobantes.js` provienen de un proyecto Express. Para usarlos desde las rutas API de Next.js se utiliza el adaptador en `lib/nextControllerAdapter.js`.

## Cómo usarlos

En cualquier `app/api/.../route.js`:

```js
import { runWithNext } from "@/lib/nextControllerAdapter";
import { nombreDelControlador } from "@/app/controllers/comprobantes";

// POST con body y sesión
export async function POST(request) {
  return runWithNext(nombreDelControlador, request, { requireAuth: true });
}

// GET con parámetro de ruta (ej. app/api/comprobantes/[id]/route.js)
export async function GET(request, { params }) {
  const { id } = await params;
  return runWithNext(nombreDelControlador, request, { params: { id }, requireAuth: true });
}
```

El adaptador construye un `req` con:

- `req.body` — cuerpo JSON del request
- `req.params` — parámetros de la ruta (se pasan en `options.params`)
- `req.query` — query string (desde `request.url`)
- `req.headers` — cabeceras (`.authorization`, `x-api-key`, etc.)
- `req.user` — sesión de NextAuth (`{ _id: session.user.id, ... }`); `null` si no hay sesión

Y un `res` tal que `return res.status(code).json(data)` devuelve una `NextResponse` que el adaptador retorna.

## Lista de controladores exportados

| Controlador | Uso típico | requireAuth | Notas |
|-------------|------------|-------------|--------|
| `createComprobante` | POST, body (rango) | Sí | `req.user._id` → usuario |
| `getAllComprobantes` | GET, query (page, limit, estado, tipo_comprobante, rnc, vencimiento_proximo) | No* | *No filtra por usuario en el controller |
| `getComprobanteById` | GET, params.id | Sí | |
| `updateComprobante` | PATCH/PUT, params.id, body | Sí | |
| `updateComprobanteEstado` | PATCH, params.id, body (estado) | Sí | |
| `deleteComprobante` | DELETE, params.id | Sí | |
| `getComprobantesStats` | GET, query | Sí | |
| `consumirNumero` | POST, params.id | Sí | Consume número de un rango por ID |
| `consumirNumeroPorRnc` | POST, body (rnc, tipo_comprobante, solo_preview?) | No | Usa **API Key** en header (Authorization Bearer o x-api-key) |
| `enviarFacturaElectronica` | POST, body (factura para TheFactory) | Sí | |
| `consultarEstatusDocumento` | POST, body (ncf, reintentar?) | No | |
| `generarCodigoQR` | POST, body (url, rnc, ncf, etc.) | No | |
| `limpiarTokenCache` | POST | No | Debug |
| `enviarEmailFactura` | POST, body | Sí | |
| `anularComprobantes` | POST, body | Sí | |
| `descargarArchivo` | POST, body (rnc, documento, extension) | Sí | |
| `verificarServidorTheFactory` | GET | No | |

## Requisitos

1. **Siempre `return res.status(...).json(...)`**  
   Cada handler debe devolver el resultado de `res.status().json()` para que el adaptador pueda devolver la `NextResponse`.

2. **`requireAuth: true`**  
   Cuando lo uses, el adaptador comprueba sesión antes de llamar al controller; si no hay sesión responde 401.

3. **`consumirNumeroPorRnc`**  
   No usa sesión; usa API Key en cabecera. No pongas `requireAuth: true`; el propio controller valida la key.

4. **Parámetros de ruta**  
   Pásalos en `options.params`, por ejemplo `{ params: { id } }` para `app/api/comprobantes/[id]/route.js`.

## Ejemplo completo (crear comprobante)

```js
// app/api/comprobantes/route.js (o una ruta que quieras usar para crear)
import { runWithNext } from "@/lib/nextControllerAdapter";
import { createComprobante } from "@/app/controllers/comprobantes";

export async function POST(request) {
  return runWithNext(createComprobante, request, { requireAuth: true });
}
```

## Dependencias del controller

- `@/app/models/comprobante` — modelo Comprobante
- `@/app/models/user` — modelo User (API Key)
- `@/utils/apiKey` — hashApiKey
- `@/utils/constants` — URLs y credenciales TheFactory
- `@/api-mail_brevo` — sendEmail
- `@/utils/verificarTheFactory` — verificarEstadoTheFactory (para verificarServidorTheFactory)

Si falta algún módulo (por ejemplo `verificarTheFactory`), ese endpoint fallará hasta que lo añadas o lo mocks.
