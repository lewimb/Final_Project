"use client";

import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export type UserSession = {
  username: string;
  fullname: string;
  profilepic: string;
} | null;

export type AuthPayload = {
  username: string;
  password: string;
};

export type UpdatePayload = {
  fullname: string;
  profilepic: string;
};

export const AuthContext = createContext<{
  userSession: UserSession;
  login: (payload: AuthPayload) => Promise<void>;
  register: (payload: AuthPayload) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
  updateAccount: (payload: UpdatePayload) => Promise<void>;
}>({
  userSession: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  deleteAccount: async () => {},
  updateAccount: async () => {},
});

export async function fetchUserProfile(username: string): Promise<UserSession> {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("User is not logged in");

  const res = await fetch(`http://localhost:8080/users/${username}/profile`, {
    headers: {
      Authorization: accessToken,
    },
  });

  if (!res.ok) throw new Error("failed to fetch user profile");

  const data = await res.json();

  return data.data.profile;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userSession, setUserSession] = useState<UserSession>(null);

  function handleSubmission(
    payload: AuthPayload,
    endpoint: "login" | "register",
  ): Promise<void> {
    return fetch("http://localhost:8080/users/" + endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login error. Please try again");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.data.accessToken);
        setUserSession({ username: payload.username, ...data.data.profile });
      });
  }

  function login(payload: AuthPayload): Promise<void> {
    return handleSubmission(payload, "login");
  }

  function register(payload: AuthPayload): Promise<void> {
    return handleSubmission(payload, "register");
  }

  function logout(): void {
    localStorage.removeItem("access_token");
    setUserSession(null);
  }

  function deleteAccount() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("User is not logged in");

    return fetch(`http://localhost:8080/users/${userSession?.username}`, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
      },
    }).then(() => {
      setUserSession(null);
    });
  }

  function updateAccount(payload: UpdatePayload) {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("User is not logged in");

    return fetch(
      `http://localhost:8080/users/${userSession?.username}/profile`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setUserSession({ ...userSession, ...data.data.profile });
      });
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      const { username } = jwtDecode<{ username: string }>(accessToken);

      fetchUserProfile(username)
        .then((userProfile) => setUserSession({ ...userProfile!, username }))
        .catch((err) => console.log(err));
    } else {
      setUserSession(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userSession,
        login,
        register,
        logout,
        deleteAccount,
        updateAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
