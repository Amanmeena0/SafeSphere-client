import { useState } from "react";

export default function LostReportForm() {
  const [formData, setFormData] = useState({
    itemName: "",
    brand: "",
    model: "",
    placeOfLoss: "",
    dateTimeOfLoss: "",
    ownerName: "",
    contact: "",
    address: "",
    documents: null,
    policeStation: "",
    district: "",
    captcha: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic
    console.log(formData);
    alert("Lost report submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-orange-100">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">Lost Item Report</h2>
              <p className="text-orange-100 text-lg">Help us reunite you with your lost belongings</p>
              <div className="mt-4 flex justify-center space-x-6 text-orange-100 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Quick Process</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Fast Track</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Item Details Section */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <div className="bg-orange-500 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                Item Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-orange-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="e.g., Mobile Phone, Wallet, Keys"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 hover:border-orange-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-orange-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g., Samsung, Apple, Nike"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 hover:border-orange-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-orange-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., Galaxy S21, iPhone 13"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 hover:border-orange-300"
                  />
                </div>
              </div>
            </div>

            {/* Loss Details Section */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <div className="bg-red-500 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Loss Details
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Place of Loss *
                  </label>
                  <textarea
                    name="placeOfLoss"
                    value={formData.placeOfLoss}
                    onChange={handleChange}
                    placeholder="Describe the exact location where the item was lost (e.g., Near City Mall, Bus Stop No. 5, Park Avenue)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-red-200 focus:border-red-500 transition-all duration-300 hover:border-red-300 resize-none"
                    rows="3"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Date & Time of Loss *
                  </label>
                  <input
                    type="datetime-local"
                    name="dateTimeOfLoss"
                    value={formData.dateTimeOfLoss}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-red-200 focus:border-red-500 transition-all duration-300 hover:border-red-300"
                    required
                  />
                  <p className="text-xs text-red-600 mt-1">
                    💡 Select the approximate date and time when you first noticed the item was missing
                  </p>
                </div>
              </div>
            </div>

            {/* Owner Details Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <div className="bg-blue-500 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Owner Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Complete postal address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <div className="bg-green-500 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Supporting Documents
              </h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Upload Documents *
                  </label>
                  <div className="relative border-2 border-dashed border-green-300 rounded-lg p-6 hover:border-green-400 transition-colors duration-300 bg-green-25">
                    <input
                      type="file"
                      name="documents"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold text-green-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Purchase receipts, photos, ID proof</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-green-800 text-sm">Acceptable Documents</h4>
                      <ul className="text-xs text-green-700 mt-1 space-y-1">
                        <li>• Purchase receipt or bill</li>
                        <li>• Photos of the item (if available)</li>
                        <li>• Insurance documents</li>
                        <li>• Identity proof (Aadhaar/PAN)</li>
                      </ul>
                      <p className="text-xs text-green-600 mt-2 font-medium">
                        Formats: PDF, JPG, JPEG, PNG (Max 5MB each)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Police Station Details Section */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <div className="bg-purple-500 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Jurisdiction Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-purple-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Police Station *
                  </label>
                  <input
                    type="text"
                    name="policeStation"
                    value={formData.policeStation}
                    onChange={handleChange}
                    placeholder="Nearest Police Station"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
                    required
                  />
                  <p className="text-xs text-purple-600">
                    💡 Select the police station nearest to where you lost the item
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <svg className="w-4 h-4 text-purple-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    District *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="District name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Captcha Section */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border-l-4 border-gray-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <div className="bg-gray-500 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                Security Verification
              </h3>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Enter Security Code *
                </label>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-slate-700 to-gray-800 px-6 py-3 rounded-lg border-2 border-slate-600 shadow-inner">
                    <span className="font-mono text-xl font-bold text-white tracking-wider">
                      LOST2024
                    </span>
                  </div>
                  <input
                    type="text"
                    name="captcha"
                    value={formData.captcha}
                    onChange={handleChange}
                    placeholder="Enter the code from the left"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-gray-200 focus:border-gray-500 transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  🛡️ This helps us prevent automated submissions and ensures report authenticity
                </p>
              </div>
            </div>

            {/* Lost Item Tips */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Tips for Recovering Lost Items</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Report immediately - first 24 hours are crucial</li>
                    <li>• Check with nearby shops and establishments</li>
                    <li>• Post on local community groups and social media</li>
                    <li>• Contact transport authorities if lost in public transport</li>
                    <li>• Keep checking back with the police station for updates</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-700 hover:via-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Submit Lost Item Report</span>
              </button>
              <p className="text-gray-500 text-sm text-center mt-3">
                Your report will be registered and forwarded to the concerned authorities
              </p>
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-400 mt-4">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Filing</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Quick Processing</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>SMS Updates</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

