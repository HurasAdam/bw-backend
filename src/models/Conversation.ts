import mongoose, { model, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    topicId: { type: Schema.Types.ObjectId, ref: "ConversationTopic", required: true },
    note: { type: String},
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  

  },

  { timestamps: true }
);

const Conversation = model("Conversation", conversationSchema);
export default Conversation;
