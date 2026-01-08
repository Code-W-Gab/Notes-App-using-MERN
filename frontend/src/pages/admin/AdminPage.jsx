import Header from "../../components/admin/Header";
import UserList from "../../components/admin/UserList";

export default function AdminPage({user, fetchUser}) {
  return(
    <>
      <Header/>
      <UserList user={user} fetchUser={fetchUser}/>
    </>
  )
}