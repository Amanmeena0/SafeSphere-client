import { useState } from "react";
import { useSubmitFir } from "../hooks/useSubmitFir";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function LostReportForm() {
  const [formData, setFormData] = useState<any>({
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
  const { loading, status, submitLostItem } = useSubmitFir();

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
      let base64File = "";
      if (formData.documents) {
        try {
          base64File = await fileToBase64(formData.documents);
        } catch (err) {
          console.error("File conversion error:", err);
        }
      }

      const submissionData = {
        item_name: formData.itemName || "",
        brand: formData.brand || "",
        model: formData.model || "",
        placeofloss: formData.placeOfLoss || "",
        loss_datetime: formData.dateTimeOfLoss || "",
        owner_name: formData.ownerName || "",
        contact_number: formData.contact || "",
        address: formData.address || "",
        district: formData.district || "",
        police_station: formData.policeStation || "",
        document_type: base64File,
      };

      const success = await submitLostItem(submissionData);

      if (success) {
        setFormData({
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
        e.target.reset();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061224] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-[#0B1F3A]/40 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">Lost Item Report</h2>
              <p className="text-orange-100 mt-2 font-medium opacity-90">Help us reunite you with your lost belongings</p>
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
              {/* Item Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-orange-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mr-4 text-orange-600 dark:text-orange-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  Item Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Item Name *</label>
                    <input
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      placeholder="e.g., Mobile Phone, Wallet"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="e.g., Samsung, Apple"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g., Galaxy S21"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Loss Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-red-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-4 text-red-600 dark:text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  Loss Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Place of Loss *</label>
                    <textarea
                      name="placeOfLoss"
                      value={formData.placeOfLoss}
                      onChange={handleChange}
                      placeholder="Describe the exact location where the item was lost"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Date & Time of Loss *</label>
                    <input
                      type="datetime-local"
                      name="dateTimeOfLoss"
                      value={formData.dateTimeOfLoss}
                      onChange={handleChange}
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Owner Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4 text-blue-600 dark:text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Owner Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Owner Name *</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Contact Number *</label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Complete address"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-green-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4 text-green-600 dark:text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Documents
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Upload Supporting Files *</label>
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${formData.documents ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-slate-300 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 bg-white dark:bg-slate-800'}`}>
                    {formData.documents ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <span className="text-slate-900 dark:text-white font-bold text-lg mb-1">{formData.documents.name}</span>
                        <button 
                          type="button"
                          onClick={() => setFormData((prev: any) => ({ ...prev, documents: null }))}
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
                          name="documents"
                          onChange={handleChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                        />
                        <div className="text-center">
                          <span className="text-green-600 dark:text-green-400 font-bold text-lg hover:underline">Click to upload files</span>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">Images, PDFs up to 10MB</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Police Station Details Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-purple-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-4 text-purple-600 dark:text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Jurisdiction
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Police Station *</label>
                    <input
                      type="text"
                      name="policeStation"
                      value={formData.policeStation}
                      onChange={handleChange}
                      placeholder="Nearest Police Station"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">District *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="District name"
                      className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-slate-500/30">
                <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center mr-4 text-slate-600 dark:text-slate-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  Verification
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Security Code *</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-auto bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-mono text-xl tracking-[0.3em] font-bold text-center">
                      LOST77
                    </div>
                    <input
                      type="text"
                      name="captcha"
                      value={formData.captcha}
                      onChange={handleChange}
                      placeholder="Enter code"
                      className="flex-1 w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-slate-500 dark:focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 transition-all outline-none text-slate-900 dark:text-white font-mono"
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
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold py-5 px-8 rounded-2xl shadow-xl shadow-orange-600/20 hover:shadow-2xl hover:shadow-orange-600/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  <span className="text-lg">{loading ? "Processing..." : "Submit Lost Item Report"}</span>
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
