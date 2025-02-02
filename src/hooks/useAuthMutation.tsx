import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { useNavigate } from "react-router";
import { message } from "antd";

interface IUser {
  fullname?: string;
  login: string;
  password: string;
}

type PropsType = {
  url: string;
  data: IUser;
};

const authRequest = async ({ url, data }: PropsType) => {
  const response = await api.post(url, data);
  return response.data;
};

export function useAuthMutation(type: string) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: IUser) => authRequest({ url: `/${type}`, data }),
    onSuccess: (data) => {
      if (type === "auths/sign-in") {
        navigate("/");
        message.success("Вы успешно вошли в систему!");
        localStorage.setItem("token", data);
      }

      if (type === "auths/sign-up") {
        navigate("/auth/login");
        message.success("Вы успешно зарегистрировались!");
      }
    },
    onError: (error) => {
      console.error(`${type} xatosi:`, error);
    },
  });
}
