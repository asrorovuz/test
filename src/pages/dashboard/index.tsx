import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import Header from "./header"
import AddCompany from "./module/add-company";
import CustomTable from "./table"
import EditCompany from "./module/edit-company";


const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [singleData, setSingleData] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const {
    data,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useApi({
    getUrl: "companies/get-all",
    postUrl: "companies/add",
    updateUrl: "companies/update",
    deleteUrl: "companies/delete",
  });

  return (
    <>
        <Header showModal={showModal}/>
        <CustomTable companies={data} isLoading={isLoading} deleteMutation={deleteMutation} setIsOpenEditModal={setIsOpenEditModal} setSingleData={setSingleData}/>

        <AddCompany createMutation={createMutation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        <EditCompany updateMutation={updateMutation} initialData={singleData} isModalOpen={isOpenEditModal} setIsModalOpen={setIsOpenEditModal}/>
    </>
  )
}

export default DashboardPage