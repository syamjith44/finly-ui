import { apiRequest } from "./queryClient";
import { config } from '@/config';

export interface SendOTPRequest {
  mobile_number: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  otp?: string; // For development only
}

export interface VerifyOTPRequest {
  mobile_number: string;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  access_token: string;
  message?: string;
}

export interface UserSettingsResponse {
  _id: string,
  email: string,
  mobile_number: string
}

export const api = {
  auth: {
    sendOTP: async (data: SendOTPRequest): Promise<SendOTPResponse> => {
      const response = await apiRequest(
        "POST", 
        `${config.API_BASE_URL}/auth/send-otp/`, 
        data
      );
      return response.json();
    },
    
    verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
      const response = await apiRequest(
        "POST", 
        `${config.API_BASE_URL}/auth/login/`, 
        data
      );
      return response.json();
    },

    getUserSettings: async (): Promise<UserSettingsResponse> => {
      const response = await apiRequest(
        "GET", `${config.API_BASE_URL}/users/user-settings/`, 
      );
      return response.json();
    }
  },


  financial: {
    getData: async (userId: number) => {
      const response = await apiRequest("GET", `/api/financial-data/${userId}`);
      return response.json();
    },
    
    updateData: async (userId: number, data: any) => {
      const response = await apiRequest("PUT", `/api/financial-data/${userId}`, data);
      return response.json();
    }
  },

  chat: {
    getMessages: async () => {
      const response = await apiRequest("GET", `${config.API_BASE_URL}/api/assistant/chat/`);
      return response.json();
    },
    
    sendMessage: async (userId: string, message: string) => {
      const response = await apiRequest("POST", `${config.API_BASE_URL}/api/assistant/chat/${userId}`, { message });
      return response.json();
    }
  },

  config: {
    get: async (userId: number) => {
      const response = await apiRequest("GET", `/api/config/${userId}`);
      return response.json();
    },
    
    update: async (userId: number, config: any) => {
      const response = await apiRequest("PUT", `/api/config/${userId}`, config);
      return response.json();
    }
  }
};
