import express from "express";
import dotenv from "dotenv";
import DBCon from "./utlis/db.js";
import AuthRoutes from "./routes/Auth.js";
import cookieParser from "cookie-parser";
import BlogsRoutes from "./routes/Blog.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

//Mongodb Connection
DBCon();
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json());

app.get("./", (req, res) => {
  res.send("Hello from backend");
});

app.use("/auth", AuthRoutes);
app.use('/blog',BlogsRoutes)

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
