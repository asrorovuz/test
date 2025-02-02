import { Modal } from "antd";
import CustomForm from "../../form";

type DataType = {
  id: string;
  name: string;
  count: number;
};

type PropsTypeEdit = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  initialData?: Partial<DataType>;
  updateMutation: any;
};

const EditCompany = ({
  isModalOpen,
  setIsModalOpen,
  updateMutation,
  initialData
}: PropsTypeEdit) => {
  // ✅ To‘g‘ri update funksiyasi
  const editData = (data: { name: string; count: number }) => {
    if (!initialData?.id) return; // ID mavjudligini tekshiramiz
    updateMutation.mutate({
      updatedData: { id: initialData.id, ...data }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      style={{ padding: 0 }}
      title={
        <h3 className="text-xl font-bold px-6 py-4 border-b border-[#d9d9d9]">
          Редактировать компания
        </h3>
      }
      onCancel={handleCancel}
      footer={null}
    >
      <CustomForm
        type="update"
        openModal={isModalOpen}
        onSubmitFunc={editData}
        initialData={initialData}
        setIsModalOpen={setIsModalOpen}
        btnTitle="Редактировать компания"
      />
    </Modal>
  );
};

export default EditCompany;
