import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";
import { createPost } from "../api/api";
import { useNavigate } from "react-router-dom";

const BlogPreview = () => {
  const navigate = useNavigate();
  const blog = useSelector((state) => state.blog.blog);
  const { title, image, content, createdAt, likes } = blog;
  const date = moment(createdAt).format("DD MMM, YYYY");

  const handlePublish = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("createdAt", createdAt);

    // Check if image is a Blob URL (e.g., created via URL.createObjectURL)
    if (image.startsWith("blob:")) {
      try {
        const blob = await fetch(image).then((res) => res.blob());
        formData.append("image", blob, "blog-image.png"); // Append Blob with a file name
      } catch (error) {
        console.error("Error fetching the Blob:", error);
        return;
      }
    } else if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const { id } = await createPost(formData);
      navigate(`/details/${id}`);
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  const handleEditBlog = () => {};

  return (
    <div className="mt-16 p-8 h-full bg-gray-100">
      <h1 className="text-2xl font-semibold ">
        Review you blog before publishing
      </h1>
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handlePublish}
          className="bg-black text-white px-8 py-4 font-bold rounded-md mt-16 hover:bg-black/80"
        >
          Publish Blog
        </button>
        <button className="bg-black text-white px-8 py-4 font-bold rounded-md mt-16 hover:bg-black/80">
          Make Changes
        </button>
      </div>
      <div className="mt-16 p-8 h-full bg-white">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h3 className="text-sm font-medium text-blue-600 mb-8">{date}</h3>
        <img
          src={image}
          className="w-full h-1/2 rounded-md object-cover mb-8"
          alt=""
        />
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default BlogPreview;
