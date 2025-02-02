import { ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import { useState } from "react";

interface DataType {
  id: string;
  name: string;
  count: number;
}

type PropsType = {
  companies: Partial<DataType>[] | undefined;
  isLoading: boolean;
  deleteMutation: any;
  setIsOpenEditModal: (isOpenEditModal: boolean) => void;
  setSingleData: (singleData: DataType) => void;
};

const CustomTable = ({
  companies,
  isLoading,
  deleteMutation,
  setIsOpenEditModal,
  setSingleData,
}: PropsType) => {
  const [visableAction, setVisableAction] = useState<string | null>(null);

  const deleteItem = (id: string) => {
    visableAction && setVisableAction(null);
    deleteMutation.mutate(id);
  };

  const editItem = (data: DataType) => {
    setSingleData(data);
    setIsOpenEditModal(true);
    setVisableAction(null);
  }

  const columns = [
    {
      title: "Названия компании",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Количество сотрудников",
      dataIndex: "count",
      key: "count",
      render: (count: number) => <span>{count} человек</span>,
    },
    {
      dataIndex: "action",
      key: "action",
      render: (_: any, record: DataType) => (
        <div className="relative">
          <button
            className={`cursor-pointer flex items-center justify-center hover:bg-gray-400 rounded-full w-10 h-10 ${
              visableAction === record?.id && "bg-gray-400"
            }`}
            onClick={() => setVisableAction(record?.id ? record?.id : null)}
          >
            <MoreOutlined />
          </button>

          {visableAction === record?.id && (
            <div className="w-[132px] z-20 bg-white border border-[#d9d9d9] rounded-lg absolute top-10 right-2">
              <button
                onClick={() => editItem(record)}
                className="py-2.5 pl-4 text-[14px] font-normal cursor-pointer transition hover:text-[#08979Cb3]"
              >
                Изменить
              </button>
              <Popconfirm
                title="Вы хотите удалить?"
                okText="Да"
                okType="danger"
                cancelText="Нет"
                icon={
                  <span className="text-[#fa2424]">
                    <ExclamationCircleOutlined />
                  </span>
                }
                onConfirm={() => deleteItem(record?.id)}
              >
                <button className="py-2.5 pl-4 text-[14px] font-normal text-[#fa2424] cursor-pointer transition hover:text-[#fa2424b3]">
                  Удалить
                </button>
              </Popconfirm>
            </div>
          )}
        </div>
      ),
      width: 50,
    },
  ];

  return (
    <div className="p-[15px] ">
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={companies as readonly DataType[]}
        pagination={{
          pageSize: 10,
          total: companies?.length,
        }}
      />
    </div>
  );
};

export default CustomTable;
