import { createContext, useEffect, useState } from "react";

const AppContext = createContext();
export default AppContext;

export const AppProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [admin, setAdmin] = useState({});
    const getAdmin = async()=>{
        try {
            const response = await fetch(`${backendUrl}/api/admin`);
            const data = await response.json();
            return data[0];
        } catch (error) {
            console.log(error);
        }
    }
  const loginAdmin = async (email, password) => {
    try {
      const response = await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getBlogs = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/blogs?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };


  const getBlogById = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/blog/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };

  const addBlog = async (blogData) => {
    try {
      const response = await fetch(`${backendUrl}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };

  const updateBlog = async (id, blogData) => {
    try {
      const response = await fetch(`${backendUrl}/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/blog/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };

  return (
    <AppContext.Provider
      value={{
        loginAdmin,
        getBlogs,
        getBlogById,
        addBlog,
        updateBlog,
        deleteBlog,
        getAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};