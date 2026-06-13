import { useState } from "react";
import { useSubmitFir } from "../hooks/useSubmitFir";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

export default function MVTheftFIRForm() {
  const [formData, setFormData] = useState<any>({});
  const { loading, status, submitMvTheft } = useSubmitFir();

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let base64Docs = "";
      if (formData.vehicleDocs) {
        try {
          base64Docs = await fileToBase64(formData.vehicleDocs);
        } catch (err) {
          console.error("File conversion error:", err);
        }
      }

      const submissionData = {
        vehicleDetails: formData.vehicleDetails || "",
        owner_details: formData.ownerDetails || "",
        date_of_theft: formData.dateOfTheft || "",
        timeoftheft: formData.timeOfTheft || "",
        location_of_theft: formData.locationOfTheft || "",
        previous_fir_details: formData.firDetails || "",
        police_station: formData.policeStation || "",
        upload_document: base64Docs,
      };

      const success = await submitMvTheft(submissionData);

      if (success) {
        setFormData({});
        e.target.reset();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#0B1F3A]/40 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-xl">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">Vehicle Theft E-FIR</h2>
              <p className="text-orange-100 mt-2 font-medium opacity-90">Secure reporting for stolen or missing vehicles</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:p-12">
            {status.type === "success" && (
              <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-2xl flex items-center space-x-4 text-green-700 dark:text-green-400">
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                </div>
                <p className="font-semibold">{status.message}</p>
              </div>
            )}
            {status.type === "error" && (
              <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-2xl flex items-center space-x-4 text-red-700 dark:text-red-400">
                <div className="bg-red-100 dark:bg-red-800/50 p-2 rounded-full">
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                </div>
                <p className="font-semibold">{status.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Vehicle Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-orange-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mr-4 text-orange-600 dark:text-orange-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  Vehicle Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Vehicle Details *</label>
                    <input
                      type="text"
                      name="vehicleDetails"
                      value={formData.vehicleDetails || ""}
                      placeholder="Registration Number, Type, Make, Model, Color"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Owner Details *</label>
                    <input
                      type="text"
                      name="ownerDetails"
                      value={formData.ownerDetails || ""}
                      placeholder="Owner Name, Contact Number, Full Address"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Incident Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-red-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-4 text-red-600 dark:text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Incident Details
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Date of Theft *</label>
                      <input
                        type="date"
                        name="dateOfTheft"
                        value={formData.dateOfTheft || ""}
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Time of Theft *</label>
                      <input
                        type="time"
                        name="timeOfTheft"
                        value={formData.timeOfTheft || ""}
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Location of Theft *</label>
                    <input
                      type="text"
                      name="locationOfTheft"
                      value={formData.locationOfTheft || ""}
                      placeholder="Exact location where the vehicle was stolen"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Documentation Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-purple-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-4 text-purple-600 dark:text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </div>
                  Documentation
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Upload Vehicle Papers/Photos</label>
                    <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${formData.vehicleDocs ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10' : 'border-slate-300 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 bg-white dark:bg-slate-800'}`}>
                      {formData.vehicleDocs ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8 text-purple-600" />
                          </div>
                          <span className="text-slate-900 dark:text-white font-bold text-lg mb-1">{formData.vehicleDocs.name}</span>
                          <button 
                            type="button"
                            onClick={() => setFormData((prev: any) => ({ ...prev, vehicleDocs: null }))}
                            className="mt-2 text-sm text-red-600 hover:text-red-700 font-bold px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 transition-colors"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <input
                            type="file"
                            name="vehicleDocs"
                            accept="image/*,application/pdf"
                            className="hidden"
                            id="vehicle-docs-upload"
                            onChange={handleChange}
                          />
                          <label htmlFor="vehicle-docs-upload" className="cursor-pointer">
                            <span className="text-purple-600 dark:text-purple-400 font-bold text-lg hover:underline">Click to upload files</span>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">RC, Insurance, Photos - Max 10MB</p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Previous FIR Details (if any)</label>
                    <textarea
                      name="firDetails"
                      value={formData.firDetails || ""}
                      placeholder="FIR Number, Date, Police Station"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white resize-none"
                      rows={3}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Reporting Unit Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-green-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4 text-green-600 dark:text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Reporting Unit
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Police Station & District *</label>
                    <input
                      type="text"
                      name="policeStation"
                      value={formData.policeStation || ""}
                      placeholder="Nearest Police Station Name, District"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Security Verification *</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full sm:w-auto bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-mono text-xl tracking-[0.3em] font-bold text-center">
                        VEHICLE77
                      </div>
                      <input
                        type="text"
                        name="captcha"
                        value={formData.captcha || ""}
                        placeholder="Enter code"
                        className="flex-1 w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white font-mono"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold py-5 px-8 rounded-2xl shadow-xl shadow-orange-600/20 hover:shadow-2xl hover:shadow-orange-600/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-7 h-7" />
                  )}
                  <span className="text-lg">{loading ? "Processing..." : "Submit Vehicle Report"}</span>
                </button>
                <div className="flex items-center justify-center mt-6 text-slate-500 dark:text-slate-400 space-x-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <p className="text-sm font-medium">Your data is encrypted and securely processed</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
