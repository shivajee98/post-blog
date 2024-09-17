import React, { useState, useEffect } from 'react';
import api from '../api'; // Assuming you have the api utility
import { useParams } from 'react-router-dom';

const EditProfile = () => {
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [avatar, setAvatar] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await api(`http://localhost:8000/api/profile/${userId}`);
        setUsername(userProfile.username);
        setFullName(userProfile.fullName);
        setWebsite(userProfile.website);
        setTwitter(userProfile.twitter);
        setGithub(userProfile.github);
        setLinkedin(userProfile.linkedin);
        setAvatar(userProfile.avatar);
        setCoverImage(userProfile.coverImage);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const profileData = {
        username,
        fullName,
        website,
        twitter,
        github,
        linkedin,
        avatar,
        coverImage
      };

      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);
        const { data } = await api('http://localhost:8000/api/upload', {
          method: 'POST',
          body: formData
        });
        profileData.avatar = data.imageUrl;
      }

      if (coverImageFile) {
        const formData = new FormData();
        formData.append('file', coverImageFile);
        const { data } = await api('http://localhost:8000/api/upload', {
          method: 'POST',
          body: formData
        });
        profileData.coverImage = data.imageUrl;
      }

      const updatedUser = await api(`http://localhost:8000/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      console.log('Profile updated successfully', updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-800 text-white">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setCoverImageFile)}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
          />
          {coverImage && (
            <div className="mt-2">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Avatar</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setAvatarFile)}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
          />
          {avatar && (
            <div className="mt-2">
              <img
                src={avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-purple-600 object-cover"
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter your website URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter your Twitter profile URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="github">GitHub</label>
          <input
            type="text"
            id="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter your GitHub profile URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="linkedin">LinkedIn</label>
          <input
            type="text"
            id="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter your LinkedIn profile URL"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
