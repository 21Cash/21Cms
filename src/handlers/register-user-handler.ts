import { addUser, UserProps } from "../database/queries/register-user";

const registerUserHandler = async (userProps: UserProps) => {
  const result = await addUser(userProps);
  return result;
};

export default registerUserHandler;
