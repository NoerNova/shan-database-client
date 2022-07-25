import React, { useState } from "react";
import "./Login.scss";

import shanlogo from "../../assets/images/SHAN Logo 2020.png";
import { Lock } from "tabler-icons-react";

interface userTokenProps {
  token: string;
}

interface setTokenProps {
  (userToken: userTokenProps): void;
}

export default function Login({ setToken }: { setToken: setTokenProps }) {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const token = await loginUser({
    //   username,
    //   password
    // });
    const token: userTokenProps = { token: "1234" };
    setToken(token);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex h-screen justify-center items-center">
        <div className="max-w-md space-y-8 w-full px-3">
          <img className="mx-auto h-40 w-auto" src={shanlogo} alt="Workflow" />
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
              <input type="hidden" name="remember" defaultValue="true" />
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
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Lock
                      className="h-5 w-5 text-white-500 group-hover:text-white-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
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
