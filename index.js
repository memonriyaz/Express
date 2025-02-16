import "dotenv/config";
import express from "express";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/new-user", (req, res) => {
  res.send("Welcome");
});

let teaData = [];
let newId = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: newId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(200);
  res.send(newTea);
});

app.get("/teas", (req, res) => {
  res.status(200);
  res.send(teaData);
});

app.get("/teas/:id", (req, res) => {
  let tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("Nahi hai");
  }
  res.status(200).send(tea);
});

app.put("/teas/:id", (req, res) => {
  const teaID = req.params.id;
  let tea = teaData.find((t) => t.id === parseInt(teaID));
  if (!tea) {
    res.status(404).send("Nahi hai");
  }
  tea.name = req.body.name;
  tea.price = req.body.price;
  res.send(tea);
});

app.delete("/teas/:id", (req, res) => {
  let teaID = req.params.id;
  let tea = teaData.find((t) => t.id === parseInt(teaID));
  teaData = teaData.filter((t) => t.id !== parseInt(teaID));
  if (!tea) {
    res.status(404).send("Nahi hai");
  }
  res.send(teaData);
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});
