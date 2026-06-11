import { useUser } from "@/shared/hooks/useAuth";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Civilian Dashboard</h3>
        <p className="text-blue-700">
          Access your profile, file reports, and stay updated with community safety information.
        </p>
        <div className="mt-3 space-y-2">
          <div className="text-sm text-blue-600">
            • File FIR reports online
            • Access emergency contacts
            • View crime statistics in your area
          </div>
        </div>
      </div>
    </div>
  );
}
