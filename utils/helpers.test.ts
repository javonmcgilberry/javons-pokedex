import { getSearchResults, isActive, isNotActive } from './helpers'

describe('helper fn tests', () => {
  it('gets search results', () => {
    const result = getSearchResults(
      [
        {
          name: 'bulbasaur',
          id: '1',
        },
        {
          name: 'ivysaur',
          id: '2',
        },
        {
          name: 'venusaur',
          id: '3',
        },
        {
          name: 'charmander',
          id: '4',
        },
        {
          name: 'charmeleon',
          id: '5',
        },
        {
          name: 'charizard',
          id: '6',
        },
        {
          name: 'squirtle',
          id: '7',
        },
        {
          name: 'wartortle',
          id: '8',
        },
        {
          name: 'blastoise',
          id: '9',
        },
      ],
      'saur'
    )
    expect(result).toEqual([
      { id: '1', name: 'bulbasaur' },
      { id: '2', name: 'ivysaur' },
      { id: '3', name: 'venusaur' },
    ])
  })

  it('returns isActive styling if matching', () => {
    const result = isActive('normal', 'normal')
    expect(result).toEqual('opacity-100')
  })

  it('does not return isActive styling if not', () => {
    const result = isActive('normal', 'fire')
    expect(result).toEqual('')
  })

  it('returns isNotActive styling if matching', () => {
    const result = isNotActive('normal', 'normal')
    expect(result).toEqual('')
  })

  it('does not return isNotActive styling if not', () => {
    const result = isNotActive('fire', 'normal')
    expect(result).toEqual('opacity-50')
  })
})
