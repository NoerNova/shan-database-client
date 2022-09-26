import React, { useMemo, useState } from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

import verifyAuth from "helpers/verify_sid";
import { c_dcrypt } from 'utils/encryption';
import bcrypt from "bcryptjs";

import { useRecoilState } from 'recoil';
import { userState } from "recoil-state/state";
import { userTypes } from 'types/userTypes';

import { Loader } from '@mantine/core';
import NavBar from '@components/NabBar/NavBar';

type ProtectedProps = {
  children?: React.ReactNode;
}
export const ProtectedRoute = (props: ProtectedProps) => {

  const { token, credential, user } = useAuth();
  const outlet = useOutlet();

  if (!token || !credential || !user) {
    return <Navigate to="/login" replace />;
  }

  const [verifying, setVerifying] = useState(true);
  const [verifiedToken, setVerifiedToken] = useState(false);

  const decrypted_sid = c_dcrypt(credential, import.meta.env.VITE_GENKEY_TOKEN);

  const hash_sid = bcrypt.compareSync(decrypted_sid, token);

  const [user_state, setUserState] = useRecoilState<userTypes>(userState);

  if (!hash_sid) {
    return <Navigate to="/login" replace />;
  }

  useMemo(async () => {
    const res = await verifyAuth(decrypted_sid);

    if (typeof res.data === 'string') {
      setVerifiedToken(true);
      setVerifying(false);

      const decrypted_user = c_dcrypt(user, decrypted_sid);

      setUserState(JSON.parse(decrypted_user))

      return;
    }

    setVerifiedToken(false);
    setVerifying(false);

  }, [token, credential, user])

  const RenderLoading = () => (
    <div className="grid content-center w-screen h-screen justify-center">
      <div className="flex justify-center items-center flex-col">
        <Loader />
        <span>verifying please wait...</span>
      </div>
    </div>
  )

  return (
    verifying ?
      <RenderLoading />
      : verifiedToken ?
        <div>
          <NavBar />
          {outlet}
        </div>
        : <Navigate to="/login" replace />
  )
}
