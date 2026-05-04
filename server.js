const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let data = {
    message: "waiting data",
    temperature: 0,
    humidity: 0,
    device: "none"
};

// استقبال data من Raspberry Pi
app.post("/data", (req, res) => {
    data = req.body;
    console.log("Data received:", data);
    res.json({ status: "ok", data });
});

// إرسال data للواجهة
app.get("/data", (req, res) => {
    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
