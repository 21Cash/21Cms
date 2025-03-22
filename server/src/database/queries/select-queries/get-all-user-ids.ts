import { db } from "../../db";
import { users } from "../../schema";

const getAllUserIds = async () => {
  const userIds = await db
    .select({
      userId: users.userId,
    })
    .from(users);
  const userIdsList = userIds.map((item) => {
    return item.userId;
  });

  return userIdsList;
};

export { getAllUserIds };
