import { zSchema } from "@/lib/zSchema";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const validationSchema = zSchema.pick({
      email: true,
      password: true,
    });
    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);
    return NextResponse.json({ message: "Login successful", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Login Failed", status: 400 });
  }
};
