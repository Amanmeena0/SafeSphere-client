import { useState } from "react";
import { sosService } from "../services/sos.service";
import { SOSTriggerData } from "../types/sos.types";

export const useSOSAlert = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const triggerSOS = async (data: SOSTriggerData) => {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);
    try {
      await sosService.triggerSOS(data);
      setIsSuccess(true);
    } catch (err) {
      console.error("SOS Alert failed:", err);
      setError("Failed to submit report. Please try again or call emergency services.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSuccess(false);
    setError(null);
  };

  return { triggerSOS, isSubmitting, error, isSuccess, reset };
};
