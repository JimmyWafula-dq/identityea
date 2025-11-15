import api from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  //   get categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await api.get("/categories/allcategories");
        const categories = res.data;
        setCategories(categories);
      } catch {
        toast.error("Failed to load categories");
      }
    };
    getCategories();
  }, []);
  return (
    <ApiContext.Provider value={{ categories }}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
