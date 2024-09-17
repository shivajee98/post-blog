import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // Import the API wrapper

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await api(`http://localhost:8000/api/articles/${id}`);
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-blue-200">
      <h1 className="text-3xl content-center font-bold mb-4">{blog.title}</h1>
      <div
        className="text-lg"
        dangerouslySetInnerHTML={{ __html: blog.paragraph }}
      />
    </div>
  );
};

export default BlogDetail;
