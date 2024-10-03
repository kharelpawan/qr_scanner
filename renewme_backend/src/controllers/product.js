// import db from "./dbConnection";
import db from '../db/db.js'


export const getProducts = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM projects"); // Await the promise-based query
    return res.status(200).json(data); // Return the fetched data
  } catch (err) {
    console.error("Error fetching Products:", err); // Log the error
    return res.status(500).json({ error: "Internal Server Error" }); // Send a proper error response
  }
};


export const getProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get the farmer ID from the request parameters
    const [data] = await db.query("SELECT * FROM projects WHERE project_id = ?", [id]); // Query to fetch farmer by ID

    if (data.length === 0) {
      // If no farmer is found, return a 404 response
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the fetched farmer data
    return res.status(200).json(data[0]);
  } catch (err) {
    // Log the error and send a 500 status code with an error message
    console.error("Error fetching farmer:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllProductDetails = async (req, res) => {
  try {
    const { id } = req.params; // Get the project ID from the request parameters

    // Correct SQL query with JOIN
    const [data] = await db.query(
      `SELECT p.project_name, f.farmer_name 
       FROM projects p 
       JOIN farmers f ON p.farmer_id = f.farmer_id 
       WHERE p.project_id = ?`, 
      [id]
    );

    // If no product is found, return a 404 response
    if (data.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the fetched product and farmer data
    return res.status(200).json(data[0]);
  } catch (err) {
    // Log the error and send a 500 status code with an error message
    console.error("Error fetching product:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



export const createProduct = async (req, res) => {
  try {
    // Extract data from the request body
    const { project_name, project_location, project_altitude, variety_of_crop, carbon_emission, farmer_id, crop_id, store_id } = req.body;

    // Check if the farmer exists
    const [farmer] = await db.query("SELECT * FROM farmers WHERE farmer_id = ?", [farmer_id]);
    if (farmer.length === 0) {
      return res.status(404).json({ message: `Farmer with ID ${farmer_id} not found.` });
    }

    // Check if the store exists
    const [store] = await db.query("SELECT * FROM stores WHERE store_id = ?", [store_id]);
    if (store.length === 0) {
      return res.status(404).json({ message: `Store with ID ${store_id} not found.` });
    }

    // Check if the crop exists
    const [crop] = await db.query("SELECT * FROM crops WHERE crop_id = ?", [crop_id]);
    if (crop.length === 0) {
      return res.status(404).json({ message: `Crop with ID ${crop_id} not found.` });
    }

    // Insert the new product into the database
    const [result] = await db.query(
      `INSERT INTO projects (project_name, project_location, project_altitude, variety_of_crop, carbon_emission, farmer_id, crop_id, store_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [project_name, project_location, project_altitude, variety_of_crop, carbon_emission, farmer_id, crop_id, store_id]
    );

    const productId = result.insertId; // Get the newly inserted product's ID

    // Fetch the newly created product using the ID and return it as the response
    const [newProduct] = await db.query("SELECT * FROM projects WHERE project_id = ?", [productId]);

    return res.status(201).json(newProduct[0]); // Respond with the newly created product
  } catch (err) {
    // Log the error and return a 500 status code
    console.error("Error creating product:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};




export const editProduct = async (req, res) => {
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



export const deleteProduct = async (req, res) => {
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



