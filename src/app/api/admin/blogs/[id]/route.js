import dbConnect from "@/lib/dbConnect";
import Blog from "@/lib/blogsModel";
import { verifyToken } from "@/lib/auth/verifyToken";

// 🟢 GET: Publicly accessible (No changes needed here)
export async function GET(_, { params }) {
  await dbConnect();
  const blog = await Blog.findById(params.id);
  return Response.json(blog);
}

// 🛡️ PUT: Protected - Admin Only
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const user = await verifyToken(req);

    // Check if the user is an admin
    if (user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
      });
    }

    const data = await req.json();
    const updated = await Blog.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updated) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    return Response.json(updated);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// 🛡️ DELETE: Protected - Admin Only
export async function DELETE(req, { params }) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    const isValid = await verifyToken(token);
    if (!isValid) {
      return new Response("Unauthorized", { status: 401 });
    }
    
    await dbConnect();
    const user = await verifyToken(req);

    // Check if the user is an admin
    if (user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
      });
    }

    // Delete the blog
    const deleted = await Blog.findByIdAndDelete(params.id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
