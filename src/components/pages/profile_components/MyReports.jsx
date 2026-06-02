import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { 
  FileText, 
  Calendar, 
  Tag, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  ChevronRight
} from "lucide-react";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient.get("/api/profile/my-firs")
      .then(res => {
        console.log("My Reports API Response:", res.data);
        // Ensure data is an array
        const data = Array.isArray(res.data) ? res.data : [];
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch reports", err);
        setError("Failed to load your reports. Please try again later.");
        setReports([]); // Ensure it's still an array
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'investigating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'theft': return <Tag className="w-5 h-5" />;
      case 'cyber crime': return <Info className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-500 mt-1">Track the status of your submitted E-FIRs and complaints</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100 text-sm font-medium">
          Total Reports: {reports.length}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {reports.length === 0 && !error ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No reports found</h3>
          <p className="text-gray-500 mt-2">You haven't submitted any E-FIRs yet.</p>
          <button 
            onClick={() => window.location.href = '/FirRegister'}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            File a New Report
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <div 
              key={report.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${report.fir_type === 'theft' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'}`}>
                    {getIcon(report.fir_type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors capitalize">
                      {report.fir_type} E-FIR
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {new Date(report.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        ID: SS-{report.id.toString().padStart(5, '0')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                    {report.status || 'Pending'}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
