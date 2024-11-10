import express from "express";
import cors from "cors";
import router from "./router.js";
import error from "./middlewares/error.js";
import notFound from "./middlewares/notfound.js";
const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/todos", router);

app.use(error);
app.use(notFound);

app.listen(port, () => {
  console.log("You're listening port", port);
});
