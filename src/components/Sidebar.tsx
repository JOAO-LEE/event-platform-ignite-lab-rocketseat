import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";

const GET_LESSONS_QUERY = gql `
query MyQuery {
  lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
    id
    lessonType
    slug
    availableAt
    title
  }
}
`
interface GetLessonsQueryResponse {
  lessons: {
    id: string;
    lessonType: 'live' | 'class';
    slug: string;
    title: string;
    availableAt: string;
  }[]
}

export function Sidebar() {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)
  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-1 border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>
      <div className="flex flex-col gap-8">
       {data?.lessons.map((lessons) => {
        return (
         <Lesson
         key={lessons.id}
         availableAt={new Date(lessons.availableAt)}
         title={lessons.title}
         slug={lessons.slug}
         type={lessons.lessonType} 
         />
         )})}
      </div>
    </aside>
  )
}