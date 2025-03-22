import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../schema";

const GetUserInfo = async (userId: string) => {
  const result = await db.select().from(users).where(eq(users.userId, userId));
  return result[0];
};

export { GetUserInfo };
