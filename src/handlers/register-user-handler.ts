import { addUser, UserProps } from "../database/queries/register-user";
import tryLogin from "../lib/scraping/try-login";

const registerUserHandler = async (userProps: UserProps) => {
  console.log(`Validating user Credentials`);
  const { userId, password, username } = userProps;
  const loginSuccess = await tryLogin(userId, password);
  if (!loginSuccess) {
    throw new Error("Invalid Credentials at Handler");
  }
  const result = await addUser({ userId, password, username });
  console.log(`User Registered, userId: ${result.userId}`);
  return result;
};

export default registerUserHandler;
