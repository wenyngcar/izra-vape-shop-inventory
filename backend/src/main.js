
import path from "path";
import url from "url";

import express from "express";
import mongoose from "mongoose";

import apiRouter from "./middleware/api/router.js";

// This gets the file and folder name of this JavaScript file.
// This is needed for serving static files.
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = {
    application: express(),
    port: 3000,
};
const database = {
    host: "127.0.0.1",
    port: "27017",
    name: "test",
};

// Middleware goes here...
server.application.use(express.json());
server.application.use(express.static(path.join(__dirname, "public")));
server.application.use("/api", apiRouter);

server.application.get("/", (req, res) => {
    res.redirect("/main");
});

// Starting the server.
server.application.listen(server.port, async () => {
    console.log(`Application is listening on port ${server.port}`);

    // Connecting to the MongoDB database.
    const mongodbString = `mongodb://${database.host}:${database.port}/${database.name}`;
    await mongoose.connect(mongodbString);
    console.log(`Application has successfully connected to MongoDB.`);
});
