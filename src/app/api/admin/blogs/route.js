import connectDb from "@/lib/dbConnect";
import Blog from "@/lib/blogsModel";
import { verifyToken } from "@/lib/auth/verifyToken";
import { NextResponse } from "next/server";


export async function GET() {
  await connectDb();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return Response.json(blogs);
}

export async function POST(req) {
    try {
      await connectDb();
      const user = await verifyToken(req);  // Add token verification
  
      if (user.role !== "admin") {
        return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
      }
  
      const data = await req.json();
      const blog = await Blog.create(data);
      return Response.json(blog);
    } catch (error) {
      return new Response(JSON.stringify({ error: "Unauthorized - Token invalid" }), { status: 401 });
    }
  }
  