import { triggerFullInfoUpdateOnAll } from "../actions/trigger-full-info-update-on-all";
import { adminSecretKey } from "../constants";

interface triggerFullAttendanceUpdateAllProps {
  secretKey: string;
}

const triggerFullAttendanceUpdateAllHandler = async ({
  secretKey,
}: triggerFullAttendanceUpdateAllProps) => {
  if (!adminSecretKey) {
    throw new Error("No Admin Secret Key Defined in .env file");
  }

  if (secretKey !== adminSecretKey) {
    throw new Error("UnAuthorized, Secret key is incorrect.");
  }

  triggerFullInfoUpdateOnAll();
};

export { triggerFullAttendanceUpdateAllHandler };
