import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

/* ========================================================================== 
   1. Backend API Routes
   ========================================================================== */
app.get("/api/message", (c) => {
    return c.text("Hello Hono!");
});

/* ========================================================================== 
   2. Fallback Route: Pass everything else straight to your React App
   ========================================================================== */
app.all("*", async (c) => {
    const url = new URL(c.req.url);

    if (!url.pathname.startsWith("/api")) {
        return await c.env.ASSETS.fetch(c.req.raw);
    }

    return c.json({ error: "API endpoint route not found" }, 404);
});

// 🚀 CRITICAL FOR D1 BINDINGS: Export using standard ES module syntax explicitly 
export default {
    fetch: (request: Request, env: CloudflareBindings, ctx: ExecutionContext) => {
        return app.fetch(request, env, ctx);
    }
};
