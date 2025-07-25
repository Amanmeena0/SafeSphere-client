import { useState } from 'react';

const SOSReport = () => {
  const [formData, setFormData] = useState({
    location: '',
    incidentType: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Placeholder for API call
      console.log('Submitting report:', formData);
      setTimeout(() => {
        setResponseMessage('🚨 SOS Report fetched successfully.');
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setResponseMessage('❌ Failed to fetched report.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-red-50 p-8 rounded-2xl shadow-lg border border-red-200">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          🛑 Emergency SOS Report
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Incident Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="e.g. MG Road, Bengaluru"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Incident Type</label>
            <select
              name="incidentType"
              required
              value={formData.incidentType}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Type</option>
              <option value="harassment">Harassment</option>
              <option value="theft">Theft</option>
              <option value="assault">Assault</option>
              <option value="cybercrime">Cyber Crime</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            {isSubmitting ? 'Submitting...' : 'Check SOS Report'}
          </button>

          {responseMessage && (
            <p className="text-center mt-4 text-green-600 font-medium">{responseMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SOSReport;
