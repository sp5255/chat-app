import User from "../models/user.model.js";

/**
 * add try-catch to every service -> to handle the db operations
 * OR find if there is any global solution
 *  */
export const getUser = async ({
  email,
  isLogIn = false,
}: {
  email: string;
  isLogIn?: boolean;
}) => {
  if (isLogIn) return User.findOne({ email });
  return User.findOne({ email }).select("-password");
};

export const getUserById = async ({ id }: { id: string }) => {
  return User.findById({ _id: id }).select("-password");
};

export const addUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const newUser = new User({ name, email, password });
  await newUser.save();
};
