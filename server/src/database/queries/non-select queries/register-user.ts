import { db } from "../../db";
import { User } from "../../db-types";
import { users } from "../../schema";

interface UserProps {
  userId: string;
  username: string | null;
  password: string;
}

const addUser = async ({
  userId,
  username,
  password,
}: UserProps): Promise<{ userId: string; username: string }> => {
  const user = {
    userId,
    username,
    password,
  };

  const result = await db
    .insert(users)
    .values({ ...user, lastRefreshed: new Date() })
    .onConflictDoNothing()
    .returning({
      userId: users.userId,
      username: users.username,
    });

  if (result.length === 0) {
    throw new Error(`User with id ${userId} already exists`);
  }

  return result[0];
};

export { UserProps, addUser };
