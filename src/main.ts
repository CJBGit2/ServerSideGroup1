import express from "express";
import evaluationroutes from "./routes/routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use("/api", evaluationroutes);

app.listen(3000, () => console.log("Server running on 3000"));