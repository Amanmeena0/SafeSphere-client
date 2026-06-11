import apiClient from '@/lib/apiClient';

export interface BaseFirSubmission {
  incident_description: string;
  complainant_details: string;
  police_station: string;
  upload_documents?: string;
}

export interface TheftEfirSubmission extends BaseFirSubmission {
  date_of_theft: string;
  financial_impact: string;
  witness_information?: string;
}

export interface CyberCrimeSubmission extends BaseFirSubmission {
  category: string;
  platform: string;
  date: string;
  time: string;
  ip_address?: string;
  victim_full_name: string;
  victim_phone: string;
  victim_email: string;
  victim_address: string;
  victim_age?: string;
  victim_gender?: string;
  victim_relationship?: string;
}

export interface DomesticHelpSubmission extends BaseFirSubmission {
  applicant_type: string;
  full_name: string;
  age: string;
  gender: string;
  contact_number: string;
  email?: string;
  native_place: string;
  employer_name: string;
  employer_contact: string;
  relationship: string;
  employer_address: string;
  stay_address: string;
  duration_of_stay: string;
  id_proof?: string;
}

export interface LostItemSubmission extends BaseFirSubmission {
  item_name: string;
  brand?: string;
  model?: string;
  place_of_loss: string;
  date_time_of_loss: string;
  owner_name: string;
  contact: string;
  address: string;
  district: string;
}

export interface MissingPersonSubmission extends BaseFirSubmission {
  name: string;
  num_missing: string;
  alias?: string;
  relative_name: string;
  relation_type: string;
  address: string;
  gender: string;
  year_of_birth?: string;
  age_from?: string;
  age_to?: string;
  body_build?: string;
  complexion?: string;
  weight?: string;
  height_from_ft?: string;
  height_from_in?: string;
  height_to_ft?: string;
  height_to_in?: string;
  incidence_details: string;
  last_seen: string;
  incident_time: string;
  complainant_name: string;
  relation_with_missing: string;
  complainant_address?: string;
  complainant_mobile: string;
  complainant_alt_mobile?: string;
  complainant_email?: string;
  other_info?: string;
  district: string;
  photo?: string;
}

export interface MvTheftSubmission extends BaseFirSubmission {
  vehicle_details: string;
  owner_details: string;
  date_of_theft: string;
  time_of_theft: string;
  location_of_theft: string;
  fir_details?: string;
}

export interface RapeCaseSubmission extends BaseFirSubmission {
  victim_name: string;
  victim_age: string;
  victim_gender: string;
  perpetrator_info?: string;
  location: string;
  date: string;
  time: string;
  informant_info?: string;
}

export const firService = {
  submitTheftEfir: async (data: TheftEfirSubmission) => {
    return await apiClient.post('/api/fir/theft', data);
  },
  submitCyberCrime: async (data: CyberCrimeSubmission) => {
    return await apiClient.post('/api/fir/cyber-crime', data);
  },
  submitDomesticHelp: async (data: DomesticHelpSubmission) => {
    return await apiClient.post('/api/fir/domestic-help', data);
  },
  submitLostItem: async (data: LostItemSubmission) => {
    return await apiClient.post('/api/fir/lost-item', data);
  },
  submitMissingPerson: async (data: MissingPersonSubmission) => {
    return await apiClient.post('/api/fir/missing-person', data);
  },
  submitMvTheft: async (data: MvTheftSubmission) => {
    return await apiClient.post('/api/fir/mv-theft', data);
  },
  submitRapeCase: async (data: RapeCaseSubmission) => {
    return await apiClient.post('/api/fir/rape-case', data);
  }
};
