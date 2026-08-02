const mongoose = require("mongoose");
const dns = require("dns");

// Custom DNS servers to fix querySrv ECONNREFUSED issues on local Windows networks / ISPs when connecting to MongoDB Atlas +srv URIs
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore error if system environment restricts setting DNS
}

async function ConnectToDb() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log("database not connected:", err.message);
    });
}

module.exports = ConnectToDb;
