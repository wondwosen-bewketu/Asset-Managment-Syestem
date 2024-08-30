import { db } from "../config/database";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";

export class AuthService {
  async register(email: string, password: string): Promise<string> {
    const hashedpassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    const user = await db
      .insertInto("users")
      .values({ id, email, password: hashedpassword })
      .returning("id")
      .executeTakeFirst();

    if (!user) {
      throw new Error("Failed to create User");
    }

    return signToken(user.id);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid Credentials");
    }
    return signToken(user.id);
  }
}
