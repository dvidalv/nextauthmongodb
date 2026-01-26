import { handlers } from "@/auth";

// Explicitly set runtime to Node.js to support bcryptjs and MongoDB
export const runtime = 'nodejs';

export const { GET, POST } = handlers;