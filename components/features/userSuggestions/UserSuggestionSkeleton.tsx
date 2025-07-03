import { Skeleton } from "@/components/ui/skeleton"

export default function UserSuggestionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
        >
          <span className="w-10 h-10 mr-2 rounded-full overflow-hidden">
            <Skeleton className="w-10 h-10 rounded-full" />
          </span>
          <Skeleton className="w-40 h-10 rounded-2xl" />
        </li>
      ))}
    </>
  )
}
