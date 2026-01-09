const { MongoClient } = require("mongodb");

async function run() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  const db = client.db("companyDB");

  const result = await db.collection("employees").aggregate([
    { $group: { _id: "$role", totalSalary: { $sum: "$salary" } } }
  ]).toArray();

  console.log(result);
  await client.close();
}

run();
