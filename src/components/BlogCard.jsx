import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, content, image, _id } = blog;
  return (
    <div className="w-96 h-[400px] bg-white border border-gray-200 rounded-lg shadow">
      <img
        className="rounded-t-lg h-3/5 w-full object-cover"
        src={image}
        alt="blogPost-image"
      />
      <div className="p-5">
        <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 truncate-title">
          {title}
        </h5>
        <p
          className="mb-3 font-normal text-gray-700 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Link
          to={`/details/${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
