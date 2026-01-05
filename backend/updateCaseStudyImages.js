import pool from "./config/db.js";

const updateImages = async () => {
  try {
    // Update case study images with the uploaded files
    await pool.query("UPDATE case_studies SET image = ? WHERE id = ?", [JSON.stringify(["1765286424592-771663485.png"]), 2]);
    await pool.query("UPDATE case_studies SET image = ? WHERE id = ?", [JSON.stringify(["1765286392753-893900477.png"]), 3]);
    await pool.query("UPDATE case_studies SET image = ? WHERE id = ?", [JSON.stringify(["1765286346265-352143070.png"]), 4]);
    await pool.query("UPDATE case_studies SET image = ? WHERE id = ?", [JSON.stringify(["1765286309513-58642249.png"]), 5]);
    
    // console.log("Images updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

updateImages();
