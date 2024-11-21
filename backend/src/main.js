
import path from "path";
import url from "url";

import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import apiRouter from "./middleware/api/router.js";

import Variant from "./database/models/Variant.js";

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

// Automatically converts request body to JSON.
server.application.use(express.json());

// Deals with the CORS policy, that prevents connecting the frontend to the backend.
server.application.use(cors({
    origin: true,
    credentials: true,
}));

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

    // TODO: Fix this.
    const closedPodDetails = {
        name: "Closed Pod",
        description: "This is a closed pod.",
        category: "Device",
    }

    const variants = await Variant.find(closedPodDetails);

    if (variants.length === 0) {
        const variant = new Variant(closedPodDetails);
        await variant.save();
    }
});
