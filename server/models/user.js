import moongose from "mongoose";

const { Schema } = moongose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default moongose.model("User", userSchema);
