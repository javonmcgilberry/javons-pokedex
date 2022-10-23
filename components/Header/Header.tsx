import Image from 'next/image'

const Header = ({ render }: { render: () => React.ReactNode }) => {
  return (
    <div className="fixed flex w-full items-center justify-between bg-white p-4">
      <div>
        <Image
          src="/pokemon_logo.svg"
          alt="pokemon-logo"
          width={120}
          height={60}
        />
      </div>
      {render()}
    </div>
  )
}

export default Header
