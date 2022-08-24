import React, { useState } from "react";
import "./Login.scss";

import shanlogo from "assets/images/SHAN Logo 2020.png";
import { Lock } from "tabler-icons-react";

import login from "helpers/login";
import { useAuth } from "hooks/useAuth";
import { userTypes } from "types/userTypes";

import { c_encrypt } from "utils/encryption";
import bcrypt from "bcryptjs";

import { Loader } from '@mantine/core';

const Login = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("something wrong, try again later.")
  const [loading, setLoading] = useState<boolean>(false);

  const { authUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const loginRes = await login({
      username,
      password,
    });

    if (loginRes.error.message) {
      setError(true);
      setLoading(false);
      return
    } else if (loginRes.data.authPassed === 0) {
      setErrorMessage('Credential wrong, please check and try again.')
      setError(true)
      setLoading(false)
      return
    }

    const encrypted_sid = c_encrypt(loginRes.data.sid, import.meta.env.VITE_GENKEY_TOKEN);
    const hash_sid = bcrypt.hashSync(loginRes.data.sid, 10);

    const user: userTypes = {
      username: username,
      sid: loginRes.data.sid,
      admingroup: loginRes.data.admingroup
    }

    const userToken = c_encrypt(JSON.stringify(user), loginRes.data.sid);

    authUser(hash_sid, encrypted_sid, userToken);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex h-screen justify-center items-center">
        <div className="max-w-md space-y-8 w-full px-3">
          <img className="mx-auto h-40 w-auto" src={shanlogo} alt="SHAN's logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            SHAN Cloud
          </h2>
          <div className="mt-6">
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="user-name" className="sr-only">
                    User Name
                  </label>
                  <input
                    id="user-name"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white"
                    placeholder="User Name"
                    onChange={(e) => setUserName(e.target.value)}
                    onFocus={() => setError(false)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setError(false)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-600"
                  disabled={loading}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {loading ? <Loader className="h-5 w-5" color="white" />
                      : <Lock
                        className="h-5 w-5 text-white-500 group-hover:text-white-400"
                        aria-hidden="true"
                      />
                    }
                  </span>
                  Sign in
                </button>
              </div>
              <div className="text-sm">
                {error && (
                  <label
                    htmlFor="error"
                    className="ml-2 block text-sm text-red-600 flex justify-end"
                  >
                    {errorMessage}
                  </label>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex justify-center hidden md:block">
        <img
          className="object-fill w-full h-screen"
          src="https://i.pinimg.com/564x/19/6c/aa/196caad2920ab5c375bd44afe2adde39.jpg"
          alt="cloud"
        />
      </div>
    </div>
  );
}

export default Login;
