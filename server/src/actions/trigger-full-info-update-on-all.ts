import { getAllUserIds } from "../database/queries/select-queries/get-all-user-ids";
import { triggerFullInfoUpdateOnUser } from "./trigger-full-info-update-on-user";

let infoUpdateInProgress = false;

// TODO: If a attendance update fails on user, then write failed date, time, and userId to database
const triggerFullInfoUpdateOnAll = async () => {
  if (infoUpdateInProgress) {
    console.error(
      `Cannot Start another full update while its already in progress.`
    );
    return;
  }

  try {
    const userIds = await getAllUserIds();
    const triggeredDate = new Date();
    console.log(
      `Full Attendance Triggered at time: ${triggeredDate.toISOString()}`
    );

    const totalUsers = userIds.length;
    let failedUpdateCount = 0;

    // Update Infos

    // Set Update Lock to true
    infoUpdateInProgress = true;

    for (const userId of userIds) {
      try {
        await triggerFullInfoUpdateOnUser({
          userId,
          triggerDate: triggeredDate,
        });
      } catch (err) {
        failedUpdateCount++;
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

    const timeTakenInMillis = completeDate.getTime() - triggeredDate.getTime();
    const timeTakenInSeconds = Math.floor(timeTakenInMillis / 1000);
    const avgTimePerUserInMillisPerUser = parseFloat(
      (timeTakenInMillis / totalUsers).toFixed(2)
    );
    const avgTimePerUserInSeconds = parseFloat(
      (avgTimePerUserInMillisPerUser / 1000).toFixed(2)
    );
    console.log(
      `Full Attendace update completed at ${completeDate.toISOString()}, totalUsers: ${totalUsers}, userUpdateFailedCount: ${failedUpdateCount}, avgTimePerUser: ${avgTimePerUserInSeconds} secs, totalTimeTaken: ${timeTakenInSeconds} secs.`
    );
  } catch (err) {
    console.error(`Unexpected Error occured while full info update on all`);
    infoUpdateInProgress = false;
  } finally {
    // Set Update Lock to false
    infoUpdateInProgress = false;
  }
};

export { triggerFullInfoUpdateOnAll };
