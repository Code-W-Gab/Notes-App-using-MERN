export default function Divider() {
  return(
    <div className="divider flex items-center gap-4 my-4">
      <hr className="flex-1 border-gray-400" />
      <span className="text-gray-500 text-sm">or</span>
      <hr className="flex-1 border-gray-400" />
    </div>
  )
}