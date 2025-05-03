import db from './config/Database.js';  // Your database connection

(async () => {
  try {
    // Run the SQL to reset auto-increment to 1
    await db.query("ALTER TABLE users AUTO_INCREMENT = 1");

    console.log("Auto-increment value reset to 1 successfully!");
  } catch (err) {
    console.error("Error resetting auto-increment:", err.message);
  }
})();
