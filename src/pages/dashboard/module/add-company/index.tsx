import { Modal } from "antd";
import CustomForm from "../../form";

type PropsTypeAdd = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  createMutation: any;
};

const AddCompany = ({
  isModalOpen,
  setIsModalOpen,
  createMutation,
}: PropsTypeAdd) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addData = (data: { name: string; count: number }) => {
    createMutation.mutate(data);
  };

  return (
    <Modal
      open={isModalOpen}
      style={{ padding: 0 }}
      title={
        <h3 className="text-xl font-bold px-6 py-4 border-b border-[#d9d9d9]">
          Добавить компания
        </h3>
      }
      onCancel={handleCancel}
      footer={null}
    >
      <CustomForm
        type="add"
        openModal={isModalOpen}
        onSubmitFunc={addData}
        initialData={{}}
        setIsModalOpen={setIsModalOpen}
        btnTitle="Добавить компания"
      />
    </Modal>
  );
};

export default AddCompany;
