// import db from "./dbConnection";
import db from '../db/db.js'


export const getFarmers = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM farmers"); // Await the promise-based query
    return res.status(200).json(data); // Return the fetched data
  } catch (err) {
    console.error("Error fetching farmers:", err); // Log the error
    return res.status(500).json({ error: "Internal Server Error" }); // Send a proper error response
  }
};


export const getFarmer = async (req, res) => {
  try {
    const { id } = req.params; // Get the farmer ID from the request parameters
    const [data] = await db.query("SELECT * FROM farmers WHERE farmer_id = ?", [id]); // Query to fetch farmer by ID

    if (data.length === 0) {
      // If no farmer is found, return a 404 response
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Return the fetched farmer data
    return res.status(200).json(data[0]);
  } catch (err) {
    // Log the error and send a 500 status code with an error message
    console.error("Error fetching farmer:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const createFarmer = async (req, res) => {
  try {
    const { farmer_name, formattedDate, labour_time, farmer_story, farmer_photo, labour_cost } = req.body; // Extract data from request body

    // Insert the new farmer into the database
    const [result] = await db.query(
      `INSERT INTO farmers (farmer_name, farmer_debut, labour_time, farmer_story, farmer_photo, labour_cost) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [farmer_name, formattedDate, labour_time, farmer_story, farmer_photo, labour_cost]
    );

    const id = result.insertId; // Get the newly inserted farmer's ID

    // Fetch the newly created farmer using the ID and return it as the response
    const [newFarmer] = await db.query("SELECT * FROM farmers WHERE farmer_id = ?", [id]);

    return res.status(201).json(newFarmer[0]); // Respond with the newly created farmer
  } catch (err) {
    // Log the error and return a 500 status code
    console.error("Error creating farmer:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const editFarmer = async (req, res) => {
  try {
    const { farmer_id } = req.params; // Extract farmer_id from request parameters
    const { farmer_name, formattedDate, labour_time, farmer_story, farmer_photo, labour_cost } = req.body; // Extract farmer details from request body

    // Update the farmer in the database
    const [result] = await db.query(
      `UPDATE farmers 
      SET 
        farmer_name = ?, 
        farmer_debut = ?, 
        labour_time = ?, 
        farmer_story = ?, 
        farmer_photo = ?, 
        labour_cost = ?
      WHERE farmer_id = ?`,
      [farmer_name, formattedDate, labour_time, farmer_story, farmer_photo, labour_cost, farmer_id]
    );

    // Check if the update was successful by looking at affectedRows
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Farmer with ID ${farmer_id} not found.` });
    }

    // Fetch the updated farmer details and return it as a response
    const [updatedFarmer] = await db.query("SELECT * FROM farmers WHERE farmer_id = ?", [farmer_id]);

    return res.status(200).json(updatedFarmer[0]);
  } catch (err) {
    // Log the error and send a 500 status response
    console.error("Error updating farmer:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



export const deleteFarmer = async (req, res) => {
  try {
    const { farmer_id } = req.params; // Extract farmer_id from request parameters

    // Delete the farmer by ID
    const [result] = await db.query(
      `DELETE FROM farmers WHERE farmer_id = ?`, 
      [farmer_id]
    );

    // Check if the farmer was deleted
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: `Farmer with ID ${farmer_id} has been deleted successfully.` });
    } else {
      return res.status(404).json({ message: `Farmer with ID ${farmer_id} not found.` });
    }
  } catch (err) {
    // Log the error and send a 500 status response
    console.error("Error deleting farmer:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



