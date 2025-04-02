import express from "express";
import { client } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
    client.user.findMany()
    .then((users: any) => {
      res.json(users);
    })
    .catch((err: { message: any; }) => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  client.user.create({
    data: {
      username,
      password
    }
  })
    .then((user: any) => {
      res.status(201).json(user);
    })
    .catch((err: { message: any; }) => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8080);