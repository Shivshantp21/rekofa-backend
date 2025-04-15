// src/app/api/admin/signup/route.js
import dbConnect from "@/lib/dbConnect";
import User from '@/lib/adminModel';
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, confirmPass } = await req.json();

    if (!name || !email || !password || !confirmPass) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password !== confirmPass) {
      return Response.json({ error: "Passwords do not match." }, { status: 400 });
    }

    // Strong password regex
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return Response.json(
        {
          error:
            "Password must be 8+ chars, with upper, lower, number, and special character.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists with this email." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({ message: "User registered successfully!", user: newUser }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
