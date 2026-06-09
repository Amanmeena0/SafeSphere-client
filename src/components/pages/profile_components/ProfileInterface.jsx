import { useUser } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/lib/apiClient";
import { User, Mail, Shield, Calendar, Phone, Home, Contact, Trash2 } from "lucide-react";

export default function ProfileInterface() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isUserLoaded && user) {
      apiClient.get('/api/profile/me')
        .then(res => {
          setProfile(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch profile", err);
          if (err.response?.status === 404) {
            // User might be authenticated but profile not created yet
            navigate('/create-profile');
          } else {
            alert("Failed to load profile data");
          }
          setLoading(false);
        });
    }
  }, [isUserLoaded, user, navigate]);

  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);

    try {
      await apiClient.delete('/api/profile/me');
      navigate('/');
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
      setIsDeleting(false);
    }
  };

  if (!isUserLoaded || loading) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-600 text-center">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-600 text-center">Profile not found.</p>
        <button 
          onClick={() => navigate('/create-profile')}
          className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Create Profile
        </button>
      </div>
    );
  }


  const {
    name,
    first_name,
    last_name,
    email,
    registration_date,
    status
  } = profile;

  const displayName = first_name ? `${first_name} ${last_name || ''}`.trim() : name;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-gray-500" />
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{displayName}</h2>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 bg-green-100 text-green-800">
          Citizen
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {email}</div>
        <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> Member Since: {new Date(registration_date).toLocaleDateString()}</div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-500">Account Status</p>
          <p className="text-sm font-medium text-green-600 capitalize">{status || 'Active'}</p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-800 mb-2">Danger Zone</h3>
          <p className="text-xs text-red-600 mb-3">Once deleted, your account cannot be recovered. Please proceed with caution.</p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center px-3 py-2 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded-md hover:bg-red-200"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete Account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-medium text-red-800">Are you sure you want to delete your account?</p>
              <div className="flex space-x-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex items-center px-3 py-2 text-xs font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
