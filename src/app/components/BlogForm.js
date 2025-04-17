"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const BlogForm = ({ id }) => {
  const [formData, setFormData] = useState({
    title: "",
    para: "",
    link: "",
    img: "",
    date: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => setFormData(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/admin/blogs/${id}` : `/api/admin/blogs`;
    try{
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          toast.success(
            id ? "Blog updated successfully!" : "Blog created successfully!"
          );
          setFormData({
            title: "",
            para: "",
            link: "",
            img: "",
            date: "",
          });
      
          router.push("/admin/blogs");
    }catch(err){
        console.error(err);
        toast.error("Failed to save blog. Please try again.");
    }
  };

  return (
    <div className=" bg-white text-black h-screen overflow-hidden">
      <Link
        href={"/admin/blogs/"}
        className=" ml-4 absolute top-4 left-4 bg-green-700 text-white p-4"
      >
        Back to Blogs
      </Link>
      <div className="p-6 max-w-xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="Logo"
            className="place-center mb-6"
          />
          <h1 className="text-3xl font-bold">
            {id ? "Edit Blog" : "Create Blog"}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["title", "para", "link", "img", "date"].map((field) => (
            <label
              key={field}
              className="block text-sm font-medium text-gray-700"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
              <input
                key={field}
                type="text"
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </label>
          ))}
          <div className="flex flex-col justify-center items-center w-full mt-5">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-200"
            >
              {id ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
