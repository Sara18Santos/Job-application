import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import connectDB from "../db";
/* import { initializeUserBoard } from "../init-user-board"; */

const mongooseInstance = await connectDB(); // Ensure this is called after your MongoDB connection is established
const client = mongooseInstance.connection.getClient();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
        create: {
            after: async ({ user }) => {
                // This will run after a user is created
                console.log("New user created:", user);
/*                if(user.id){
                    await initializeUserBoard(user.id);
                } */
            }
        }
    }
  }
});
