import bcrypt from 'bcryptjs';
import prisma from '../config/db'; 

export const registerUser = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  console.log(existingUser)
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  console.log(user)
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  console.log(user)
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch)
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};