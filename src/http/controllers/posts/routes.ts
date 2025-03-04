import { FastifyInstance } from "fastify";
import { register } from "../posts/register";
import { list } from "./list";
import { deletePost } from "./delete-post";
import { updatePost } from "./update-post";
import { findPostById } from "./find-post-by-id";
import { findPostsByUser } from "./find-by-user";

export function postsRoutes(app: FastifyInstance){
    app.post("/posts", register)
    app.get("/posts", list);
    app.delete('/posts/:id', deletePost);
    app.patch("/posts/:id", updatePost)
    app.get("/posts/:id", findPostById)
    app.get("/posts/user/:userId", findPostsByUser)
}
