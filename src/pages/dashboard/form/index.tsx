import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the form inputs interface
interface FormInputs {
  name: string;
  count: number;
}

type PropsTypeForm = {
  btnTitle: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
  initialData?: Partial<FormInputs & { id: string }>; // ID ham bo‘lishi mumkin
  onSubmitFunc: (data: FormInputs, id?: string) => void;
  openModal: boolean;
  type?: string;
};

const CustomForm: React.FC<PropsTypeForm> = ({
  btnTitle,
  setIsModalOpen,
  initialData,
  onSubmitFunc,
  openModal,
  type,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsModalOpen(false);
    if (type === "add") {
      return onSubmitFunc(data);
    }
    if (type === "update" && initialData?.id) {
      return onSubmitFunc(data, initialData.id);
    }
  };

  useEffect(() => {
    if (openModal) {
      if (type === "update" && initialData) {
        reset(initialData); // Faqat `update` bo‘lsa, `initialData` bilan reset qilamiz
      } else {
        reset({ name: "", count: 0 }); // `add` bo‘lsa, bo‘sh qiymatlar
      }
    }
  }, [initialData, reset, openModal, type]);

  return (
    <form className="w-full px-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Названия компании */}
      <div className="pt-6 mb-5 flex justify-between items-center">
        <label htmlFor="name" className="text-[14px] font-normal">
          Названия компании
        </label>
        <div className="w-[274px]">
          <input
            className={`${
              errors.name ? "border-red-500" : ""
            } w-full border outline-0 border-[#d9d9d9] rounded-sm py-[5px] px-4 text-[14px] font-normal`}
            type="text"
            id="name"
            placeholder="Введите название"
            {...register("name", {
              required: "Поле обязательно для заполнения",
            })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
      </div>

      {/* Количество сотрудников */}
      <div className="pb-9 flex justify-between items-center border-b border-[#d9d9d9]">
        <label htmlFor="count" className="text-[14px] font-normal">
          Количество сотрудников
        </label>
        <div className="w-[274px]">
          <input
            className={`${
              errors.count ? "border-red-500" : ""
            } w-full border outline-0 border-[#d9d9d9] rounded-sm py-[5px] px-4 text-[14px] font-normal`}
            type="number"
            id="count"
            placeholder="Введите количество"
            {...register("count", {
              required: "Поле обязательно для заполнения",
              min: { value: 1, message: "Введите положительное число" },
            })}
          />
          {errors.count && <p className="text-red-500 text-sm">{errors.count.message}</p>}
        </div>
      </div>

      <div className="flex justify-center py-2.5">
        <button
          type="submit"
          className="py-[5px] px-4 w-max bg-[#1890FF] hover:bg-[#18a0ff]/80 text-white rounded-[2px] cursor-pointer"
        >
          {btnTitle}
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
