import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import { MongoClient } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 80;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

const uri = "mongodb+srv://sunshinemocha:DpqKByxiAWpYXvfD@cluster0.dl5kklx.mongodb.net/?retryWrites=true&w=majority"
  // "mongodb+srv://primalmontage:3PGF44ZM3N@cluster0.7qxlejr.mongodb.net/admin?retryWrites=true&replicaSet=atlas-tcnltt-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1";

app.use("/", express.static(path.join(__dirname, "static")));

// app.get("/api/user", async (req, res) => {
//   const client = new MongoClient(uri);
//   try { 
//     const database = client.db("francesco");
//     const users = database.collection("users");
//     const query = { name: "Simone" };
//     const user = await users.findOne(query);
//     res.send(user);
//   } catch (error) {
//     res.send("EMERGENZA");
//   }
// });

app.get("/api/users", async (req, res) => {
  const client = new MongoClient(uri);
  try { 
    const database = client.db("francesco");
    const users = database.collection("users");
    const cursor = users.find();
  const arrayOfUsers = await cursor.toArray()
    res.send(arrayOfUsers);
  } catch (error) {
    res.send("EMERGENZA");
  } finally {
    client.close()
  }
});

app.post("/api/users", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    const database = client.db("francesco");
    let collection = await database.collection("users");
    let newUser = req.body;
    let result = await collection.insertOne(newUser);
    res.send(result).status(204);
  } catch (error) {
    res.send('POST not working')
  } finally {
    client.close()
  }
 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
