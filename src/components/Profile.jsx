import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import api from '../api'; // Your API utility

const Profile = () => {
  const { userId } = useParams(); // Extract userId from URL parameters
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('User ID is missing');
        setLoading(false);
        return;
      }

      try {
        const userData = await api(`http://localhost:8000/api/profile/${userId}`);
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Add userId as a dependency to re-run the effect when userId changes

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (!user) return null; // Handle case where no user data is returned

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 min-h-screen text-white">
      <div className="max-w-2xl w-full bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-purple-600 object-cover"
          />
          
          <div>
            <h1 className="text-3xl font-semibold">{user.username}</h1>
            <p className="text-lg text-gray-400">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          {user.website && (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">Website:</span>
              <a href={user.website} className="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </div>
          )}
          {user.twitter && (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">Twitter:</span>
              <a href={user.twitter} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                {user.twitter}
              </a>
            </div>
          )}
          {user.github && (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">GitHub:</span>
              <a href={user.github} className="text-gray-400 hover:underline" target="_blank" rel="noopener noreferrer">
                {user.github}
              </a>
            </div>
          )}
          {user.linkedin && (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">LinkedIn:</span>
              <a href={user.linkedin} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                {user.linkedin}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
