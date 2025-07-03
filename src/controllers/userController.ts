import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jaschamp123@!231@%$@123";

//this is create user api 
export const createUser = async (req: FastifyRequest, reply: FastifyReply) => {
  // POST create user
  try {
    const { name, email } = req.body as { 
      name: string; email: string 
    };
    const user = await User.create({ name, email });
    // generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      //{ expiresIn: "1h" } //expire in 1 hr
    );

    reply.code(201).send({
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    reply.code(500).send({ error: "Failed to create user" });
  }
};

// this is get all user api
export const getAllUser = async (_req: FastifyRequest, reply: FastifyReply) => {
  // GET all users
  try {
    const authHeader = _req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return reply.code(401).send({ error: "Unauthorized: No token found" });
    }

    const token = authHeader.split(" ")[1]; //-- split token from bearer
    try {
      //if token is available now verifiy the token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("verified token:", decoded);
    } catch (error) {
      return reply.code(401).send({ error: "invalid or token expired" });
    }

    //after token verified
    const users = await User.find();
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ error: "Failed to get users" });
  }
};
