import connectDb from "@/lib/dbConnect";
import Admin from "@/lib/adminModel";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth/generateToken";

export async function POST(req) {
  try {
    await connectDb();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "All fields required" }), { status: 400 });
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Wrong password" }), { status: 401 });
    }

    const token = generateToken(user);

    return new Response(JSON.stringify({ message: "Login successful", token }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error", details: error.message }), {
      status: 500,
    });
  }
}
