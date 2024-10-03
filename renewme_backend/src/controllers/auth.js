import db from "../db/db.js";
import bcrypt from 'bcrypt'

// Fetch all admins from the database
export const getAllAdmins = async (req, res) => {
  try {
    // Use await for the query execution and destructuring for the result
    const [data] = await db.query("SELECT * FROM admin"); // Adjust table name if needed

    // Respond with the fetched data
    return res.status(200).json(data);
  } catch (err) {
    // Handle any errors and return a 500 status code
    return res.status(500).json({ error: err.message });
  }
};

// REGISTER ADMIN
export const registerAdmin = async(req, res) => {
  try {
    // Check if the user already exists
    const q = "SELECT * FROM admin WHERE email = ? OR username = ?";
    const [existingUser] = await db.query(q, [req.body.email, req.body.username]);

    // If the user already exists, return conflict status
    if (existingUser.length) {
      return res.status(409).json("User Already Exists");
    }

    // Hash the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Insert the new admin user into the database
    const insertQuery = "INSERT INTO admin(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];
    await db.query(insertQuery, [values]);

    // Return success response
    return res.status(200).json("Admin has been created");
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = (req, res) => {
  res.json("Login");
};
export const logout = (req, res) => {
  res.json("Logout");
};
