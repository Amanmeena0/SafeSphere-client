import { useState } from 'react';

const MissingPerson = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Implement API submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white">Missing Person Report</h1>
                <p className="text-cyan-100 text-sm mt-1">Help us find your loved one</p>
              </div>
            </div>
            <div className="mt-4 bg-cyan-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white text-sm">Please provide as much detail as possible to help with the search efforts.</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Missing Person Details Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-cyan-500">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-cyan-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Missing Person Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input 
                      name="name" 
                      placeholder="Enter full name of missing person" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Missing Persons *</label>
                    <input 
                      name="num_missing" 
                      placeholder="Enter number" 
                      defaultValue="1" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alias/Nickname</label>
                    <input 
                      name="alias" 
                      placeholder="Any known aliases" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Father&apos;s/Guardian&apos;s Name *</label>
                    <input 
                      name="relative_name" 
                      placeholder="Enter father's or guardian's name" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Relation Type *</label>
                    <select 
                      name="relation_type" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300"
                    >
                      <option value="">Select Relation</option>
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Spouse</option>
                      <option>Guardian</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Known Address *</label>
                    <textarea 
                      name="address" 
                      placeholder="Enter complete address where the person was last known to stay" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 resize-none" 
                      rows="3"
                      required 
                    />
                  </div>
                </div>
              </div>
              {/* Physical Description Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Physical Description
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                    <select 
                      name="gender" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                      required
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year of Birth</label>
                    <input 
                      name="year_of_birth" 
                      placeholder="YYYY" 
                      type="number"
                      min="1900"
                      max="2025"
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age From</label>
                    <input 
                      name="age_from" 
                      placeholder="Min age" 
                      type="number"
                      min="0"
                      max="120"
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age To</label>
                    <input 
                      name="age_to" 
                      placeholder="Max age" 
                      type="number"
                      min="0"
                      max="120"
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Body Build</label>
                    <select 
                      name="body_build" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    >
                      <option value="">Select Build</option>
                      <option>Thin</option>
                      <option>Medium</option>
                      <option>Heavy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Complexion</label>
                    <select 
                      name="complexion" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    >
                      <option value="">Select Complexion</option>
                      <option>Fair</option>
                      <option>Wheatish</option>
                      <option>Dark</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (Kg)</label>
                    <input 
                      name="weight" 
                      placeholder="Weight in kg" 
                      type="number"
                      min="0"
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Height Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        name="height_from_ft" 
                        placeholder="From (ft)" 
                        type="number"
                        min="0"
                        max="8"
                        onChange={handleChange} 
                        className="p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                      />
                      <input 
                        name="height_from_in" 
                        placeholder="(in)" 
                        type="number"
                        min="0"
                        max="11"
                        onChange={handleChange} 
                        className="p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input 
                        name="height_to_ft" 
                        placeholder="To (ft)" 
                        type="number"
                        min="0"
                        max="8"
                        onChange={handleChange} 
                        className="p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                      />
                      <input 
                        name="height_to_in" 
                        placeholder="(in)" 
                        type="number"
                        min="0"
                        max="11"
                        onChange={handleChange} 
                        className="p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Missing Incident Details Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-red-500">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Details of Missing Incident
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Incident Details *</label>
                    <textarea 
                      name="incidence_details" 
                      placeholder="Describe the circumstances under which the person went missing. Include any relevant details about their state of mind, any conflicts, or unusual behavior before disappearing." 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 resize-none" 
                      rows="5"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Details of Place Last Seen *</label>
                    <textarea 
                      name="last_seen" 
                      placeholder="Provide specific details about where the person was last seen, including landmarks, address, and any witnesses present." 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 resize-none" 
                      rows="4"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date and Time Last Seen *</label>
                    <input 
                      type="datetime-local" 
                      name="incident_time" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Complainant/Informant Details Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2m5-4V3a2 2 0 00-2-2H9a2 2 0 00-2 2v1m5 0H9m0 0v4h6V4z" />
                  </svg>
                  Complainant/Informant Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Complainant Name *</label>
                    <input 
                      name="complainant_name" 
                      placeholder="Full name of person filing the report" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship with Missing Person *</label>
                    <select 
                      name="relation_with_missing" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    >
                      <option value="">Select Relationship</option>
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Spouse</option>
                      <option>Sibling</option>
                      <option>Friend</option>
                      <option>Other Relative</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Complainant Address</label>
                    <textarea 
                      name="complainant_address" 
                      placeholder="Complete address of the complainant" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none" 
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                    <input 
                      name="complainant_mobile" 
                      placeholder="Primary contact number" 
                      type="tel"
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alternate Mobile</label>
                    <input 
                      name="complainant_alt_mobile" 
                      placeholder="Alternative contact number" 
                      type="tel"
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input 
                      name="complainant_email" 
                      placeholder="Email for updates" 
                      type="email"
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Any Other Information</label>
                    <textarea 
                      name="other_info" 
                      placeholder="Any additional information that might help in the search" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none" 
                      rows="4"
                    />
                  </div>
                </div>
              </div>

              {/* Police Station & Documentation Section */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-purple-500">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Police Station & Documentation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Police Station</label>
                    <select 
                      name="police_station" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    >
                      <option value="">Select Police Station</option>
                      <option>Central Police Station</option>
                      <option>North Police Station</option>
                      <option>South Police Station</option>
                      <option>East Police Station</option>
                      <option>West Police Station</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                    <select 
                      name="district" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    >
                      <option value="">Select District</option>
                      <option>District Central</option>
                      <option>District North</option>
                      <option>District South</option>
                      <option>District East</option>
                      <option>District West</option>
                    </select>
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Missing Person Photo (Max 200kb)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors duration-300">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input 
                      type="file" 
                      name="photo" 
                      onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })} 
                      className="hidden" 
                      id="photo-upload"
                      accept="image/*"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <span className="text-purple-600 font-semibold hover:text-purple-700">Click to upload photo</span>
                      <p className="text-gray-500 text-sm mt-2">Recent clear photo helps in identification - Max 200KB</p>
                    </label>
                  </div>
                </div>

                {/* Security Verification */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Security Verification</label>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-200 px-4 py-2 rounded-lg font-mono text-lg tracking-wider">
                      SEARCH123
                    </div>
                    <input 
                      name="captcha" 
                      placeholder="Enter the verification code" 
                      onChange={handleChange} 
                      className="flex-1 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact Information */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800 mb-2">Emergency Helplines</h4>
                    <ul className="text-sm text-emerald-700 space-y-1">
                      <li>• Emergency Services: 112</li>
                      <li>• Missing Person Helpline: 1094</li>
                      <li>• Child Helpline: 1098</li>
                      <li>• Women Helpline: 1091</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Submit Missing Person Report</span>
                </button>
                <p className="text-gray-500 text-sm text-center mt-3">
                  Your report will be immediately processed and shared with all relevant authorities
                </p>
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-400 mt-4">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Priority Processing</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Confidential</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingPerson;