import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

 

export async function getJobs() {
  try {
    const response = await api.get("/jobs");

    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw error;
  }
}

export async function getJobById(id: number) {
  try {
    const response = await api.get(`/jobs/${id}`);

    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw error;
  }
}

export async function getJobCategories() {
  try {
    const response = await api.get("/job-categories");

    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw error;
  }
}