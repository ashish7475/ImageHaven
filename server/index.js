import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "x-access-token",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

const PORT = process.env.PORT || 5000;
const mongoUsername = process.env.NAME;
const mongoPassword = process.env.PASSWORD;

try {
  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(
        `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.pt8fh2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      );
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  app.use("/", routes);
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("listening for requests at PORT", PORT);
    });
  });
} catch (error) {
  console.log(error);
}
