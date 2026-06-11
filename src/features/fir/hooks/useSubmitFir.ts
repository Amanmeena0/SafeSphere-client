import { useState } from 'react';
import { 
  firService, 
  TheftEfirSubmission, 
  CyberCrimeSubmission,
  DomesticHelpSubmission,
  LostItemSubmission,
  MissingPersonSubmission,
  MvTheftSubmission,
  RapeCaseSubmission
} from '../services/fir.service';

export const useSubmitFir = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const submitFir = async (submitFn: (data: any) => Promise<any>, data: any, successMessage: string) => {
    setLoading(true);
    setStatus({ type: null, message: "" });
    try {
      const response = await submitFn(data);
      if (response.status === 200 || response.status === 201) {
        setStatus({ type: "success", message: successMessage });
        return true;
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus({ 
        type: "error", 
        message: error.response?.data?.error || error.response?.data?.message || error.message || "Failed to submit FIR. Please try again." 
      });
      return false;
    } finally {
      setLoading(false);
    }
    return false;
  };

  const submitTheftEfir = (data: TheftEfirSubmission) => 
    submitFir(firService.submitTheftEfir, data, "Theft E-FIR submitted successfully. You can track its status in 'My Reports'.");

  const submitCyberCrime = (data: CyberCrimeSubmission) =>
    submitFir(firService.submitCyberCrime, data, "Cyber Crime report submitted successfully. Investigation ID generated.");

  const submitDomesticHelp = (data: DomesticHelpSubmission) =>
    submitFir(firService.submitDomesticHelp, data, "Domestic Help/Tenant registration submitted successfully.");

  const submitLostItem = (data: LostItemSubmission) =>
    submitFir(firService.submitLostItem, data, "Lost item report submitted successfully.");

  const submitMissingPerson = (data: MissingPersonSubmission) =>
    submitFir(firService.submitMissingPerson, data, "Missing person report submitted successfully.");

  const submitMvTheft = (data: MvTheftSubmission) =>
    submitFir(firService.submitMvTheft, data, "Motor Vehicle Theft FIR submitted successfully.");

  const submitRapeCase = (data: RapeCaseSubmission) =>
    submitFir(firService.submitRapeCase, data, "Sensitive case report submitted successfully. We will contact you shortly.");

  return {
    loading,
    status,
    setStatus,
    submitTheftEfir,
    submitCyberCrime,
    submitDomesticHelp,
    submitLostItem,
    submitMissingPerson,
    submitMvTheft,
    submitRapeCase
  };
};
