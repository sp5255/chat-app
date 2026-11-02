import mongoose, { connect } from "mongoose";

const makeDBConnection = async () => {
  const dbUrl =
    "mongodb+srv://user1:yRkWr0JAoQXP@cluster0.oyewr.mongodb.net/chatAppDb?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await connect(dbUrl);
    console.log("connected to db");
  } catch (err) {
    console.log("error connecting mongo db", err);
  }

  mongoose.connection.on("error", () => {
    console.log("some error occurred in connecting with mongodb");
  });
};

export default makeDBConnection;
