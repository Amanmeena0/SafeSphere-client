import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Shield, Calendar, Phone, Home, Contact, Trash2 } from "lucide-react";
import backend from "../../../config/";

export default function ProfileInterface() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const clerkUserId = user?.id;

  useEffect(() => {
    if (clerkUserId) {
      axios.get(`${backend.apiUrl}/api/profile/${clerkUserId}`)
        .then(res => setProfile(res.data))
        .catch(err => {
          console.error("Failed to fetch profile", err);
          alert("Failed to load profile data");
        });
    }
  }, [clerkUserId]);

  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);

    try {
      // Step 1: Delete user data from your backend
      await axios.delete(`${backend.apiUrl}/api/profile/${clerkUserId}`);

      // Step 2: Delete user from Clerk
      await user.delete();

      // Step 3: Redirect to homepage
      navigate('/');
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
      setIsDeleting(false);
    }
  };
  
  
  if (!user || !profile) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-600 text-center">Loading profile...</p>
      </div>
    );
  }

  const {
    name,
    email,
    phone,
    address,
    aadhar_number,
    role,
    date_of_birth,
    emergency_contact_name,
    emergency_contact_phone,
    registration_date,
    status
  } = profile;

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
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
          role === 'police' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {email}</div>
        <div className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {phone}</div>
        <div className="flex items-center"><Home className="w-4 h-4 mr-2" /> {address}</div>
        <div className="flex items-center"><Shield className="w-4 h-4 mr-2" /> Aadhar: **** **** {aadhar_number.slice(-4)}</div>
        <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> DOB: {new Date(date_of_birth).toLocaleDateString()}</div>
        <div className="flex items-center"><Contact className="w-4 h-4 mr-2" /> Emergency: {emergency_contact_name} ({emergency_contact_phone})</div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-500">Status</p>
          <p className="text-sm font-medium text-green-600 capitalize">{status}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Registered</p>
          <p className="text-sm font-medium text-gray-700">{new Date(registration_date).toLocaleDateString()}</p>
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
