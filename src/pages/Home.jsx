import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { fetchPosts } from "../api/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      const response = await fetchPosts();
      setBlogs(response.data.blogs);
    };

    getAllBlogs();
  }, []);

  return (
    <div className="mt-16 grid grid-cols-3 gap-12 p-8 bg-gray-100">
      {blogs.map((blog,index) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default Home;
