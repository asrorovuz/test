import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthMutation } from "../../../hooks/useAuthMutation";
import { Link } from "react-router";

type FormValues = {
  fullname: string;
  login: string;
  password: string;
};

const RegisterPage = () => {
  const loginMutation = useAuthMutation("auths/sign-up");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // Formani yuborish funksiyasi
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black/60">
      <div className="w-[462px] bg-white pt-6">
        <h2 className="font-bold text-4xl mb-5 px-6">Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 pt-0 pb-[7px]">
            <div className="mb-5">
              <label className="font-normal text-[14px] block" htmlFor="fullname">
                Ф.И.О
              </label>
              <input
                id="fullname"
                className="rounded-[2px] border outline-0 border-[#d9d9d9] py-[5px] px-3 text-[14px] font-normal w-full"
                {...register("fullname", { required: "Ф.И.О обязателен" })}
                placeholder="Введите Ф.И.О"
              />
              <p className="text-red-500">{errors.fullname?.message}</p>
            </div>

            <div className="mb-5">
              <label className="font-normal text-[14px] block" htmlFor="login">
                Логин
              </label>
              <input
                id="login"
                className="rounded-[2px] border outline-0 border-[#d9d9d9] py-[5px] px-3 text-[14px] font-normal w-full"
                {...register("login", { required: "Логин обязателен" })}
                placeholder="Введите логин"
              />
              <p className="text-red-500">{errors.login?.message}</p>
            </div>

            <div className="mb-5">
              <label
                className="font-normal text-[14px] block"
                htmlFor="password"
              >
                Пароль
              </label>
              <input
                id="password"
                className="rounded-[2px] border outline-0 border-[#d9d9d9] py-[5px] px-3 text-[14px] font-normal w-full"
                {...register("password", { required: "Пароль обязателен" })}
                type="password"
                placeholder="Введите пароль"
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>

            <Link
              className="text-[#1890FF] text-[14px] font-normal block"
              to="/auth/login"
            >
              Вход
            </Link>
          </div>

          <div className="flex justify-center border-t border-[#d9d9d9] py-2.5">
            <button
              className="text-white bg-[#7CB305] rounded-[2px] py-[4px] px-[15px] text-[14px] cursor-pointer transition active:bg-[#7CB305] hover:bg-[#6aae0c]"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation?.isPending ? "Загрузка..." : "Регистрировать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
