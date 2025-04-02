import {
  addUser,
  UserProps,
} from "../database/queries/non-select queries/register-user";
import { GetUserInfo } from "../database/queries/select-queries/get-user-info";
import tryLogin from "../lib/scraping/try-login";

const registerUserHandler = async (userProps: UserProps) => {
  const { userId, password, username } = userProps;

  const userAlreadyPresent = !!(await GetUserInfo(userId));
  if (userAlreadyPresent) {
    throw new Error(
      `RollNo: ${userId} is already registered and the stats are being tracked.`
    );
  }

  console.log(`Validating user Credentials`);
  await tryLogin(userId, password);
  const result = await addUser({ userId, password, username });
  console.log(`User Registered, userId: ${result.userId}`);
  return result;
};

export default registerUserHandler;
