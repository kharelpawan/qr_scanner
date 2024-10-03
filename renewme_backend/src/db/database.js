import db from "./db.js";

// Example query
export async function getFarmers() {
  try {
    const [rows] = await db.query("SELECT * FROM farmers");
    return rows
  } catch (err) {
    console.error('Error executing query:', err);
  }
}

export async function getFarmer(id) {
  try {
    // farmer_id= ? `, [id] //in order to make injection free
    const [rows] = await db.query(`SELECT * FROM farmers WHERE farmer_id= ? `, [id]);
    return rows
  } catch (err) {
    console.error('Error executing query:', err);
  }
}

export async function createFarmer(farmer_name,formattedDate,labour_time,farmer_story,farmer_photo,labour_cost){
  const [result] = await db.query(`
    INSERT into farmers (farmer_name, farmer_debut, labour_time, farmer_story, farmer_photo,labour_cost)
    VALUES (?,?,?,?,?,?)
    `, [farmer_name,formattedDate,labour_time,farmer_story,farmer_photo,labour_cost]);
     const id = result.insertId;
    // console.log(id);
    return getFarmer(id)
}

export async function editFarmer(farmer_id, farmer_name, formattedDate, labour_time, farmer_story, farmer_photo, labour_cost) {
  const [result] = await db.query(`
    UPDATE farmers 
    SET 
      farmer_name = ?, 
      farmer_debut = ?, 
      labour_time = ?, 
      farmer_story = ?, 
      farmer_photo = ?, 
      labour_cost = ?
    WHERE farmer_id = ?
  `, [farmer_name, formattedDate, labour_time, farmer_story, farmer_photo, labour_cost, farmer_id]);
  
  // Check if any rows were affected (i.e., the update was successful)
  if (result.affectedRows === 0) {
    throw new Error(`Farmer with ID ${farmer_id} not found.`);
  }
  
  // Return the updated farmer details
  return getFarmer(farmer_id);
}


// DELETE FARMER BY ID 
export async function deleteFarmer(farmer_id) {
  // Delete the farmer by ID
  const [result] = await db.query(`
    DELETE FROM farmers WHERE farmer_id = ?
  `, [farmer_id]);

  // Return a success message or the result of the deletion
  return result.affectedRows > 0
    ? { message: `Farmer with ID ${farmer_id} has been deleted successfully.` }
    : { message: `Farmer with ID ${farmer_id} not found.` };
}


