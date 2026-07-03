import { useCallback } from "react";
import { refresh } from "../api/auth.api";
import useAuth from "./UseAuth";

const useRefreshToken = () => {
  const { setAuth, user } = useAuth();

  const refreshToken = useCallback(async () => {
    const data = await refresh();

    setAuth({
      user,
      accessToken: data.accessToken,
    });

    return data.accessToken;
  }, [setAuth, user]);

  return refreshToken;
};

export default useRefreshToken;