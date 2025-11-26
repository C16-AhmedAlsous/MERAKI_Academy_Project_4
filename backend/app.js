const express = require("express");
const cors = require("cors");
const db = require("./models/db");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const usersRouter = require("./routes/usersRouter")
const rolesRouter = require("./routes/rolesRouter")
const productRouter = require("./routes/productRouter")
const cartRouter = require("./routes/cartRouter")


app.use("/users",usersRouter)
app.use("/roles",rolesRouter)
app.use("/product",productRouter)
app.use("/cart",cartRouter)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
