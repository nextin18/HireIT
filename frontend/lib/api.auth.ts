import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export async function registerCompany(name: string, email: string, phone_number: string, password: string, password_confirmation: string) {
  try {
    const response = await api.post('/register/company', {
      name, email, phone_number, password, password_confirmation
    })
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw error;
  }
}

export async function resigterCanditates(name: string, email: string, phone_number: string, password: string, password_confirmation: string) {
  try {
    const response = await api.post('/register/candidate', {
      name, email, phone_number, password, password_confirmation
    })
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data)
    throw error;
  }
}

export async function login(login: string, password: string) {
  try {
    const response = await api.post('/login', {
      login, password
    })
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw error;
  }
}

export async function getCurrentUser(toker: string) {
  const response = await api.get('/me', {
    headers: {
      Authorization: `Bearer ${toker}`,
      Accept: "application/json"
    }
  })
  return response.data;
}
























