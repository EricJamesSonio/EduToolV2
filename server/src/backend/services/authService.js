import { teacherRepository } from "../repositories/teacherRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export const authService = {
  loginTeacher: async (email, password) => {
    const teacher = await teacherRepository.findByEmail(email);
    if (!teacher) throw new Error("Invalid credentials");

    const validPassword = await bcrypt.compare(password, teacher.password_hash);
    if (!validPassword) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: teacher.id, email: teacher.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return { teacher: { id: teacher.id, name: teacher.name, email: teacher.email }, token };
  },
};
