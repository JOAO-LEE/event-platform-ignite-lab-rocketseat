import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning, Image } from "phosphor-react";
import { gql, useQuery } from "@apollo/client";
import '@vime/core/themes/default.css'
import { Loading } from "./Loading";
import { Lesson } from "./Lesson";

const GET_LESSON_BY_SLUG_QUERY = gql `
query GetLessonBySlug ($slug: String) {
  lesson(where: {slug: $slug}) {
    title
    videoId
    description
    teacher {
      bio
      avatarURL
      name
    }
  }
}`

interface VideoProps {
  lessonSlug: string;
}

interface GetLessonsBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    }

  }
}

export function Video(props: VideoProps) {
  const { data } = useQuery<GetLessonsBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug
    }})
    if (!data) {
      return (
        <div className="flex flex-1 justify-center items-center">
          <Loading /> 
        </div>
      )
    }
  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
                {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
           {data.lesson.description}
            </p>
            <div className="flex items-center gap-5 mt-6">
              <img 
              className="rounded-full h-20 w-20 
              border-2 border-blue-500 hover:border-green-500 hover:border
              transition-colors duration-1000"
              src={data.lesson.teacher.avatarURL}
              alt={`Foto do instrutor ${data.lesson.teacher.name}`} />
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block hover:text-green-500
              transition-colors duration-500">
                {data.lesson.teacher.name}
                </strong>
                <span className="text-gray-200
                text-sm block
               hover:text-blue-500">
                {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
          <a href="" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap 2 justify-center hover:bg-green-800 transition-colors duration-500">
            <DiscordLogo size={ 24 } />
            Comunidade do Discord
          </a>
          <a href="" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap 2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors duration-500">
            <Lightning size={ 24 } />
            Acesse o desafio!
          </a>
        </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors duration-500">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={ 40 } />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">
                Material Complementar
              </strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={ 24 } />
            </div>
          </a>
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors duration-500">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={ 40 } />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">
              Wallpapers exclusivos
              </strong>
              <p className="text-sm text-gray-200 mt-2">
              Baixe wallpapers exclusivos do Ignite Lab e personalize a sua m??quina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
            <CaretRight size={ 24 } />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}