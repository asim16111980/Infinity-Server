// token.model.js
import mongoose from "mongoose";
import { TOKEN_TYPES } from "../constants/tokenType";

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: String,
  type: {
    type: String,
    enum: Object.values(TOKEN_TYPES),
    required: true,
  },
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now },
  used: { type: Boolean, default: false },
  meta: {
    ip: String,
    userAgent: String,
    device: String,
  },
});

tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

tokenSchema.pre("save", async function () {
    const existing = await mongoose.models.Token.findOne({
      userId: this.userId,
      type: "reset",
      used: false,
    });
  
    if (existing) {
      throw new Error("Reset token already exists for this user");
    }
  });
  

export default mongoose.model("Token", tokenSchema);
