/*****************************************************
 MongoDB Complete Practice File
 Author: Shivani Padhariya
 Purpose: Hands-on practice for MongoDB fundamentals
 Database: company_mongo_db
*****************************************************/

use company_mongo_db

/***********************
 1. Create Collection
************************/

db.createCollection("employees")
db.createCollection("departments")

/***********************
 2. Insert Documents
************************/

db.departments.insertMany([
  { dept_id: 1, name: "IT" },
  { dept_id: 2, name: "HR" },
  { dept_id: 3, name: "Sales" }
])

db.employees.insertMany([
  { name: "Amit Sharma", email: "amit@gmail.com", department: "IT", salary: 60000, joiningDate: new Date("2022-01-15") },
  { name: "Neha Patel", email: "neha@gmail.com", department: "HR", salary: 45000, joiningDate: new Date("2021-07-10") },
  { name: "Rahul Mehta", email: "rahul@gmail.com", department: "Sales", salary: 55000, joiningDate: new Date("2023-03-01") },
  { name: "Priya Singh", email: "priya@gmail.com", department: "IT", salary: 70000, joiningDate: new Date("2020-11-25") }
])

/***********************
 3. Read Operations
************************/

// Find all employees
db.employees.find()

// Find IT employees
db.employees.find({ department: "IT" })

// Find salary greater than 55000
db.employees.find({ salary: { $gt: 55000 } })

/***********************
 4. Update Operations
************************/

// Increase Amit salary
db.employees.updateOne(
  { name: "Amit Sharma" },
  { $set: { salary: 65000 } }
)

// Add new field to all employees
db.employees.updateMany(
  {},
  { $set: { active: true } }
)

/***********************
 5. Delete Operations
************************/

// Delete Neha record
db.employees.deleteOne({ name: "Neha Patel" })

/***********************
 6. Sorting and Limiting
************************/

// Sort by salary descending
db.employees.find().sort({ salary: -1 })

// Top 2 highest salary
db.employees.find().sort({ salary: -1 }).limit(2)

/***********************
 7. Aggregation Pipeline
************************/

// Average salary by department
db.employees.aggregate([
  { $group: { _id: "$department", avgSalary: { $avg: "$salary" } } }
])

// Count employees per department
db.employees.aggregate([
  { $group: { _id: "$department", totalEmployees: { $sum: 1 } } }
])

/***********************
 8. Indexing
************************/

// Create index on department
db.employees.createIndex({ department: 1 })

// Create unique index on email
db.employees.createIndex({ email: 1 }, { unique: true })

/***********************
 9. Text Search Example
************************/

db.employees.createIndex({ name: "text" })

db.employees.find({ $text: { $search: "Amit" } })

/***********************
 10. Drop Collection (Practice only)
************************/

// db.employees.drop()
