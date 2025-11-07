import rateLimit from "express-rate-limit"

export const limiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: {"error": "Has excedido el límite de solicitudes. Por favor, inténtalo de nuevo más tarde."},
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})