import { useEffect } from "react";
import axiosInstance from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { accessToken, clearAuth } = useAuth();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (
          error?.response?.status === 401 &&
          prevRequest &&
          !prevRequest._retry
        ) {
          prevRequest._retry = true;

          try {
            const newAccessToken = await refreshToken();
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(prevRequest);
          } catch (refreshError) {
            clearAuth();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refreshToken, clearAuth]);

  return axiosInstance;
};

export default useAxiosPrivate;