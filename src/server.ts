import { app } from "./app";

app.get("/health", (req, reply) => {
  reply.status(200).send();
});

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log("Server running on port 3333");
  });
