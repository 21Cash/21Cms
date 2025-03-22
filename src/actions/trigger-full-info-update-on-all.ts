import { getAllUserIds } from "../database/queries/select-queries/get-all-user-ids";
import { triggerFullInfoUpdateOnUser } from "./trigger-full-info-update-on-user";

const triggerFullInfoUpdateOnAll = async () => {
  const userIds = await getAllUserIds();
  const triggeredDate = new Date();
  console.log(
    `Full Attendance Triggered at time: ${triggeredDate.toISOString()}`
  );
  for (const userId of userIds) {
    try {
      await triggerFullInfoUpdateOnUser({ userId, triggerDate: triggeredDate });
    } catch (err) {
      if (err instanceof Error) {
        console.error(
          `Error occured while updating full attendance stats for userId: ${userId} errorMsg:${err.message}`
        );
      } else {
        console.error("Unknown error:", err);
      }
    }
  }

  const completeDate = new Date();
  console.log(
    `Full Attendace update completed at ${completeDate.toISOString()}`
  );
};

export { triggerFullInfoUpdateOnAll };
