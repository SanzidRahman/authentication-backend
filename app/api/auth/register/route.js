import ConnectionDB from "@/lib/dbConfig";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zSchema";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await ConnectionDB();
    const velidateSchema = zSchema.pick({
      name: true,
      password: true,
      email: true,
    });

    const payload = await req.json();
    const validatedData = velidateSchema.safeParse(payload);
    const { name, email, password } = validatedData.data;

    if (!validatedData.success) {
      return NextResponse.json({
        message: "Invalid data",
        status: 400,
      });
    }

    const existingUser = await User.exists({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        status: 400,
        existingUser,
      });
    }
    const user = new User({ name, email, password });
    await user.save();

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ userId: user._id })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    await sendMail(
      "Welcome to Our Platform",
      `Hello ${name},\n\nThank you for registering on our platform! We're excited to have you on board.\n\nBest regards,\nThe Team`,
      email,
      emailVerificationLink(token)
    );

    return NextResponse.json({
      message: "User registered successfully",
      status: 200,
      user: { name: user.name, email: user.email, id: user._id },
    });
  } catch (error) {
    return NextResponse.json({
      message: "User registered Failed",
      status: 400,
    });
  }
};
