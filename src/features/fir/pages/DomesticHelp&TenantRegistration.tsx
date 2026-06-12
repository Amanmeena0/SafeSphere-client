import { useState } from "react";
import { useSubmitFir } from "../hooks/useSubmitFir";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function DomesticTenantForm() {
  const [formData, setFormData] = useState<any>({});
  const { loading, status, submitDomesticHelp } = useSubmitFir();

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
      let base64IdProof = "";
      if (formData.idProof) {
        try {
          base64IdProof = await fileToBase64(formData.idProof);
        } catch (err) {
          console.error("File conversion error:", err);
        }
      }

      const submissionData = {
        registeration_type: formData.applicantType || "",
        reporter_details: formData.fullName || "",
        reporter_age: formData.age ? parseInt(formData.age) : undefined,
        reporter_gender: formData.gender || "",
        reporter_contact: formData.contactNumber || "",
        reporter_Emailaddress: formData.email || "",
        reporter_native_place: formData.nativePlace || "",
        employer_name: formData.employerName || "",
        employer_contact: formData.employerContact || "",
        employer_relations: formData.relationship || "",
        employer_address: formData.employerAddress || "",
        duration_of_stay: formData.duration || "",
        documentation: base64IdProof,
        police_station: formData.policeStation || "",
      };

      const success = await submitDomesticHelp(submissionData);

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
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0c0 .55.45 1 1 1h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0c0 .55.45 1 1 1h18" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">Registration Form</h2>
              <p className="text-green-100 mt-2 font-medium opacity-90">Domestic Help / Tenant Verification</p>
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
              {/* Applicant Type Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-green-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4 text-green-600 dark:text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Registration Type
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Applicant Type *</label>
                  <select
                    name="applicantType"
                    value={formData.applicantType || ""}
                    className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Registration Type</option>
                    <option>Tenant</option>
                    <option>Domestic Help</option>
                  </select>
                </div>
              </div>

              {/* Personal Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4 text-blue-600 dark:text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Personal Information
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ""}
                        placeholder="Enter your full name"
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age || ""}
                        placeholder="Enter your age"
                        min="18"
                        max="80"
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender || ""}
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Contact Number *</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber || ""}
                        placeholder="Enter your contact number"
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        placeholder="Enter your email (optional)"
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Native Place *</label>
                      <input
                        type="text"
                        name="nativePlace"
                        value={formData.nativePlace || ""}
                        placeholder="Enter your native place/hometown"
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Employer/Owner Information Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-purple-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-4 text-purple-600 dark:text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Employer / Property Owner Details
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Full Name *</label>
                      <input
                        type="text"
                        name="employerName"
                        value={formData.employerName || ""}
                        placeholder="Enter employer/owner full name"
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Contact Number *</label>
                      <input
                        type="tel"
                        name="employerContact"
                        value={formData.employerContact || ""}
                        placeholder="Enter contact number"
                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Relationship *</label>
                    <select
                      name="relationship"
                      value={formData.relationship || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Relationship</option>
                      <option value="Employer">Employer (for Domestic Help)</option>
                      <option value="Property Owner">Property Owner (for Tenant)</option>
                      <option value="Agent">Agent/Broker</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Complete Address *</label>
                    <textarea
                      name="employerAddress"
                      value={formData.employerAddress || ""}
                      placeholder="Enter complete address with locality, city, state, and pin code"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white resize-none"
                      rows={3}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Address and Location Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-orange-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mr-4 text-orange-600 dark:text-orange-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Address & Jurisdiction
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Address of Stay *</label>
                    <input
                      type="text"
                      name="stayAddress"
                      value={formData.stayAddress || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Complete address where you will be staying/working"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Police Station Jurisdiction *</label>
                    <input
                      type="text"
                      name="policeStation"
                      value={formData.policeStation || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Name of the police station under which the address falls"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Documentation Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-indigo-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mr-4 text-indigo-600 dark:text-indigo-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Documentation & Timeline
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">ID Proof Upload *</label>
                    <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${formData.idProof ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white dark:bg-slate-800'}`}>
                      {formData.idProof ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-10 h-10 text-indigo-600 mb-2" />
                          <span className="text-indigo-800 font-bold text-lg mb-1">{formData.idProof.name}</span>
                          <button 
                            type="button"
                            onClick={() => setFormData((prev: any) => ({ ...prev, idProof: null }))}
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
                            name="idProof"
                            className="hidden"
                            id="id-proof-upload"
                            onChange={handleChange}
                            accept="image/*,application/pdf"
                            required
                          />
                          <label htmlFor="id-proof-upload" className="cursor-pointer">
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg hover:underline">Upload ID Proof</span>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">Aadhaar, Voter ID, Passport - Max 5MB</p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Duration of Stay *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration || ""}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="e.g., 01/01/2024 - 31/12/2024 or Ongoing"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-red-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-4 text-red-600 dark:text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  Security Verification
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Verification Code *</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-auto bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-mono text-xl tracking-[0.3em] font-bold text-center">
                      REGISTER77
                    </div>
                    <input
                      type="text"
                      name="captcha"
                      value={formData.captcha || ""}
                      placeholder="Enter code"
                      className="flex-1 w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white font-mono"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-extrabold py-5 px-8 rounded-2xl shadow-xl shadow-green-600/20 hover:shadow-2xl hover:shadow-green-600/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className="text-lg">{loading ? "Registering..." : "Complete Registration"}</span>
                </button>
                <div className="flex items-center justify-center mt-6 text-slate-500 dark:text-slate-400 space-x-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <p className="text-sm font-medium">Your registration will be verified within 2-3 days</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
