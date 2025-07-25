import { useState } from "react";

export default function CyberCrimeForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Cyber Crime report submitted successfully.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-700 to-indigo-800 px-8 py-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Cyber Crime Report</h2>
                <p className="text-purple-100 text-sm mt-1">Digital Security Incident Reporting</p>
              </div>
            </div>
            <div className="mt-4 bg-purple-600/30 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-white text-sm">Report cybersecurity incidents to help protect the digital community. All reports are handled confidentially.</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Incident Type Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Incident Classification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Crime Category *</label>
                    <select
                      name="category"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Crime Type</option>
                      <option>Phishing Attack</option>
                      <option>Online Fraud</option>
                      <option>Cyber Harassment</option>
                      <option>Data Breach</option>
                      <option>Identity Theft</option>
                      <option>Ransomware</option>
                      <option>Social Engineering</option>
                      <option>Cryptocurrency Fraud</option>
                      <option>Online Scam</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Platform or Medium *</label>
                    <input
                      type="text"
                      name="platform"
                      placeholder="e.g., WhatsApp, Facebook, Email, Banking Website"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Technical Details Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-indigo-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Technical Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Incident *</label>
                      <input
                        type="date"
                        name="date"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Time of Incident *</label>
                      <input
                        type="time"
                        name="time"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">IP Address or URL (if known)</label>
                    <input
                      type="text"
                      name="ipAddress"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                      placeholder="e.g., 192.168.1.1 or https://suspicious-website.com"
                      onChange={handleChange}
                    />
                    <p className="text-gray-500 text-xs mt-1">Optional but helpful for investigation</p>
                  </div>
                </div>
              </div>

              {/* Incident Description Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Incident Details
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description of Incident *</label>
                  <textarea
                    name="incidentDescription"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 resize-none"
                    rows="6"
                    placeholder="Please provide a detailed description of what happened. Include:&#10;• How the incident occurred&#10;• What information was compromised&#10;• Financial losses (if any)&#10;• Steps you've already taken&#10;• Any suspicious communications received"
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              {/* Evidence Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-amber-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Digital Evidence
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Evidence (Screenshots, Chat logs, Emails)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-500 transition-colors duration-300">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <input
                      type="file"
                      name="attachments"
                      accept="image/*,application/pdf,.txt,.doc,.docx"
                      className="hidden"
                      id="evidence-upload"
                      onChange={handleChange}
                      multiple
                    />
                    <label htmlFor="evidence-upload" className="cursor-pointer">
                      <span className="text-amber-600 font-semibold hover:text-amber-700">Upload Digital Evidence</span>
                      <p className="text-gray-500 text-sm mt-2">Screenshots, PDFs, Documents, Chat logs - Max 10MB per file</p>
                      <p className="text-gray-400 text-xs mt-1">Supported: Images, PDF, DOC, TXT files</p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Victim Information Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Victim Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="victimFullName"
                        placeholder="Enter victim's full name"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                      <input
                        type="tel"
                        name="victimPhone"
                        placeholder="Enter contact number"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="victimEmail"
                      placeholder="Enter email address"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                    <textarea
                      name="victimAddress"
                      placeholder="Enter complete address with city, state, and pin code"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                      rows="3"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        name="victimAge"
                        placeholder="Enter age"
                        min="1"
                        max="120"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                      <select
                        name="victimGender"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship to Reporter</label>
                    <select
                      name="victimRelationship"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      onChange={handleChange}
                    >
                      <option value="">Select Relationship</option>
                      <option value="Self">Self (I am the victim)</option>
                      <option value="Family Member">Family Member</option>
                      <option value="Friend">Friend</option>
                      <option value="Colleague">Colleague</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Reporting Authority Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Reporting Authority & Verification
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Police Station / Cyber Crime Unit *</label>
                    <input
                      type="text"
                      name="policeStation"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                      placeholder="Nearest Police Station or Cyber Crime Cell"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Security Verification *</label>
                    <div className="flex items-center space-x-4">
                      <div className="bg-slate-800 text-white px-4 py-2 rounded-lg font-mono text-lg tracking-wider">
                        CYBER2024
                      </div>
                      <input
                        type="text"
                        name="captcha"
                        placeholder="Enter the security code"
                        className="flex-1 p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cyber Security Tips */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-cyan-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-800 mb-2">Important Cyber Security Information</h4>
                    <ul className="text-sm text-cyan-700 space-y-1">
                      <li>• Report cyber crimes within 24 hours for better investigation</li>
                      <li>• Preserve all digital evidence - don&apos;t delete anything</li>
                      <li>• Change all passwords immediately if compromised</li>
                      <li>• Contact your bank if financial fraud is involved</li>
                      <li>• National Cyber Crime Helpline: 1930</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Submit Cyber Crime Report</span>
                </button>
                <p className="text-gray-500 text-sm text-center mt-3">
                  Your report will be forwarded to the Cyber Crime Investigation Team for immediate action
                </p>
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-400 mt-4">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Priority Investigation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Digital Forensics</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
