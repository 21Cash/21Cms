import { db } from "../../db";
import { users } from "../../schema";

const getAllUserIds = async () => {
  const userIds = await db
    .select({
      userId: users.userId,
    })
    .from(users)
    .orderBy(users.lastRefreshed);

  return userIds.map((item) => item.userId);
};

export { getAllUserIds };
