import { render, screen, fireEvent } from '@testing-library/react'
import PokemonSpotlight from './PokemonSpotlight'

describe('<PokemonSpotlight />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const mockWindowScroll = jest.fn()
  window.scrollTo = mockWindowScroll
  const mockPrev = jest.fn()
  const mockNext = jest.fn()
  const mockHandleSetActivePokemon = jest.fn()
  const mockProps = {
    pokemon: {
      id: '1',
      sprites: {
        other: {
          home: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
          },
          official_artwork: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          },
        },
      },
      species: {
        base_happiness: 50,
        capture_rate: 45,
        genera: [
          {
            genus: 'たねポケモン',
            language: {
              name: 'ja-Hrkt',
            },
          },
          {
            genus: '씨앗포켓몬',
            language: {
              name: 'ko',
            },
          },
          {
            genus: '種子寶可夢',
            language: {
              name: 'zh-Hant',
            },
          },
          {
            genus: 'Pokémon Graine',
            language: {
              name: 'fr',
            },
          },
          {
            genus: 'Samen-Pokémon',
            language: {
              name: 'de',
            },
          },
          {
            genus: 'Pokémon Semilla',
            language: {
              name: 'es',
            },
          },
          {
            genus: 'Pokémon Seme',
            language: {
              name: 'it',
            },
          },
          {
            genus: 'Seed Pokémon',
            language: {
              name: 'en',
            },
          },
          {
            genus: 'たねポケモン',
            language: {
              name: 'ja',
            },
          },
          {
            genus: '种子宝可梦',
            language: {
              name: 'zh-Hans',
            },
          },
        ],
        evolution_chain: {
          is_baby: false,
          species: {
            name: 'bulbasaur',
            id: '1',
            sprites: {
              other: {
                official_artwork: {
                  front_default:
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
                },
              },
            },
          },
          evolves_to: [
            {
              species: {
                name: 'ivysaur',
                id: '2',
                sprites: {
                  other: {
                    official_artwork: {
                      front_default:
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
                    },
                  },
                },
              },
              evolves_to: [
                {
                  species: {
                    name: 'venusaur',
                    id: '3',
                    sprites: {
                      other: {
                        official_artwork: {
                          front_default:
                            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
                        },
                      },
                    },
                  },
                  evolves_to: [],
                },
              ],
            },
          ],
        },
      },
      name: 'bulbasaur',
      base_experience: 64,
      height: 7,
      weight: 69,
      abilities: [
        {
          is_hidden: false,
          slot: 1,
          ability: {
            name: 'overgrow',
          },
        },
        {
          is_hidden: true,
          slot: 3,
          ability: {
            name: 'chlorophyll',
          },
        },
      ],
      moves: [
        {
          move: {
            name: 'razor-wind',
            power: 80,
            pp: 10,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'swords-dance',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'cut',
            power: 50,
            pp: 30,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'bind',
            power: 15,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'vine-whip',
            power: 45,
            pp: 25,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'headbutt',
            power: 70,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'tackle',
            power: 40,
            pp: 35,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'body-slam',
            power: 85,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'take-down',
            power: 90,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'double-edge',
            power: 120,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'growl',
            power: null,
            pp: 40,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'strength',
            power: 80,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'mega-drain',
            power: 40,
            pp: 15,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'leech-seed',
            power: null,
            pp: 10,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'growth',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'razor-leaf',
            power: 55,
            pp: 25,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'solar-beam',
            power: 120,
            pp: 10,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'poison-powder',
            power: null,
            pp: 35,
            priority: 0,
            type: {
              name: 'poison',
            },
          },
        },
        {
          move: {
            name: 'sleep-powder',
            power: null,
            pp: 15,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'petal-dance',
            power: 120,
            pp: 10,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'string-shot',
            power: null,
            pp: 40,
            priority: 0,
            type: {
              name: 'bug',
            },
          },
        },
        {
          move: {
            name: 'toxic',
            power: null,
            pp: 10,
            priority: 0,
            type: {
              name: 'poison',
            },
          },
        },
        {
          move: {
            name: 'rage',
            power: 20,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'mimic',
            power: null,
            pp: 10,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'double-team',
            power: null,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'defense-curl',
            power: null,
            pp: 40,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'light-screen',
            power: null,
            pp: 30,
            priority: 0,
            type: {
              name: 'psychic',
            },
          },
        },
        {
          move: {
            name: 'reflect',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'psychic',
            },
          },
        },
        {
          move: {
            name: 'bide',
            power: null,
            pp: 10,
            priority: 1,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'sludge',
            power: 65,
            pp: 20,
            priority: 0,
            type: {
              name: 'poison',
            },
          },
        },
        {
          move: {
            name: 'skull-bash',
            power: 130,
            pp: 10,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'amnesia',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'psychic',
            },
          },
        },
        {
          move: {
            name: 'flash',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'rest',
            power: null,
            pp: 10,
            priority: 0,
            type: {
              name: 'psychic',
            },
          },
        },
        {
          move: {
            name: 'substitute',
            power: null,
            pp: 10,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'snore',
            power: 50,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'curse',
            power: null,
            pp: 10,
            priority: 0,
            type: {
              name: 'ghost',
            },
          },
        },
        {
          move: {
            name: 'protect',
            power: null,
            pp: 10,
            priority: 4,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'sludge-bomb',
            power: 90,
            pp: 10,
            priority: 0,
            type: {
              name: 'poison',
            },
          },
        },
        {
          move: {
            name: 'mud-slap',
            power: 20,
            pp: 10,
            priority: 0,
            type: {
              name: 'ground',
            },
          },
        },
        {
          move: {
            name: 'outrage',
            power: 120,
            pp: 10,
            priority: 0,
            type: {
              name: 'dragon',
            },
          },
        },
        {
          move: {
            name: 'giga-drain',
            power: 75,
            pp: 10,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'endure',
            power: null,
            pp: 10,
            priority: 4,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'charm',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'fairy',
            },
          },
        },
        {
          move: {
            name: 'false-swipe',
            power: 40,
            pp: 40,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'swagger',
            power: null,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'fury-cutter',
            power: 40,
            pp: 20,
            priority: 0,
            type: {
              name: 'bug',
            },
          },
        },
        {
          move: {
            name: 'attract',
            power: null,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'sleep-talk',
            power: null,
            pp: 10,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'return',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'frustration',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'safeguard',
            power: null,
            pp: 25,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'sweet-scent',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'synthesis',
            power: null,
            pp: 5,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'hidden-power',
            power: 60,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'sunny-day',
            power: null,
            pp: 5,
            priority: 0,
            type: {
              name: 'fire',
            },
          },
        },
        {
          move: {
            name: 'rock-smash',
            power: 40,
            pp: 15,
            priority: 0,
            type: {
              name: 'fighting',
            },
          },
        },
        {
          move: {
            name: 'facade',
            power: 70,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'nature-power',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'helping-hand',
            power: null,
            pp: 20,
            priority: 5,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'ingrain',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'knock-off',
            power: 65,
            pp: 20,
            priority: 0,
            type: {
              name: 'dark',
            },
          },
        },
        {
          move: {
            name: 'secret-power',
            power: 70,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'weather-ball',
            power: 50,
            pp: 10,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'grass-whistle',
            power: null,
            pp: 15,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'bullet-seed',
            power: 25,
            pp: 30,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'magical-leaf',
            power: 60,
            pp: 20,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'natural-gift',
            power: null,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'worry-seed',
            power: null,
            pp: 10,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'seed-bomb',
            power: 80,
            pp: 15,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'energy-ball',
            power: 90,
            pp: 10,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'leaf-storm',
            power: 130,
            pp: 5,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'power-whip',
            power: 120,
            pp: 10,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'captivate',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'grass-knot',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'venoshock',
            power: 65,
            pp: 10,
            priority: 0,
            type: {
              name: 'poison',
            },
          },
        },
        {
          move: {
            name: 'round',
            power: 60,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'echoed-voice',
            power: 40,
            pp: 15,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'grass-pledge',
            power: 80,
            pp: 10,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'work-up',
            power: null,
            pp: 30,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'grassy-terrain',
            power: null,
            pp: 10,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
        {
          move: {
            name: 'confide',
            power: null,
            pp: 20,
            priority: 0,
            type: {
              name: 'normal',
            },
          },
        },
        {
          move: {
            name: 'grassy-glide',
            power: 70,
            pp: 20,
            priority: 0,
            type: {
              name: 'grass',
            },
          },
        },
      ],
      stats: [
        {
          base_stat: 45,
          stat: {
            name: 'hp',
          },
        },
        {
          base_stat: 49,
          stat: {
            name: 'attack',
          },
        },
        {
          base_stat: 49,
          stat: {
            name: 'defense',
          },
        },
        {
          base_stat: 65,
          stat: {
            name: 'special-attack',
          },
        },
        {
          base_stat: 65,
          stat: {
            name: 'special-defense',
          },
        },
        {
          base_stat: 45,
          stat: {
            name: 'speed',
          },
        },
      ],
      types: [
        {
          type: {
            name: 'grass',
          },
        },
        {
          type: {
            name: 'poison',
          },
        },
      ],
    },
    handlePagination: { next: mockNext, prev: mockPrev },
    isLoading: false,
    handleSetActivePokemon: mockHandleSetActivePokemon,
  }

  it('displays pokemon details if not loading', async () => {
    render(<PokemonSpotlight {...mockProps} isLoading={false} />)
    expect(
      await screen.queryByRole('heading', { name: 'bulbasaur' })
    ).toBeInTheDocument()
    expect(
      await screen.queryByRole('heading', { name: '#1' })
    ).toBeInTheDocument()
  })

  it('does not display pokemon details if loading', async () => {
    render(<PokemonSpotlight {...mockProps} isLoading={true} />)
    expect(
      await screen.queryByRole('heading', { name: 'bulbasaur' })
    ).not.toBeInTheDocument()
    expect(
      await screen.queryByRole('heading', { name: '#1' })
    ).not.toBeInTheDocument()
  })

  it('allows user to click on pokemon in evolution chain', async () => {
    render(<PokemonSpotlight {...mockProps} />)
    expect(await screen.queryByAltText('bulbasaur')).toBeInTheDocument()
    fireEvent.click(screen.getByAltText('bulbasaur'))
    expect(screen.getByRole('heading', { name: '#1' })).toBeInTheDocument()
  })
  it('allows user to click to view next pokemon', async () => {
    render(<PokemonSpotlight {...mockProps} />)
    expect(screen.getByRole('img', { name: 'right-arrow' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('img', { name: 'right-arrow' }))
    expect(mockProps.handlePagination.next).toHaveBeenCalled()
  })
  it('allows user to click to view previous pokemon', async () => {
    render(<PokemonSpotlight {...mockProps} />)
    expect(screen.getByRole('img', { name: 'left-arrow' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('img', { name: 'left-arrow' }))
    expect(mockProps.handlePagination.prev).toHaveBeenCalled()
  })
})
