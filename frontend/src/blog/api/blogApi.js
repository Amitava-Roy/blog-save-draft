import api from "../../config/axiosConfig";

export const getAllBlogs = async () => {
  try {
    const response = await api.get("/api/blogs");

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all blogs:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching blog with ID ${id}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateBlog = async (blogData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.post("/api/blogs/publish", blogData, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error updating blog:",
      error.response ? error.response.data : error.message
    );

    throw error;
  }
};

export const publishBlog = async (blogData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.post("/api/blogs/publish", blogData, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error publishing blog:",
      error.response ? error.response.data : error.message
    );

    throw error;
  }
};

// New API function for saving blog drafts
export const saveBlogDraft = async (blogData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.post("/api/blogs/save-draft", blogData, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error saving blog draft:",
      error.response ? error.response.data : error.message
    );

    throw error;
  }
};
