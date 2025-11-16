import api from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  // api loader
  const [apiloading, setApiLoading] = useState(false);

  //   get banners
  useEffect(() => {
    const getBanners = async () => {
      try {
        setApiLoading(true);
        const res = await api.get("/banners/");
        const banners = res.data;
        setBanners(banners);
        setApiLoading(false);
        console.log("banners", banners);
      } catch {
        setApiLoading(false);
        toast.error("Failed to load banners");
      }
    };
    getBanners();
  }, []);

  //   get categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        setApiLoading(true);
        const res = await api.get("/categories/allcategories");
        const categories = res.data;
        setCategories(categories);
        setApiLoading(false);
      } catch {
        setApiLoading(false);
        toast.error("Failed to load categories");
      }
    };
    getCategories();
  }, []);
  return (
    <ApiContext.Provider value={{ categories, banners, apiloading }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
