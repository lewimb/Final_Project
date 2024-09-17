"use client";

import { createContext, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";

export type AuthUser = {
  username: string;
  fullname: string;
  profPic: string;
} | null;

export const AuthContext = createContext<{
  authUser: AuthUser;
  setAuthUser: (authUser: AuthUser) => void;
}>({
  authUser: null,
  setAuthUser: () => {},
});

export async function fetchUserProfile(id: string) {
  const res = await fetch(`http;//localhost:8080/${id}/profile`);

  if (!res.ok) throw new Error("failed to fetch user profile");

  const data = await res.json();
  return data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser>(null);
  const cookies = useCookies();

  const accessToken = cookies.get("access_token");

  useEffect(() => {
    if (accessToken) {
      const { userId } = jwtDecode<{ userId: string }>(accessToken);

      fetchUserProfile(userId)
        .then((userProfile) => setAuthUser(userProfile))
        .catch((err) => console.log(err));
    } else {
      setAuthUser(null);
    }
  }, [cookies]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
