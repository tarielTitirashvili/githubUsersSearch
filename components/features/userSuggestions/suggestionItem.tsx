import { GitHubUser } from '@/API'
import CustomAvatar from '@/components/shared/avatar'

type Props = {
  user: GitHubUser
  onSelect: (username: string) => void
}

export default function UserSuggestionItem({ user, onSelect }: Props) {
  return (
    <li
      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
      onClick={() => onSelect(user.login)}
    >
      <span className="mr-2 overflow-hidden">
        <CustomAvatar src={user.avatar_url} alt='Profile Picture' fallback={`avatar picture for ${user.login}`} />
      </span>
      {user.login}
    </li>
  )
}
