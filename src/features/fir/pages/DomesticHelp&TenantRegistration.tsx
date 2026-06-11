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
        applicant_type: formData.applicantType || "",
        full_name: formData.fullName || "",
        age: formData.age || "",
        gender: formData.gender || "",
        contact_number: formData.contactNumber || "",
        email: formData.email || "",
        native_place: formData.nativePlace || "",
        employer_name: formData.employerName || "",
        employer_contact: formData.employerContact || "",
        relationship: formData.relationship || "",
        employer_address: formData.employerAddress || "",
        stay_address: formData.stayAddress || "",
        police_station: formData.policeStation || "",
        duration_of_stay: formData.duration || "",
        id_proof: base64IdProof,
        incident_description: `Registration for ${formData.applicantType}`,
        complainant_details: formData.fullName || "",
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0c0 .55.45 1 1 1h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0c0 .55.45 1 1 1h18" />
                </svg>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Registration Form</h2>
                <p className="text-green-100 text-sm mt-1">Domestic Help / Tenant Registration</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {status.type === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 text-green-700">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p>{status.message}</p>
              </div>
            )}
            {status.type === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{status.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Applicant Type Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Registration Type
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Applicant Type *</label>
                  <select
                    name="applicantType"
                    value={formData.applicantType || ""}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
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
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ""}
                        placeholder="Enter your full name"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age || ""}
                        placeholder="Enter your age"
                        min="18"
                        max="80"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender || ""}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber || ""}
                        placeholder="Enter your contact number"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        placeholder="Enter your email (optional)"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Native Place *</label>
                      <input
                        type="text"
                        name="nativePlace"
                        value={formData.nativePlace || ""}
                        placeholder="Enter your native place/hometown"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Employer/Owner Information Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Employer / Property Owner Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="employerName"
                        value={formData.employerName || ""}
                        placeholder="Enter employer/owner full name"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                      <input
                        type="tel"
                        name="employerContact"
                        value={formData.employerContact || ""}
                        placeholder="Enter contact number"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship *</label>
                    <select
                      name="relationship"
                      value={formData.relationship || ""}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                    <textarea
                      name="employerAddress"
                      value={formData.employerAddress || ""}
                      placeholder="Enter complete address with locality, city, state, and pin code"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
                      rows={3}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Address and Location Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-orange-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Address & Jurisdiction
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address of Stay *</label>
                    <input
                      type="text"
                      name="stayAddress"
                      value={formData.stayAddress || ""}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                      placeholder="Complete address where you will be staying/working"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Police Station Jurisdiction *</label>
                    <input
                      type="text"
                      name="policeStation"
                      value={formData.policeStation || ""}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                      placeholder="Name of the police station under which the address falls"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Documentation Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-indigo-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documentation & Timeline
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID Proof Upload *</label>
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${formData.idProof ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'}`}>
                      {formData.idProof ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-10 h-10 text-indigo-600 mb-2" />
                          <span className="text-indigo-800 font-semibold">{formData.idProof.name}</span>
                          <button 
                            type="button"
                            onClick={() => setFormData((prev: any) => ({ ...prev, idProof: null }))}
                            className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
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
                            <span className="text-indigo-600 font-semibold hover:text-indigo-700">Upload ID Proof</span>
                            <p className="text-gray-500 text-sm mt-1">Aadhaar, Voter ID, Passport, Driving License - Max 5MB</p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Duration of Stay *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration || ""}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                      placeholder="e.g., 01/01/2024 - 31/12/2024 or Ongoing"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Security Verification
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Code *</label>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-200 px-4 py-2 rounded-lg font-mono text-lg tracking-wider">
                      REGISTER123
                    </div>
                    <input
                      type="text"
                      name="captcha"
                      value={formData.captcha || ""}
                      placeholder="Enter the verification code"
                      className="flex-1 p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span>{loading ? "Registering..." : "Complete Registration"}</span>
                </button>
                <p className="text-gray-500 text-sm text-center mt-3">
                  Your registration will be processed and verified by the authorities within 2-3 working days
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
