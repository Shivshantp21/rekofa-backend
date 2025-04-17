import BlogForm from "@/app/components/BlogForm";

export default function EditBlog({ params }) {
  return <BlogForm id={params.id} />;
}
