import { triggerFullInfoUpdateOnAll } from "../actions/trigger-full-info-update-on-all";
import { triggerFullInfoUpdateOnUser } from "../actions/trigger-full-info-update-on-user";
import { adminSecretKey } from "../constants";

interface triggerFullAttendanceUpdateAllProps {
  userId: string;
}

const triggerFullAttendanceUpdateOnUserHandler = async ({
  userId,
}: triggerFullAttendanceUpdateAllProps) => {
  const lowerCasedUserId = userId.toLowerCase();
  await triggerFullInfoUpdateOnUser({
    userId: lowerCasedUserId,
    triggerDate: new Date(),
  });
};

export { triggerFullAttendanceUpdateOnUserHandler };
