import { useMemo, useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

import verifyAuth from "helpers/verify_sid";

import { Loader } from '@mantine/core';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

  const { token } = useAuth();

  const [verifying, setVerifying] = useState(true);
  const [verifiedToken, setVerifiedToken] = useState(false);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useMemo(async () => {
    const res = await verifyAuth(token);

    if (typeof res.data === 'string') {
      setVerifiedToken(true);
      setVerifying(false);

      return;
    }

    setVerifiedToken(false);
    setVerifying(false);

  }, [token])

  return (
    verifying ?
      <div className="grid content-center w-screen h-screen justify-center">
        <div className="flex justify-center items-center flex-col">
          <Loader />
          <span>verifing please wait...</span>
        </div>
      </div>
      : verifiedToken ? children : <Navigate to="/login" replace />
  )
}
