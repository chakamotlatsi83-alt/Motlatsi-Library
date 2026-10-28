import mysql from "mysql2/promise";

const DB_PASSWORD = "Chaka@1234";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: DB_PASSWORD,
  database: "maseru_library",
  waitForConnections: true,
  connectionLimit: 10,
});

async function init() {
  try {
    // 1. Create DB if not exists — MUST use password here too
    const conn = await mysql.createConnection({ 
      host: "localhost", 
      user: "root", 
      password: DB_PASSWORD 
    });
    await conn.query("CREATE DATABASE IF NOT EXISTS maseru_library");
    await conn.end();
    console.log("Database checked/created");

    // 2. Create tables
    await pool.query(`CREATE TABLE IF NOT EXISTS books (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255),
      genre VARCHAR(100),
      isbn VARCHAR(50),
      quantity INT,
      total INT
    )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255),
      membershipId VARCHAR(50) UNIQUE,
      role VARCHAR(50)
    )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS transactions (
      id VARCHAR(50) PRIMARY KEY,
      bookId VARCHAR(50),
      membershipId VARCHAR(50),
      type VARCHAR(20),
      date DATETIME
    )`);

    // 3. Seed data if empty
    const [books] = await pool.query("SELECT COUNT(*) as c FROM books");
    if (books[0].c === 0) {
      await pool.query(`INSERT INTO books VALUES
        ('b1','Things Fall Apart','Chinua Achebe','Fiction','978-0-385-47454-2',3,5),
        ('b2','Born a Crime','Trevor Noah','History','978-0-399-58817-8',1,4),
        ('b3','Cry, the Beloved Country','Alan Paton','Fiction','978-0-684-83904-6',0,3)`);
      console.log("Seeded books");
    }
    const [users] = await pool.query("SELECT COUNT(*) as c FROM users");
    if (users[0].c === 0) {
      await pool.query(`INSERT INTO users VALUES
        ('1','Motlatsi Chaka','LIB-001','Admin'),
        ('2','Teboho Lerato','LIB-002','Librarian'),
        ('3','Palesa Mokoena','LIB-003','Student')`);
      console.log("Seeded users");
    }
    
    console.log("MySQL connected + tables ready");
  } catch (err) {
    console.error("DB Init Error:", err.message);
  }
}
init();

export default pool;