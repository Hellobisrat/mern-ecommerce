import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import Loader from "../components/Loader";

export default function Profile() {
  const { user, fetchProfile, loading } = useUserStore();

  useEffect(() => {
    if (!user) fetchProfile();
  }, [user, fetchProfile]);

  if (loading && !user) return <Loader />;

  if (!user) return <p>Unable to load profile.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        {user.isAdmin && (
          <p className="mt-2 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Admin
          </p>
        )}
      </div>
    </div>
  );
}