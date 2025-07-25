import { useState } from "react";

export default function MVTheftFIRForm() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Integration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Motor Vehicle Theft FIR</h2>
                <p className="text-orange-100 text-sm mt-1">Report stolen or missing vehicle</p>
              </div>
            </div>
            <div className="mt-4 bg-orange-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white text-sm">Please provide accurate vehicle details to help with the recovery process.</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Details Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-orange-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Vehicle Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Details</label>
                    <input
                      type="text"
                      name="vehicleDetails"
                      placeholder="Registration Number, Vehicle Type, Make, Model, Color"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Details</label>
                    <input
                      type="text"
                      name="ownerDetails"
                      placeholder="Owner Name, Contact Number, Complete Address"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Incident Details Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Theft Incident Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Theft</label>
                      <input
                        type="date"
                        name="dateOfTheft"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Time of Theft</label>
                      <input
                        type="time"
                        name="timeOfTheft"
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location of Theft</label>
                    <input
                      type="text"
                      name="locationOfTheft"
                      placeholder="Exact location where the vehicle was stolen"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Additional Information
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Previous FIR Details (if already registered)</label>
                  <textarea
                    name="firDetails"
                    placeholder="FIR Number, Date of Registration, Police Station Name"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                    rows="3"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Documentation Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Vehicle Documentation
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Vehicle Papers/Photos</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors duration-300">
                    <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <input
                      type="file"
                      name="vehicleDocs"
                      accept="image/*,application/pdf"
                      className="hidden"
                      id="vehicle-docs-upload"
                      onChange={handleChange}
                    />
                    <label htmlFor="vehicle-docs-upload" className="cursor-pointer">
                      <span className="text-purple-600 font-semibold hover:text-purple-700">Upload vehicle documents</span>
                      <p className="text-gray-500 text-sm mt-1">Registration certificate, insurance, photos - Max 10MB</p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Police Station & Security Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Police Station & Verification
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Police Station & District</label>
                    <input
                      type="text"
                      name="policeStation"
                      placeholder="Police Station Name, District"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Security Verification</label>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-200 px-4 py-2 rounded-lg font-mono text-lg tracking-wider">
                        VEHICLE123
                      </div>
                      <input
                        type="text"
                        name="captcha"
                        placeholder="Enter the verification code"
                        className="flex-1 p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Information Panel */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Important Information</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• File this report within 24 hours of discovering the theft</li>
                      <li>• Keep your vehicle documents and keys secure</li>
                      <li>• Contact your insurance company immediately</li>
                      <li>• Track your case status using the provided reference number</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Submit Vehicle Theft Report</span>
                </button>
                <p className="text-gray-500 text-sm text-center mt-3">
                  Your report will be processed and forwarded to the concerned authorities for immediate action
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
