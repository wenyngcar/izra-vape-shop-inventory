
import path from "path";
import url from "url";

import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import apiRouter from "./middleware/api/router.js";
import Variant from "./database/models/Variant.js";
import dotenv from "dotenv";

dotenv.config()
// This gets the file and folder name of this JavaScript file.
// This is needed for serving static files.
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = {
    application: express(),
    port: process.env.PORT,
};
const database = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    cluster: process.env.DATABASE_CLUSTER,
    name: process.env.DATABASE_NAME,
};

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const mongodbString = `mongodb+srv://${database.username}:${database.password}@${database.cluster}.n4rnz.mongodb.net/${database.name}?retryWrites=true&w=majority&appName=${database.cluster}`;

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
    await mongoose.connect(mongodbString, clientOptions);
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
