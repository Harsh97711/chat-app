import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get messages
export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

// Send message
export const sendMessage = mutation({
  args: {
    text: v.string(),
    user: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      text: args.text,
      user: args.user,
      createdAt: Date.now(),
    });
  },
});