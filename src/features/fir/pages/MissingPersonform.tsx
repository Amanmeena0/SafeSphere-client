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
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-[#0B1F3A]/40 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">Missing Person Report</h2>
              <p className="text-cyan-100 mt-2 font-medium opacity-90">Help us find your loved one</p>
            </div>
          </div>

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
              {/* Missing Person Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-cyan-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mr-4 text-cyan-600 dark:text-cyan-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Missing Person Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Full Name *</label>
                    <input 
                      name="name" 
                      value={formData.name || ""}
                      placeholder="Enter full name of missing person" 
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Number of Persons *</label>
                    <input 
                      name="num_missing" 
                      value={formData.num_missing || "1"}
                      placeholder="Enter number" 
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Alias/Nickname</label>
                    <input 
                      name="alias" 
                      value={formData.alias || ""}
                      placeholder="Any known aliases" 
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Father's/Guardian's Name *</label>
                    <input 
                      name="relative_name" 
                      value={formData.relative_name || ""}
                      placeholder="Enter father's or guardian's name" 
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Relation Type *</label>
                    <select 
                      name="relation_type" 
                      value={formData.relation_type || ""}
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none text-slate-900 dark:text-white"
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
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Last Known Address *</label>
                    <textarea 
                      name="address" 
                      value={formData.address || ""}
                      placeholder="Enter complete address where the person was last known to stay" 
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none text-slate-900 dark:text-white resize-none" 
                      rows={3}
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Physical Description Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-green-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4 text-green-600 dark:text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  Physical Description
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Gender *</label>
                    <select 
                      name="gender" 
                      value={formData.gender || ""}
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                      required
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Year of Birth</label>
                    <input 
                      name="year_of_birth" 
                      value={formData.year_of_birth || ""}
                      placeholder="YYYY" 
                      type="number"
                      min="1900"
                      max="2025"
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Age From</label>
                    <input 
                      name="age_from" 
                      value={formData.age_from || ""}
                      placeholder="Min age" 
                      type="number"
                      min="0"
                      max="120"
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Age To</label>
                    <input 
                      name="age_to" 
                      value={formData.age_to || ""}
                      placeholder="Max age" 
                      type="number"
                      min="0"
                      max="120"
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Body Build</label>
                    <select 
                      name="body_build" 
                      value={formData.body_build || ""}
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white"
                    >
                      <option value="">Select Build</option>
                      <option>Thin</option>
                      <option>Medium</option>
                      <option>Heavy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Complexion</label>
                    <select 
                      name="complexion" 
                      value={formData.complexion || ""}
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white"
                    >
                      <option value="">Select Complexion</option>
                      <option>Fair</option>
                      <option>Wheatish</option>
                      <option>Dark</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Weight (Kg)</label>
                    <input 
                      name="weight" 
                      value={formData.weight || ""}
                      placeholder="Weight in kg" 
                      type="number"
                      min="0"
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                    />
                  </div>
                </div>
              </div>

              {/* Missing Incident Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-red-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-4 text-red-600 dark:text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  Incident Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Incident Description *</label>
                    <textarea 
                      name="incidence_details" 
                      value={formData.incidence_details || ""}
                      placeholder="Describe the circumstances..." 
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white resize-none" 
                      rows={5}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Date and Time Last Seen *</label>
                    <input 
                      type="datetime-local" 
                      name="incident_time" 
                      value={formData.incident_time || ""}
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Complainant Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4 text-blue-600 dark:text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2m5-4V3a2 2 0 00-2-2H9a2 2 0 00-2 2v1m5 0H9m0 0v4h6V4z" />
                    </svg>
                  </div>
                  Complainant Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Complainant Name *</label>
                    <input 
                      name="complainant_name" 
                      value={formData.complainant_name || ""}
                      placeholder="Full name of person filing report" 
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Relation with Missing Person *</label>
                    <select 
                      name="relation_with_missing" 
                      value={formData.relation_with_missing || ""}
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    >
                      <option value="">Select Relation</option>
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Spouse</option>
                      <option>Sibling</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Mobile Number *</label>
                    <input 
                      name="complainant_mobile" 
                      value={formData.complainant_mobile || ""}
                      placeholder="Primary contact number" 
                      type="tel"
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Police Station & Photo Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-purple-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-4 text-purple-600 dark:text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Reporting & Photo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Police Station *</label>
                    <input 
                      name="police_station" 
                      value={formData.police_station || ""}
                      placeholder="Enter police station name"
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">District *</label>
                    <input 
                      name="district" 
                      value={formData.district || ""}
                      placeholder="Enter district name"
                      onChange={handleChange} 
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Upload Missing Person Photo</label>
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${formData.photo ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10' : 'border-slate-300 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 bg-white dark:bg-slate-800'}`}>
                    {formData.photo ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8 text-purple-600" />
                        </div>
                        <span className="text-slate-900 dark:text-white font-bold text-lg mb-1">{formData.photo.name}</span>
                        <button 
                          type="button"
                          onClick={() => setFormData((prev: any) => ({ ...prev, photo: null }))}
                          className="mt-2 text-sm text-red-600 hover:text-red-700 font-bold px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 transition-colors"
                        >
                          Remove photo
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input 
                          type="file" 
                          name="photo" 
                          onChange={handleChange} 
                          className="hidden" 
                          id="photo-upload"
                          accept="image/*"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <span className="text-purple-600 dark:text-purple-400 font-bold text-lg hover:underline">Click to upload photo</span>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">Recent clear photo - Max 200KB</p>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Security Verification *</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-auto bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-mono text-xl tracking-[0.3em] font-bold text-center">
                      SEARCH77
                    </div>
                    <input 
                      name="captcha" 
                      value={formData.captcha || ""}
                      placeholder="Enter code" 
                      onChange={handleChange} 
                      className="flex-1 w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white font-mono" 
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
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-extrabold py-5 px-8 rounded-2xl shadow-xl shadow-cyan-600/20 hover:shadow-2xl hover:shadow-cyan-600/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                  <span className="text-lg">{loading ? "Processing..." : "Submit Report"}</span>
                </button>
                <div className="flex items-center justify-center mt-6 text-slate-500 dark:text-slate-400 space-x-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <p className="text-sm font-medium">Report shared with all relevant authorities</p>
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
