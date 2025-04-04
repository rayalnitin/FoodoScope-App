import { useAuthStore } from "../stores/authStore";

// Base URL for the API
const API_BASE_URL = "http://localhost:5000/api";

// Interface for API response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// API request options
interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

// Auth types
interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  userId: string;
  message: string;
}

interface VerifyEmailResponse {
  token: string;
  user: User;
  message: string;
}

interface ResetPasswordResponse {
  message: string;
}

interface ForgotPasswordResponse {
  message: string;
}

/**
 * Make an API request
 * @param endpoint The API endpoint
 * @param options Request options
 * @returns Promise with the API response
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions
): Promise<ApiResponse<T>> {
  try {
    const { method, body, requiresAuth = false } = options;
    
    // Set up headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add authorization token if required
    if (requiresAuth) {
      const { token } = useAuthStore.getState();
      if (!token) {
        throw new Error("Authentication required but no token found");
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Parse the response
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Error: ${response.status}`,
      };
    }

    return {
      success: true,
      data: data as T,
      message: data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unknown error occurred",
    };
  }
}

// API endpoints
export const authApi = {
  register: (userData: { name: string; email: string; password: string }) =>
    apiRequest<RegisterResponse>("/auth/register", { method: "POST", body: userData }),
  
  verifyEmail: (data: { userId: string; otp: string }) =>
    apiRequest<VerifyEmailResponse>("/auth/verify-email", { method: "POST", body: data }),
  
  login: (credentials: { email: string; password: string }) =>
    apiRequest<LoginResponse>("/auth/login", { method: "POST", body: credentials }),
    
  forgotPassword: (data: { email: string }) =>
    apiRequest<ForgotPasswordResponse>("/auth/forgot-password", { method: "POST", body: data }),
    
  resetPassword: (data: { email: string; resetCode: string; newPassword: string }) =>
    apiRequest<ResetPasswordResponse>("/auth/reset-password", { method: "POST", body: data }),
};

export const userApi = {
  getProfile: () =>
    apiRequest<User>("/users/profile", { method: "GET", requiresAuth: true }),
  
  updateProfile: (userData: Partial<User>) =>
    apiRequest<User>("/users/profile", { method: "PUT", body: userData, requiresAuth: true }),
}; 