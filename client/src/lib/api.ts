import { apiRequest } from "./queryClient";

export interface SendOTPRequest {
  contact: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  userId: number;
  otp?: string; // For development only
}

export interface VerifyOTPRequest {
  userId: number;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  user?: any;
  message?: string;
}

export const api = {
  auth: {
    sendOTP: async (data: SendOTPRequest): Promise<SendOTPResponse> => {
      const response = await apiRequest("POST", "/api/auth/send-otp", data);
      return response.json();
    },
    
    verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
      const response = await apiRequest("POST", "/api/auth/verify-otp", data);
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
    getMessages: async (userId: number) => {
      const response = await apiRequest("GET", `/api/chat/${userId}`);
      return response.json();
    },
    
    sendMessage: async (userId: number, message: string) => {
      const response = await apiRequest("POST", `/api/chat/${userId}`, { message });
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
