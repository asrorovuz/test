import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const Header = ({showModal}: {showModal: () => void}) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className="bg-[#313131] flex justify-between items-center px-[15px] py-4 text-white">
      <h2 className="text-[14px] font-bold">Компания</h2>

      <div className="flex gap-x-4">
        <button
          onClick={logout}
          className="rotate-180 cursor-pointer transition hover:scale-110"
        >
          <LogoutOutlined />
        </button>
        <button onClick={showModal} className="cursor-pointer py-1 px-[15px] bg-[#08979C] text-[14px] font-normal rounded-[2px] transition hover:bg-[#0a5952b3]">
          Добавить компания
        </button>
      </div>
    </div>
  );
};

export default Header;
