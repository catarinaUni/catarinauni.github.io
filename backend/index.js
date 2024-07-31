import express from "express";
import userRoutes from "./routes/rotas.js";
import cors from "cors";

const app = express();
const port = 8800;

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});