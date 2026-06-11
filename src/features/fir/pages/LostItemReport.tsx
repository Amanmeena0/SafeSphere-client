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
        place_of_loss: formData.placeOfLoss || "",
        date_time_of_loss: formData.dateTimeOfLoss || "",
        owner_name: formData.ownerName || "",
        contact: formData.contact || "",
        address: formData.address || "",
        district: formData.district || "",
        police_station: formData.policeStation || "",
        incident_description: `Lost item: ${formData.itemName}. Place: ${formData.placeOfLoss}`,
        complainant_details: formData.ownerName || "",
        upload_documents: base64File,
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
            </div>
          </div>

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
                    <label className="flex items-center text-sm font-semibold text-gray-700">Item Name *</label>
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
                    <label className="flex items-center text-sm font-semibold text-gray-700">Brand</label>
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
                    <label className="flex items-center text-sm font-semibold text-gray-700">Model</label>
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
                    <label className="flex items-center text-sm font-semibold text-gray-700">Place of Loss *</label>
                    <textarea
                      name="placeOfLoss"
                      value={formData.placeOfLoss}
                      onChange={handleChange}
                      placeholder="Describe the exact location where the item was lost"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-red-200 focus:border-red-500 transition-all duration-300 hover:border-red-300 resize-none"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">Date & Time of Loss *</label>
                    <input
                      type="datetime-local"
                      name="dateTimeOfLoss"
                      value={formData.dateTimeOfLoss}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-red-200 focus:border-red-500 transition-all duration-300 hover:border-red-300"
                      required
                    />
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
                    <label className="flex items-center text-sm font-semibold text-gray-700">Owner Name *</label>
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
                    <label className="flex items-center text-sm font-semibold text-gray-700">Contact Number *</label>
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
                    <label className="flex items-center text-sm font-semibold text-gray-700">Address *</label>
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
                    <label className="flex items-center text-sm font-semibold text-gray-700">Upload Documents *</label>
                    <div className={`relative border-2 border-dashed rounded-lg p-6 hover:border-green-400 transition-colors duration-300 ${formData.documents ? 'border-green-500 bg-green-50' : 'border-green-300'}`}>
                      {formData.documents ? (
                        <div className="text-center">
                          <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                          <p className="mt-2 text-sm font-semibold text-green-800">{formData.documents.name}</p>
                          <button 
                            type="button"
                            onClick={() => setFormData((prev: any) => ({ ...prev, documents: null }))}
                            className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
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
                          </div>
                        </>
                      )}
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
                    <label className="flex items-center text-sm font-semibold text-gray-700">Police Station *</label>
                    <input
                      type="text"
                      name="policeStation"
                      value={formData.policeStation}
                      onChange={handleChange}
                      placeholder="Nearest Police Station"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">District *</label>
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
                  <label className="flex items-center text-sm font-semibold text-gray-700">Enter Security Code *</label>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-slate-700 to-gray-800 px-6 py-3 rounded-lg border-2 border-slate-600 shadow-inner">
                      <span className="font-mono text-xl font-bold text-white tracking-wider">LOST2024</span>
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
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-700 hover:via-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  <span>{loading ? "Submitting..." : "Submit Lost Item Report"}</span>
                </button>
                <p className="text-gray-500 text-sm text-center mt-3">
                  Your report will be registered and forwarded to the concerned authorities
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
