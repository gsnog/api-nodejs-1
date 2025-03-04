import "dotenv/config";
import { app } from "./app"
import { env } from "src/env/index";



app.listen({
    host: "0.0.0.0",
    port: env.PORT
}).then(() => {
    console.log("Servidor está rodando na porta: http://localhost:3333")
})