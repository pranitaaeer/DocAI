import api from "./api";
import {RegisterData,LoginData} from "../types/store.type"


export const registerUser = async (
  data: RegisterData
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginData
) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw {
      response: {
        data: result,
      },
    };
  }

  return result;
};

export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};

export const getMyInfo = async () => {
  const response = await api.get(
    "/auth/me"
  );

  return response.data ;
};

export const changeAvatar = async (file: File) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.put(
    "/auth/change-avatar",
    formData
  );

  return response.data;
}


export const changePassword= async (passwords: { currentPassword: string; newPassword: string }) => {
  const response = await api.put("/auth/change-pass", passwords);
  return response.data;
};

export const googleLogin = () => {
  window.location.href =
    `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
};

export const googleCallback = async (code: string) => {
  const response = await api.get(
    `/auth/google-callback?code=${encodeURIComponent(code)}`
  );

  return response.data;
};
