import React, { useEffect, useState } from "react";
import { fetchPostsByUser } from "../api/api";
import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";

const AllPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const userID = useSelector((state) => state.auth.user.id);
  console.log(userID);

  useEffect(() => {
    const getAllBlogs = async () => {
      const response = await fetchPostsByUser(userID);
      setBlogs(response.data.blogsresponse.data.blogs.slice().reverse());
    };

    getAllBlogs();
  }, []);

  console.log(blogs);
  return (
    <div className="mt-16 grid grid-cols-3 gap-12 p-8 bg-gray-100">
      {blogs.map((blog, index) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default AllPosts;
