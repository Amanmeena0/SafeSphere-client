import { useState } from "react";
import { useSubmitFir } from "../hooks/useSubmitFir";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function RapeCaseForm() {
  const [formData, setFormData] = useState<any>({});
  const { loading, status, submitRapeCase } = useSubmitFir();

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
      let base64Evidence = "";
      if (formData.evidence) {
        try {
          base64Evidence = await fileToBase64(formData.evidence);
        } catch (err) {
          console.error("File conversion error:", err);
        }
      }

      const submissionData = {
        victim_name: formData.victimName || "",
        age: formData.victimAge ? parseInt(formData.victimAge) : undefined,
        gender: formData.victimGender || "",
        incidentDetails: formData.incidentDescription || "",
        perpetratorDetails: formData.perpetratorInfo || "",
        location_of_incident: formData.location || "",
        date_of_incident: formData.date || "",
        time_of_incident: formData.time || "",
        informant_details: formData.informantInfo || "",
        police_station: formData.policeStation || "",
        upload_document: base64Evidence,
      };

      const success = await submitRapeCase(submissionData);

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
          <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">Sensitive Case Report</h2>
              <p className="text-red-100 mt-2 font-medium opacity-90">Confidential and Secure Handling</p>
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
              {/* Victim Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-red-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-4 text-red-600 dark:text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Victim Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Victim Name</label>
                    <input
                      type="text"
                      name="victimName"
                      value={formData.victimName || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Full name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Age</label>
                    <input
                      type="number"
                      name="victimAge"
                      value={formData.victimAge || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Age"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Gender</label>
                    <select
                      name="victimGender"
                      value={formData.victimGender || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Incident Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-orange-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mr-4 text-orange-600 dark:text-orange-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Incident Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Incident Description</label>
                    <textarea
                      name="incidentDescription"
                      value={formData.incidentDescription || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white resize-none"
                      rows={5}
                      placeholder="Please provide a detailed but comfortable description of the incident."
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Perpetrator Information (if known)</label>
                    <input
                      type="text"
                      name="perpetratorInfo"
                      value={formData.perpetratorInfo || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Name, physical description, relationship, or any identifying information"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Location of Incident</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Specific location where the incident occurred"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4 text-blue-600 dark:text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  When did it happen?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Date of Incident</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Time of Incident (approximate)</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Evidence & Support Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-purple-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-4 text-purple-600 dark:text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </div>
                  Evidence & Documentation (Optional)
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Upload Evidence</label>
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${formData.evidence ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10' : 'border-slate-300 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 bg-white dark:bg-slate-800'}`}>
                    {formData.evidence ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-10 h-10 text-purple-600 mb-2" />
                        <span className="text-slate-900 dark:text-white font-bold text-lg mb-1">{formData.evidence.name}</span>
                        <button 
                          type="button"
                          onClick={() => setFormData((prev: any) => ({ ...prev, evidence: null }))}
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
                          name="evidence"
                          className="hidden"
                          id="evidence-upload"
                          onChange={handleChange}
                          accept="image/*,application/pdf"
                        />
                        <label htmlFor="evidence-upload" className="cursor-pointer">
                          <span className="text-purple-600 dark:text-purple-400 font-bold text-lg hover:underline">Upload files if available</span>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">Images, documents - handled with strict confidentiality</p>
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact & Informant Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-green-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4 text-green-600 dark:text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 00-2-2v1m5 0H9m0 0v4h6V4z" />
                    </svg>
                  </div>
                  Contact Information
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Informant Details (if different from victim)</label>
                  <textarea
                    name="informantInfo"
                    value={formData.informantInfo || ""}
                    placeholder="If someone else is filing this report, please provide: Name, relationship to victim, contact information"
                    className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white resize-none"
                    rows={3}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Police Station & Security Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-indigo-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mr-4 text-indigo-600 dark:text-indigo-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Police Station & Verification
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Police Station</label>
                    <input
                      type="text"
                      name="policeStation"
                      value={formData.policeStation || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Enter the police station name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Security Verification</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full sm:w-auto bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-mono text-xl tracking-[0.3em] font-bold text-center">
                        SECURE77
                      </div>
                      <input
                        type="text"
                        name="captcha"
                        value={formData.captcha || ""}
                        placeholder="Enter the verification code"
                        className="flex-1 w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 dark:text-white font-mono"
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
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-extrabold py-5 px-8 rounded-2xl shadow-xl shadow-red-600/20 hover:shadow-2xl hover:shadow-red-600/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                  <span className="text-lg">{loading ? "Processing..." : "Submit Confidential Report"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
