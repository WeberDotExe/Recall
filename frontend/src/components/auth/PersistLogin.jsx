import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

function PersistLogin() {
  const { accessToken } = useAuth();
  const refreshToken = useRefreshToken();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        // If refresh fails, ProtectedRoute will handle redirect logic.
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (accessToken) {
      setIsLoading(false);
      return;
    }

    verifyRefreshToken();

    return () => {
      isMounted = false;
    };
  }, [accessToken, refreshToken]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--color-background) px-6">
        <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) px-6 py-5 text-sm text-(--color-text-secondary) shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          Restoring your session...
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default PersistLogin;