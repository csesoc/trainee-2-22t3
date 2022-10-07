import express from "express";

// Setup app
const app = express();

let dataStore = {
  tasks: [1, 4, 6, 4, 8],
};
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello");
  res.send("hi!!!!");
});

app.get("/tasks/get", (req, res) => {
  res.send(dataStore.tasks);
});

app.post("/tasks/post", (req, res) => {
  let newTask = req.body.taskNum;
  dataStore.tasks.push(newTask);
  res.send("success");
});

app.listen(5000, async () => {
  console.log("Doom Tracker API started!");
  console.log("listening on port 5000");
});
