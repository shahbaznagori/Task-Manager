import axiosInstance from './axios'
// CREATEa
export const createTask = async (data) => {
  const response = await axiosInstance.post("/tasks", data);
  return (
    response.data?.data ??
    response.data?.task ??
    response.data?.tasks ??
    response.data
  );
};

// READ ALL
export const getTasks = async () => {
  const response = await axiosInstance.get("/tasks");
  return (
    response.data?.data ??
    response.data?.tasks ??
    response.data ??
    []
  );
};

// FILTER
export const filterTasks = async ({
  status = "",
  title = "",
} = {}) => {
  const params = new URLSearchParams();

  if (status) {
    params.append("status", status);
  }

  if (title.trim()) {
    params.append("title", title.trim());
  }

  const query = params.toString();
  const response = await axiosInstance.get(
    `/tasks/filter${query ? `?${query}` : ""}`
  );
  return (
    response.data?.data ??
    response.data?.tasks ??
    response.data ??
    []
  );
};

// UPDATE
export const updateTask = async (id, data) => {
  const response = await axiosInstance.put(
    `/tasks/${id}`,
    data
  );
  return (
    response.data?.data ??
    response.data?.task ??
    response.data
  );
};

// DELETE
export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(
    `/tasks/${id}`
  );
  return response.data;
};
