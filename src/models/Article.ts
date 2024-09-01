import mongoose, { model, Schema } from "mongoose";

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    employeeDescription: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    clientDescription: { type: String, required: true },

    isVerified: { type: Boolean, required: true, default: false },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    viewsCounter: { type: Number, default: 0 },
  },

  { timestamps: true }
);

const Article = model("Article", articleSchema);
export default Article;
