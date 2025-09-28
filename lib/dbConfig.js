const { default: mongoose } = require("mongoose");

const ConnectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error, "Database connection failed");
  }
};
export default ConnectionDB;
