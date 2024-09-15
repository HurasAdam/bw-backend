import mongoose, { model, Schema } from "mongoose";

const conversationTopicSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },

  { timestamps: true }
);

const ConversationTopic = model("ConversationTopic", conversationTopicSchema);
export default ConversationTopic;
