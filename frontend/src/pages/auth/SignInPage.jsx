import LoginForm from "../../components/auth/LoginForm";

export default function SignInPage({fetchNotes}) {
  return(
    <>
      <LoginForm fetchNotes={fetchNotes}/>
    </>
  )
}