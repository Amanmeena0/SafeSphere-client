import apiClient from '@/lib/apiClient';

export interface BaseFirSubmission {
  clerk_user_id?: string;
  police_station: string;
  upload_document?: string;
}

export interface TheftEfirSubmission extends BaseFirSubmission {
  incident_description: string;
  date_of_theft: string;
  financial_impact?: string;
  witness_information?: string;
  complainant_details: string;
}

export interface CyberCrimeSubmission extends BaseFirSubmission {
  crimeCategory: string;
  platform: string;
  date_of_incident: string;
  time: string;
  IpAddress?: string;
  description: string;
  digitalEvidence?: string;
  full_name: string;
  contact_number: string;
  email: string;
  address: string;
  age?: number;
  gender?: string;
  relation?: string;
}

export interface DomesticHelpSubmission extends BaseFirSubmission {
  registeration_type: string;
  reporter_details: string;
  reporter_age?: number;
  reporter_gender?: string;
  reporter_contact?: string;
  reporter_Emailaddress: string;
  reporter_native_place: string;
  employer_name: string;
  employer_contact: string;
  employer_relations: string;
  employer_address: string;
  documentation?: string;
  duration_of_stay: string;
}

export interface LostItemSubmission extends BaseFirSubmission {
  item_name: string;
  brand?: string;
  model?: string;
  placeofloss: string;
  loss_datetime: string;
  owner_name: string;
  contact_number: string;
  address: string;
  document_type: string;
  district: string;
}

export interface MissingPersonSubmission extends BaseFirSubmission {
  Fullname: string;
  Numberofperson: number;
  nickname?: string;
  fathername: string;
  relation: string;
  lastknownlocation: string;
  gender?: string;
  yearofbirth: number;
  agefrom: number;
  ageto: number;
  bodybuild: string;
  complexion: string;
  weight: number;
  height: number;
  incidentReport: string;
  detailsLastseen: string;
  datetimelastseen: string;
  complainant_name: string;
  relationwithMissingperson: string;
  complainant_address: string;
  complainant_contact: string;
  alternate_contact?: string;
  emailaddress: string;
  anyotherdetails?: string;
  district: string;
}

export interface MvTheftSubmission extends BaseFirSubmission {
  vehicleDetails: string;
  owner_details: string;
  date_of_theft: string;
  timeoftheft: string;
  location_of_theft: string;
  previous_fir_details?: string;
}

export interface RapeCaseSubmission extends BaseFirSubmission {
  victim_name: string;
  age: number;
  gender: string;
  incidentDetails: string;
  perpetratorDetails: string;
  location_of_incident: string;
  date_of_incident: string;
  time_of_incident: string;
  informant_details: string;
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

export default firService;
