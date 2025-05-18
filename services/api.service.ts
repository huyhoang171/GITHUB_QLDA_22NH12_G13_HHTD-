import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://f64c-1-53-56-79.ngrok-free.app';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Define TypeScript interfaces for data models
export interface User {
  id: number;
  username: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Exercise {
  id: number;
  name: string;
}

export interface DailyChallenge {
  id: number;
  name: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  username?: string; // Add username to the response type
  email?: string; // Add email to the response type
  userid?: number; // Add userId to the response type
  createAt?: string; // Add createdAt to the response type
  role?: string; // Add role to the response type
}

// Update API functions to use these types
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchRoles = async (): Promise<Role[]> => {
  const response = await api.get('/roles');
  return response.data;
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  const response = await api.get('/exercises');
  return response.data;
};

export const fetchDailyChallenges = async (): Promise<DailyChallenge[]> => {
  const response = await api.get('/daily-challenges');
  return response.data;
};

// Add a new function to fetch tables
export const fetchTables = async (): Promise<any[]> => {
  const response = await api.get('/tables');
  return response.data;
};

// Add a new function to delete a table
export const deleteTable = async (tableId: number): Promise<void> => {
  await api.delete(`/tables/${tableId}`);
};

// Add a new function to check login
// export const checkLogin = async (username: string, password: string): Promise<LoginResponse> => {
//   // giả lập response thành công
//   return {
//     success: true,
//     message: "Đăng nhập thành công",
//     role: "User", // hoặc "Admin"
//   };
// };
export const checkLogin = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const registerUser = async (data: { username: string; email: string; password: string }): Promise<{ success: boolean; message: string }> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

//call api for ai 
export const processAIRequest = async (input: string): Promise<{ result: string }> => {
  const response = await api.post('/ai/process', { input });
  return response.data;
};

// Call API for save progress vocabulary
export const saveProgressApi = async (topicname: string, progress: number): Promise<{ success: boolean }> => {
  try {
    // Lấy userid từ AsyncStorage
    const useridString = await AsyncStorage.getItem('userid');
    if (!useridString) {
      throw new Error('Không tìm thấy userid trong AsyncStorage');
    }

    // Chuyển userid từ string sang số (vì userid được lưu dưới dạng JSON string)
    const userId = JSON.parse(useridString);

    // Gửi yêu cầu POST với userid, topicName và learnedWords
    const response = await api.post('/auth/progress-save-topic', {
      userId,
      topicname,
      progress,
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lưu tiến độ:', error);
    return { success: false };
  }
};

//Call API for save progress grammar
export const saveProgressGrammarApi = async (grammarid: number, progress: number): Promise<{ success: boolean }> => {
  try {
    // Lấy userid từ AsyncStorage
    const useridString = await AsyncStorage.getItem('userid');
    if (!useridString) {
      throw new Error('Không tìm thấy userid trong AsyncStorage');
    }

    // Chuyển userid từ string sang số (vì userid được lưu dưới dạng JSON string)
    const userId = JSON.parse(useridString);

    // Gửi yêu cầu POST với userid, lessonId và progress
    const response = await api.post('/auth/progress-save-grammar', {
      userId,
      grammarid,
      progress,
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lưu tiến độ:', error);
    return { success: false };
  }
};

//call api for save progress speaking
export const saveProgressSpeakingApi = async (speakingname: string, progress: number): Promise<{ success: boolean }> => {
  try {
    // Lấy userid từ AsyncStorage
    const useridString = await AsyncStorage.getItem('userid');
    if (!useridString) {
      throw new Error('Không tìm thấy userid trong AsyncStorage');
    }

    // Chuyển userid từ string sang số (vì userid được lưu dưới dạng JSON string)
    const userId = JSON.parse(useridString);

    // Gửi yêu cầu POST với userid, topicName và learnedWords
    const response = await api.post('/auth/progress-save-speaking', {
      userId,
      speakingname,
      progress,
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lưu tiến độ:', error);
    return { success: false };
  }
};

//call api for forgot password
export const forgotPasswordApi = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu quên mật khẩu:', error);
    return { success: false, message: 'Đã xảy ra lỗi' };
  }
};

//call api for reset password
export const resetPasswordApi = async (passwordold: string, passwordnew: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Lấy userid từ AsyncStorage
    const email = await AsyncStorage.getItem('email');
    if (!email) {
      throw new Error('Không tìm thấy userid trong AsyncStorage');
    }
    const response = await api.post('/auth/reset-password', {email, passwordold, passwordnew });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu đặt lại mật khẩu:', error);
    return { success: false, message: 'Đã xảy ra lỗi' };
  }
};

//call api for get study calendar
export const getStudyCalendarApi = async (userid: number): Promise<{ success: boolean; data: any[] }> => {
  try {
    const response = await api.post('/auth/get-study-calendar', { userid });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu lấy lịch học:', error);
    return { success: false, data: [] };
  }
};
