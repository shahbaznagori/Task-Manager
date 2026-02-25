import axiosInstance from "./axios";

export const registerUser = async (data) => {
  try {
  const response = await axiosInstance.post("/auth/register", data);
    localStorage.setItem("token", response.data.token);

  return response.data;
} catch (error) {
   console.log("ERROR", error.response?.data?.message || "Something went wrong");
   throw error;
}
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.log("ERROR", error.response?.data?.message || "Something went wrong");
    throw error;
  }
};
