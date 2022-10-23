import { useGetAllPokemonQuery } from '@pokedex/generated/graphql-hooks'
import { useState, useEffect } from 'react'

const Header = () => {
  return <div>fdafs</div>
}
export default function Home() {
  const [offset, setOffset] = useState(0)
  const { data, refetch } = useGetAllPokemonQuery({ offset, limit: 20 })
  console.log('DATA', data?.allPokemon)

  useEffect(() => {
    console.log('DATA', data)
  }, [data])
  return (
    <div className="bg-white py-12">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold text-red-500">Good Morning</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-blue-800 sm:text-4xl">
            Welcome to KindaCode.com
          </p>
        </div>

        <div className="mt-10 space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
          <div className="cursor-pointer rounded-md bg-amber-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>

          <div className="cursor-pointer rounded-md bg-red-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>

          <div className="cursor-pointer rounded-md bg-green-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>

          <div className="cursor-pointer rounded-md bg-purple-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>
        </div>
      </div>
    </div>
  )
}
