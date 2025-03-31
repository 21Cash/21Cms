import { eq } from "drizzle-orm";
import { db } from "../database/db";
import { users } from "../database/schema";
import registerUserHandler from "./register-user-handler";

export const getUserDataHandler = async (userId: string) => {
  const data = await db
    .select({
      userId: users.userId,
      username: users.username,
      lastRefreshed: users.lastRefreshed,
    })
    .from(users)
    .where(eq(users.userId, userId));
  if (data.length === 0) return null;

  return data[0];
};
