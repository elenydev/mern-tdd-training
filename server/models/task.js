import moongose from "mongoose";

const { Schema } = moongose;

const taskSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  prio: {
    type: String,
    required: true,
  },
  creatorId: {
    type: String,
    required: true,
  },
});

export default moongose.model("Task", taskSchema);
