import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import api from '../api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const defaultImage = 'https://img.freepik.com/free-vector/blog-articles-abstract-concept-illustration_335657-4934.jpg?w=826&t=st=1725181824~exp=1725182424~hmac=31d32441c825ea96bc3d2d3620aa7fd7ba02c0a76c76f1a6c2e0aa4064c64be9';

  useEffect(() => {


    // Fetch blogs from the backend
    const fetchBlogs = async () => {
      try {
        const data = await api('http://localhost:8000/api/articles');
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
}, []);

  // Function to extract the first image URL from HTML content
  const extractImage = (html) => {
    const regex = /<img[^>]+src="([^">]+)"/;
    const match = html.match(regex);
    return match ? match[1] : defaultImage;
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[350px] flex flex-col">
            <div className="p-6 flex-1">
              <h2 className="text-xl font-bold mb-2 text-gray-900 truncate">{blog.title}</h2>
              <div
                className="text-base text-gray-700 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: blog.paragraph.slice(0, 100) + '...' }} // Display truncated content
              />
            </div>
            <div className="relative h-48 overflow-hidden">
              <img
                src={extractImage(blog.paragraph)}
                alt={blog.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="bg-gray-100 p-4 text-center">
              <Link to={`/blogs/${blog._id}`} className="text-blue-500 hover:underline">
                Read more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
