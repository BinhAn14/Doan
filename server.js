// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Phục vụ file tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, "public")));

// routes API
const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);

// Health / root API trả JSON để kiểm tra server còn sống
app.get("/api/health", (req, res) => {
  res.json({ message: "Product API is running" });
});

// Trả về file index.html cho các request không phải /api để frontend router nếu có
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
