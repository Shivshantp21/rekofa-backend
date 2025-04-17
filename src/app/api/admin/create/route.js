import Admin from "@/lib/adminModel"; // your admin schema
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { name, email, password, secretKey } = body;

  // Validate the required fields
  if (!name || !email || !password || !secretKey) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  console.log("Secret Key in Request:", secretKey);
  console.log("Expected Secret Key:", process.env.ADMIN_SECRET_KEY);

  // Only allow if secretKey matches
  if (secretKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Check if the admin already exists
  const existing = await Admin.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { message: "Admin already exists" },
      { status: 400 }
    );
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new admin to the database
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { message: "Failed to create admin", error: error.message },
      { status: 500 }
    );
  }
}
