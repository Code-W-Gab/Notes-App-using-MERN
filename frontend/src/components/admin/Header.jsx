import LogoutBtn from "../common/LogoutBtn";

export default function Header() {
  return(
    <div className="flex items-center bg-black p-4 justify-between w-full">
      <h1 className="font-bold text-xl text-white pr-10">Admin Dashboard</h1>
      <LogoutBtn/>
    </div>
  )
}