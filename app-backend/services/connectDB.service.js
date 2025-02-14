import { connect } from "mongoose";

const makeDBConnection = async () => {
  const dbUrl =
    "mongodb+srv://user1:yRkWrr20JAo8bQXP@cluster0.oyewr.mongodb.net/chatAppDb?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await connect(dbUrl);
    console.log("connected to db");
  } catch (err) {
    console.log("error connecting mongo db", err);
  }
};

export default makeDBConnection;
