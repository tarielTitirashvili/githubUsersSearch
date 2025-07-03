import { UserX } from "lucide-react"

export default function UserSuggestionsEmpty() {
  return (
    <li className="p-2 cursor-pointer flex flex-col justify-center items-center h-[60vh] max-h-[300px]">
      <UserX />
      No users found
    </li>
  )
}
