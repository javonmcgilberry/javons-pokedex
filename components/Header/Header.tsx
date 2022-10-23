import Image from 'next/image'

const Header = ({ render }: { render: () => React.ReactNode }) => {
  return (
    <div className="fixed flex w-full items-center justify-between p-4">
      <div
        className={`mx-auto flex  w-full max-w-7xl justify-between px-4 sm:px-6 lg:px-8`}
      >
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
    </div>
  )
}

export default Header
