import { useState } from 'react';
import { useSubmitFir } from "../hooks/useSubmitFir";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const MissingPerson = () => {
  const [formData, setFormData] = useState<any>({
    num_missing: "1"
  });
  const { loading, status, submitMissingPerson } = useSubmitFir();

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
      let base64Photo = "";
      if (formData.photo) {
        try {
          base64Photo = await fileToBase64(formData.photo);
        } catch (err) {
          console.error("File conversion error:", err);
        }
      }

      const submissionData = {
        Fullname: formData.name || "",
        Numberofperson: formData.num_missing ? parseInt(formData.num_missing) : 1,
        nickname: formData.alias || "",
        fathername: formData.relative_name || "",
        relation: formData.relation_type || "",
        lastknownlocation: formData.address || "",
        gender: formData.gender || "",
        yearofbirth: formData.year_of_birth ? parseInt(formData.year_of_birth) : 0,
        agefrom: formData.age_from ? parseInt(formData.age_from) : 0,
        ageto: formData.age_to ? parseInt(formData.age_to) : 0,
        bodybuild: formData.body_build || "",
        complexion: formData.complexion || "",
        weight: formData.weight ? parseFloat(formData.weight) : 0,
        height: formData.height_from_ft ? (parseInt(formData.height_from_ft) + (formData.height_from_in ? parseInt(formData.height_from_in) / 12 : 0)) : 0,
        incidentReport: formData.incidence_details || "",
        detailsLastseen: formData.last_seen || "",
        datetimelastseen: formData.incident_time || "",
        complainant_name: formData.complainant_name || "",
        relationwithMissingperson: formData.relation_with_missing || "",
        complainant_address: formData.complainant_address || "",
        complainant_contact: formData.complainant_mobile || "",
        alternate_contact: formData.complainant_alt_mobile || "",
        emailaddress: formData.complainant_email || "",
        anyotherdetails: formData.other_info || "",
        policestation: formData.police_station || "",
        district: formData.district || "",
        upload_document: base64Photo,
      };

      const success = await submitMissingPerson(submissionData);

      if (success) {
        setFormData({ num_missing: "1" });
        e.target.reset();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
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
                      value={formData.name || ""}
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
                      value={formData.num_missing || "1"}
                      placeholder="Enter number" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alias/Nickname</label>
                    <input 
                      name="alias" 
                      value={formData.alias || ""}
                      placeholder="Any known aliases" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Father&apos;s/Guardian&apos;s Name *</label>
                    <input 
                      name="relative_name" 
                      value={formData.relative_name || ""}
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
                      value={formData.relation_type || ""}
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300"
                      required
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
                      value={formData.address || ""}
                      placeholder="Enter complete address where the person was last known to stay" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 resize-none" 
                      rows={3}
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
                      value={formData.gender || ""}
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
                      value={formData.year_of_birth || ""}
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
                      value={formData.age_from || ""}
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
                      value={formData.age_to || ""}
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
                      value={formData.body_build || ""}
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
                      value={formData.complexion || ""}
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
                      value={formData.weight || ""}
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
                        value={formData.height_from_ft || ""}
                        placeholder="From (ft)" 
                        type="number"
                        min="0"
                        max="8"
                        onChange={handleChange} 
                        className="p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                      />
                      <input 
                        name="height_from_in" 
                        value={formData.height_from_in || ""}
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
                        value={formData.height_to_ft || ""}
                        placeholder="To (ft)" 
                        type="number"
                        min="0"
                        max="8"
                        onChange={handleChange} 
                        className="p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300" 
                      />
                      <input 
                        name="height_to_in" 
                        value={formData.height_to_in || ""}
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
                      value={formData.incidence_details || ""}
                      placeholder="Describe the circumstances under which the person went missing." 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 resize-none" 
                      rows={5}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Details of Place Last Seen *</label>
                    <textarea 
                      name="last_seen" 
                      value={formData.last_seen || ""}
                      placeholder="Provide specific details about where the person was last seen." 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 resize-none" 
                      rows={4}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date and Time Last Seen *</label>
                    <input 
                      type="datetime-local" 
                      name="incident_time" 
                      value={formData.incident_time || ""}
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
                      value={formData.complainant_name || ""}
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
                      value={formData.relation_with_missing || ""}
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      required
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
                      value={formData.complainant_address || ""}
                      placeholder="Complete address of the complainant" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none" 
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                    <input 
                      name="complainant_mobile" 
                      value={formData.complainant_mobile || ""}
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
                      value={formData.complainant_alt_mobile || ""}
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
                      value={formData.complainant_email || ""}
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
                      value={formData.other_info || ""}
                      placeholder="Any additional information that might help in the search" 
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none" 
                      rows={4}
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
                    <input 
                      name="police_station" 
                      value={formData.police_station || ""}
                      placeholder="Enter police station name"
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                    <input 
                      name="district" 
                      value={formData.district || ""}
                      placeholder="Enter district name"
                      onChange={handleChange} 
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Missing Person Photo (Max 200kb)</label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${formData.photo ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-500'}`}>
                    {formData.photo ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-10 h-10 text-purple-600 mb-2" />
                        <span className="text-purple-800 font-semibold">{formData.photo.name}</span>
                        <button 
                          type="button"
                          onClick={() => setFormData((prev: any) => ({ ...prev, photo: null }))}
                          className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <input 
                          type="file" 
                          name="photo" 
                          onChange={handleChange} 
                          className="hidden" 
                          id="photo-upload"
                          accept="image/*"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <span className="text-purple-600 font-semibold hover:text-purple-700">Click to upload photo</span>
                          <p className="text-gray-500 text-sm mt-2">Recent clear photo helps in identification - Max 200KB</p>
                        </label>
                      </>
                    )}
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
                      value={formData.captcha || ""}
                      placeholder="Enter the verification code" 
                      onChange={handleChange} 
                      className="flex-1 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300" 
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
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                  <span>{loading ? "Submitting..." : "Submit Missing Person Report"}</span>
                </button>
                <p className="text-gray-500 text-sm text-center mt-3">
                  Your report will be immediately processed and shared with all relevant authorities
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingPerson;
