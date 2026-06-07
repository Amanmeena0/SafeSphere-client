import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import apiClient from "@/lib/apiClient";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const [isSyncing, setIsSyncing] = useState(true);
  const syncAttempted = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && isSignedIn && userId && !syncAttempted.current) {
        syncAttempted.current = true;
        try {
          // Check if user exists in backend DB
          const checkRes = await apiClient.get("/api/profile/check");
          
          if (!checkRes.data.exists) {
            console.log("User not found in local DB. Syncing...");
            // Register user in backend DB
            await apiClient.post("/api/profile/register", {
              auth_id: userId,
              name: user.fullName || user.username || "SafeSphere User",
              email: user.primaryEmailAddress.emailAddress
            });
            console.log("User synced successfully.");
          }
        } catch (error) {
          console.error("Profile sync error:", error);
          // If 404, we also attempt registration
          if (error.response?.status === 404) {
            try {
               await apiClient.post("/api/profile/register", {
                auth_id: userId,
                name: user.fullName || user.username || "SafeSphere User",
                email: user.primaryEmailAddress.emailAddress
              });
            } catch (regError) {
              console.error("Auto-registration failed:", regError);
            }
          }
        } finally {
          setIsSyncing(false);
        }
      } else if (isLoaded && !isSignedIn) {
        setIsSyncing(false);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, userId, user]);

  if (!isLoaded || (isSignedIn && isSyncing)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
