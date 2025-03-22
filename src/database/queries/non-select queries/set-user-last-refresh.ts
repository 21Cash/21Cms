import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../schema";

interface SetUserLastRefreshProps {
  userId: string;
  refreshedDate: Date;
}

export const setUserLastRefresh = async ({
  userId,
  refreshedDate,
}: SetUserLastRefreshProps): Promise<void> => {
  await db
    .update(users)
    .set({
      lastRefreshed: refreshedDate,
    })
    .where(eq(users.userId, userId));
};
export { SetUserLastRefreshProps };
