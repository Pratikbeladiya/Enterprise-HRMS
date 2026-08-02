require("dotenv").config();

const app = require("./app");
const ConnectToDb = require("./db/db");

// Database Connection
ConnectToDb();

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});