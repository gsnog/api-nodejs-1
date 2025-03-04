import fastify from "fastify";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { postsRoutes } from "./http/controllers/posts/routes";

export const app = fastify();

app.register(fastifyCors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
});

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}

app.register(fastifyJwt, {
    secret: jwtSecret, 
    cookie: {
        cookieName: "refreshToken",
        signed: false,
    },
    sign: {
        expiresIn: "10m"
    }
});

app.register(fastifyCookie);
app.register(userRoutes);
app.register(postsRoutes);

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation Error", issues: error.format() });
    }
    return reply.status(500).send({ message: "Internal Server Error" });
});