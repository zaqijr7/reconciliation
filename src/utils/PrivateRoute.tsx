import React, { useEffect } from "react";
import { useRootState } from "../app/RootContext";
import { usePathname, useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const { session } = useRootState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!session?.token) {
      router.push("/authentication/login");
    }
  }, [session?.token, pathname]);

  return <>{children}</>;
};

export default PrivateRoute;
