const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "companyDB";

async function run() {
  await client.connect();
  const db = client.db(dbName);
  const employees = db.collection("employees");

  // CREATE
  await employees.insertOne({ name: "Shivani", role: "Developer", salary: 50000 });

  // READ
  const data = await employees.find().toArray();
  console.log("All Employees:", data);

  // UPDATE
  await employees.updateOne({ name: "Shivani" }, { $set: { salary: 60000 } });

  // DELETE
  await employees.deleteOne({ name: "Shivani" });

  await client.close();
}

run();
