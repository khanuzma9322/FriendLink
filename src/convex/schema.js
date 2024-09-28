
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// const budgets = defineTable({
//     total: v.float64(),
//     remaining: v.float64(),

// });

const users = defineTable({

    friends: v.array(v.id("users")),
    
    budget: v.number(),

    events: v.array(v.id("events"))


    
});

const events = defineTable({
    
    startTime: v.number(),
    endTime: v.number(),
    
    cost: v.float64(),

    title: v.string(),
})

export default defineSchema({
    users,
    events,
});