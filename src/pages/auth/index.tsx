import { Outlet } from "react-router"

const AuthPage = () => {
  return (
    <div className="custom-bg bg-cover bg-no-repeat w-full h-screen overflow-hidden">
        <Outlet />
    </div>
  )
}

export default AuthPage