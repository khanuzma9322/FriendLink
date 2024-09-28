import { mutation, action, internalQuery, internalMutation } from "./_generated/server";
import {internal} from "./_generated/api";

import { v } from "convex/values";

export const addToBudget = action({

    args: { userId: v.id("users"), addition: v.number() },
    handler: async (ctx, args) => {
        console.log(typeof args.addition);
        const currBudget = await ctx.runQuery(internal.users.getBudget, {userId: args.userId});
        const newBudget = currBudget + args.addition;

        
        await ctx.runMutation(internal.users.updateBudget, {userId: args.userId, newBudget: newBudget});
    }

});

export const getBudget = internalQuery({

    args: {userId: v.id("users")},
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), args.userId)).unique();
        return user.budget;
    }
});

export const updateBudget = internalMutation({

    args: {userId: v.id("users"), newBudget: v.any()},
    handler: async (ctx, args) => {
        console.log(typeof args.newBudget);
        await ctx.db.patch(args.userId, {budget: args.newBudget});
        
    }
});