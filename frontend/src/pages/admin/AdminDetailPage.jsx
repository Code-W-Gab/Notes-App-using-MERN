import UserEditForm from '../../components/admin/UserEditForm'

export default function AdminDetailPage({fetchUser}) {
  return(
    <div>
      <UserEditForm fetchUser={fetchUser}/>
    </div>
  )
}