import { useQuery, UseQueryOptions } from '@tanstack/react-query'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch('/api/graphql' as string, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Abilities = {
  __typename?: 'Abilities'
  ability?: Maybe<Ability>
  is_hidden?: Maybe<Scalars['Boolean']>
  slot?: Maybe<Scalars['Int']>
}

export type Ability = {
  __typename?: 'Ability'
  name?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type Chain = {
  __typename?: 'Chain'
  evolves_to?: Maybe<Array<Maybe<EvolvesToDetails>>>
  is_baby?: Maybe<Scalars['Boolean']>
  species?: Maybe<Pokemon>
}

export type EvolutionDetails = {
  __typename?: 'EvolutionDetails'
  item?: Maybe<EvolutionItem>
}

export type EvolutionItem = {
  __typename?: 'EvolutionItem'
  name?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type EvolvesToDetails = {
  __typename?: 'EvolvesToDetails'
  evolution_details?: Maybe<EvolutionDetails>
  evolves_to?: Maybe<Array<Maybe<EvolvesToDetails>>>
  species?: Maybe<Pokemon>
}

export type FlavorText = {
  __typename?: 'FlavorText'
  flavor_text?: Maybe<Scalars['String']>
  language?: Maybe<LanguageDetails>
  version_group?: Maybe<VersionGroup>
}

export type Genera = {
  __typename?: 'Genera'
  genus?: Maybe<Scalars['String']>
  language?: Maybe<LanguageDetails>
}

export type Home = {
  __typename?: 'Home'
  front_default?: Maybe<Scalars['String']>
  front_female?: Maybe<Scalars['String']>
  front_shiny?: Maybe<Scalars['String']>
  front_shiny_female?: Maybe<Scalars['String']>
}

export type LanguageDetails = {
  __typename?: 'LanguageDetails'
  name?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type MoveDetails = {
  __typename?: 'MoveDetails'
  accuracy?: Maybe<Scalars['Int']>
  flavor_text_entries?: Maybe<Array<Maybe<FlavorText>>>
  name?: Maybe<Scalars['String']>
  power?: Maybe<Scalars['Int']>
  pp?: Maybe<Scalars['Int']>
  priority?: Maybe<Scalars['Int']>
  type?: Maybe<MoveType>
  url?: Maybe<Scalars['String']>
}

export type MoveType = {
  __typename?: 'MoveType'
  name?: Maybe<Scalars['String']>
}

export type Moves = {
  __typename?: 'Moves'
  move?: Maybe<MoveDetails>
}

export type OfficialArtwork = {
  __typename?: 'OfficialArtwork'
  front_default?: Maybe<Scalars['String']>
}

export type OtherSprites = {
  __typename?: 'OtherSprites'
  home?: Maybe<Home>
  official_artwork?: Maybe<OfficialArtwork>
}

export type Pokemon = {
  __typename?: 'Pokemon'
  abilities?: Maybe<Array<Maybe<Abilities>>>
  base_experience?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['ID']>
  moves?: Maybe<Array<Maybe<Moves>>>
  name: Scalars['String']
  species?: Maybe<PokemonSpecies>
  sprites: Sprites
  stats?: Maybe<Array<PokemonStats>>
  types?: Maybe<Array<PokemonTypes>>
  weight?: Maybe<Scalars['Int']>
}

export type PokemonByColorObject = {
  __typename?: 'PokemonByColorObject'
  pokemon?: Maybe<PokemonSpecies>
}

export type PokemonByTypeObject = {
  __typename?: 'PokemonByTypeObject'
  pokemon?: Maybe<Pokemon>
}

export type PokemonSpecies = {
  __typename?: 'PokemonSpecies'
  base_happiness?: Maybe<Scalars['Int']>
  capture_rate?: Maybe<Scalars['Int']>
  evolution_chain?: Maybe<Chain>
  genera?: Maybe<Array<Maybe<Genera>>>
}

export type PokemonStat = {
  __typename?: 'PokemonStat'
  name: Scalars['String']
  url: Scalars['String']
}

export type PokemonStats = {
  __typename?: 'PokemonStats'
  base_stat: Scalars['Int']
  effort: Scalars['Int']
  stat?: Maybe<PokemonStat>
}

export type PokemonTypeDetails = {
  __typename?: 'PokemonTypeDetails'
  name: Scalars['String']
  url: Scalars['String']
}

export type PokemonTypes = {
  __typename?: 'PokemonTypes'
  slot: Scalars['Int']
  type?: Maybe<PokemonTypeDetails>
}

export type Query = {
  __typename?: 'Query'
  allPokemon: Array<Pokemon>
  allPokemonByColor: Array<PokemonByTypeObject>
  allPokemonByType: Array<PokemonByTypeObject>
  allPokemonSpecies: Array<Pokemon>
  allPokemonTypes: Array<Result>
  pokemonById?: Maybe<Pokemon>
  pokemonSpeciesById?: Maybe<PokemonSpecies>
}

export type QueryAllPokemonArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset: Scalars['Int']
}

export type QueryAllPokemonByColorArgs = {
  type: Scalars['String']
}

export type QueryAllPokemonByTypeArgs = {
  type: Scalars['String']
}

export type QueryAllPokemonSpeciesArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset: Scalars['Int']
}

export type QueryAllPokemonTypesArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset: Scalars['Int']
}

export type QueryPokemonByIdArgs = {
  id: Scalars['ID']
}

export type QueryPokemonSpeciesByIdArgs = {
  id: Scalars['ID']
}

export type Result = {
  __typename?: 'Result'
  id?: Maybe<Scalars['String']>
  name: Scalars['String']
  url: Scalars['String']
}

export type Sprites = {
  __typename?: 'Sprites'
  back_default?: Maybe<Scalars['String']>
  back_female?: Maybe<Scalars['String']>
  back_shiny?: Maybe<Scalars['String']>
  back_shiny_female?: Maybe<Scalars['String']>
  front_default?: Maybe<Scalars['String']>
  front_female?: Maybe<Scalars['String']>
  front_shiny?: Maybe<Scalars['String']>
  front_shiny_female?: Maybe<Scalars['String']>
  other?: Maybe<OtherSprites>
}

export type VersionGroup = {
  __typename?: 'VersionGroup'
  name?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type GetAllPokemonQueryVariables = Exact<{
  offset: Scalars['Int']
  limit?: InputMaybe<Scalars['Int']>
}>

export type GetAllPokemonQuery = {
  __typename?: 'Query'
  allPokemon: Array<{
    __typename?: 'Pokemon'
    id?: string | null
    name: string
    weight?: number | null
    height?: number | null
    base_experience?: number | null
    types?: Array<{
      __typename?: 'PokemonTypes'
      type?: { __typename?: 'PokemonTypeDetails'; name: string } | null
    }> | null
    sprites: {
      __typename?: 'Sprites'
      other?: {
        __typename?: 'OtherSprites'
        official_artwork?: {
          __typename?: 'OfficialArtwork'
          front_default?: string | null
        } | null
      } | null
    }
  }>
}

export type GetAllPokemonByColorQueryVariables = Exact<{
  color: Scalars['String']
}>

export type GetAllPokemonByColorQuery = {
  __typename?: 'Query'
  allPokemonByColor: Array<{
    __typename?: 'PokemonByTypeObject'
    pokemon?: {
      __typename?: 'Pokemon'
      id?: string | null
      name: string
      types?: Array<{
        __typename?: 'PokemonTypes'
        type?: {
          __typename?: 'PokemonTypeDetails'
          name: string
          url: string
        } | null
      }> | null
      sprites: {
        __typename?: 'Sprites'
        other?: {
          __typename?: 'OtherSprites'
          official_artwork?: {
            __typename?: 'OfficialArtwork'
            front_default?: string | null
          } | null
        } | null
      }
    } | null
  }>
}

export type GetAllPokemonByTypeQueryVariables = Exact<{
  type: Scalars['String']
}>

export type GetAllPokemonByTypeQuery = {
  __typename?: 'Query'
  allPokemonByType: Array<{
    __typename?: 'PokemonByTypeObject'
    pokemon?: {
      __typename?: 'Pokemon'
      id?: string | null
      name: string
      types?: Array<{
        __typename?: 'PokemonTypes'
        type?: {
          __typename?: 'PokemonTypeDetails'
          name: string
          url: string
        } | null
      }> | null
      sprites: {
        __typename?: 'Sprites'
        other?: {
          __typename?: 'OtherSprites'
          official_artwork?: {
            __typename?: 'OfficialArtwork'
            front_default?: string | null
          } | null
        } | null
      }
    } | null
  }>
}

export type GetAllPokemonNamesQueryVariables = Exact<{ [key: string]: never }>

export type GetAllPokemonNamesQuery = {
  __typename?: 'Query'
  allPokemonSpecies: Array<{
    __typename?: 'Pokemon'
    name: string
    id?: string | null
  }>
}

export type GetAllPokemonSpeciesQueryVariables = Exact<{
  offset: Scalars['Int']
  limit?: InputMaybe<Scalars['Int']>
}>

export type GetAllPokemonSpeciesQuery = {
  __typename?: 'Query'
  allPokemonSpecies: Array<{
    __typename?: 'Pokemon'
    id?: string | null
    name: string
    weight?: number | null
    height?: number | null
    base_experience?: number | null
    types?: Array<{
      __typename?: 'PokemonTypes'
      type?: { __typename?: 'PokemonTypeDetails'; name: string } | null
    }> | null
    sprites: {
      __typename?: 'Sprites'
      other?: {
        __typename?: 'OtherSprites'
        official_artwork?: {
          __typename?: 'OfficialArtwork'
          front_default?: string | null
        } | null
      } | null
    }
  }>
}

export type GetPokemonByNameOrIdQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetPokemonByNameOrIdQuery = {
  __typename?: 'Query'
  pokemonById?: {
    __typename?: 'Pokemon'
    id?: string | null
    name: string
    base_experience?: number | null
    height?: number | null
    weight?: number | null
    sprites: {
      __typename?: 'Sprites'
      other?: {
        __typename?: 'OtherSprites'
        home?: { __typename?: 'Home'; front_default?: string | null } | null
        official_artwork?: {
          __typename?: 'OfficialArtwork'
          front_default?: string | null
        } | null
      } | null
    }
    species?: {
      __typename?: 'PokemonSpecies'
      base_happiness?: number | null
      capture_rate?: number | null
      genera?: Array<{
        __typename?: 'Genera'
        genus?: string | null
        language?: {
          __typename?: 'LanguageDetails'
          name?: string | null
        } | null
      } | null> | null
      evolution_chain?: {
        __typename?: 'Chain'
        is_baby?: boolean | null
        species?: {
          __typename?: 'Pokemon'
          name: string
          id?: string | null
          sprites: {
            __typename?: 'Sprites'
            other?: {
              __typename?: 'OtherSprites'
              official_artwork?: {
                __typename?: 'OfficialArtwork'
                front_default?: string | null
              } | null
            } | null
          }
        } | null
        evolves_to?: Array<{
          __typename?: 'EvolvesToDetails'
          species?: {
            __typename?: 'Pokemon'
            name: string
            id?: string | null
            sprites: {
              __typename?: 'Sprites'
              other?: {
                __typename?: 'OtherSprites'
                official_artwork?: {
                  __typename?: 'OfficialArtwork'
                  front_default?: string | null
                } | null
              } | null
            }
          } | null
          evolves_to?: Array<{
            __typename?: 'EvolvesToDetails'
            species?: {
              __typename?: 'Pokemon'
              name: string
              id?: string | null
              sprites: {
                __typename?: 'Sprites'
                other?: {
                  __typename?: 'OtherSprites'
                  official_artwork?: {
                    __typename?: 'OfficialArtwork'
                    front_default?: string | null
                  } | null
                } | null
              }
            } | null
            evolves_to?: Array<{
              __typename?: 'EvolvesToDetails'
              species?: {
                __typename?: 'Pokemon'
                name: string
                sprites: {
                  __typename?: 'Sprites'
                  other?: {
                    __typename?: 'OtherSprites'
                    official_artwork?: {
                      __typename?: 'OfficialArtwork'
                      front_default?: string | null
                    } | null
                  } | null
                }
              } | null
            } | null> | null
          } | null> | null
        } | null> | null
      } | null
    } | null
    abilities?: Array<{
      __typename?: 'Abilities'
      is_hidden?: boolean | null
      slot?: number | null
      ability?: { __typename?: 'Ability'; name?: string | null } | null
    } | null> | null
    moves?: Array<{
      __typename?: 'Moves'
      move?: {
        __typename?: 'MoveDetails'
        name?: string | null
        power?: number | null
        pp?: number | null
        priority?: number | null
        type?: { __typename?: 'MoveType'; name?: string | null } | null
      } | null
    } | null> | null
    stats?: Array<{
      __typename?: 'PokemonStats'
      base_stat: number
      stat?: { __typename?: 'PokemonStat'; name: string } | null
    }> | null
    types?: Array<{
      __typename?: 'PokemonTypes'
      type?: { __typename?: 'PokemonTypeDetails'; name: string } | null
    }> | null
  } | null
}

export const GetAllPokemonDocument = `
    query GetAllPokemon($offset: Int!, $limit: Int) {
  allPokemon(offset: $offset, limit: $limit) {
    id
    name
    weight
    height
    types {
      type {
        name
      }
    }
    sprites {
      other {
        official_artwork {
          front_default
        }
      }
    }
    base_experience
  }
}
    `
export const useGetAllPokemonQuery = <
  TData = GetAllPokemonQuery,
  TError = unknown
>(
  variables: GetAllPokemonQueryVariables,
  options?: UseQueryOptions<GetAllPokemonQuery, TError, TData>
) =>
  useQuery<GetAllPokemonQuery, TError, TData>(
    ['GetAllPokemon', variables],
    fetcher<GetAllPokemonQuery, GetAllPokemonQueryVariables>(
      GetAllPokemonDocument,
      variables
    ),
    options
  )
export const GetAllPokemonByColorDocument = `
    query GetAllPokemonByColor($color: String!) {
  allPokemonByColor(type: $color) {
    pokemon {
      id
      name
      types {
        type {
          name
          url
        }
      }
      sprites {
        other {
          official_artwork {
            front_default
          }
        }
      }
    }
  }
}
    `
export const useGetAllPokemonByColorQuery = <
  TData = GetAllPokemonByColorQuery,
  TError = unknown
>(
  variables: GetAllPokemonByColorQueryVariables,
  options?: UseQueryOptions<GetAllPokemonByColorQuery, TError, TData>
) =>
  useQuery<GetAllPokemonByColorQuery, TError, TData>(
    ['GetAllPokemonByColor', variables],
    fetcher<GetAllPokemonByColorQuery, GetAllPokemonByColorQueryVariables>(
      GetAllPokemonByColorDocument,
      variables
    ),
    options
  )
export const GetAllPokemonByTypeDocument = `
    query GetAllPokemonByType($type: String!) {
  allPokemonByType(type: $type) {
    pokemon {
      id
      name
      types {
        type {
          name
          url
        }
      }
      sprites {
        other {
          official_artwork {
            front_default
          }
        }
      }
    }
  }
}
    `
export const useGetAllPokemonByTypeQuery = <
  TData = GetAllPokemonByTypeQuery,
  TError = unknown
>(
  variables: GetAllPokemonByTypeQueryVariables,
  options?: UseQueryOptions<GetAllPokemonByTypeQuery, TError, TData>
) =>
  useQuery<GetAllPokemonByTypeQuery, TError, TData>(
    ['GetAllPokemonByType', variables],
    fetcher<GetAllPokemonByTypeQuery, GetAllPokemonByTypeQueryVariables>(
      GetAllPokemonByTypeDocument,
      variables
    ),
    options
  )
export const GetAllPokemonNamesDocument = `
    query GetAllPokemonNames {
  allPokemonSpecies(offset: 0, limit: 905) {
    name
    id
  }
}
    `
export const useGetAllPokemonNamesQuery = <
  TData = GetAllPokemonNamesQuery,
  TError = unknown
>(
  variables?: GetAllPokemonNamesQueryVariables,
  options?: UseQueryOptions<GetAllPokemonNamesQuery, TError, TData>
) =>
  useQuery<GetAllPokemonNamesQuery, TError, TData>(
    variables === undefined
      ? ['GetAllPokemonNames']
      : ['GetAllPokemonNames', variables],
    fetcher<GetAllPokemonNamesQuery, GetAllPokemonNamesQueryVariables>(
      GetAllPokemonNamesDocument,
      variables
    ),
    options
  )
export const GetAllPokemonSpeciesDocument = `
    query GetAllPokemonSpecies($offset: Int!, $limit: Int) {
  allPokemonSpecies(offset: $offset, limit: $limit) {
    id
    name
    weight
    height
    types {
      type {
        name
      }
    }
    sprites {
      other {
        official_artwork {
          front_default
        }
      }
    }
    base_experience
  }
}
    `
export const useGetAllPokemonSpeciesQuery = <
  TData = GetAllPokemonSpeciesQuery,
  TError = unknown
>(
  variables: GetAllPokemonSpeciesQueryVariables,
  options?: UseQueryOptions<GetAllPokemonSpeciesQuery, TError, TData>
) =>
  useQuery<GetAllPokemonSpeciesQuery, TError, TData>(
    ['GetAllPokemonSpecies', variables],
    fetcher<GetAllPokemonSpeciesQuery, GetAllPokemonSpeciesQueryVariables>(
      GetAllPokemonSpeciesDocument,
      variables
    ),
    options
  )
export const GetPokemonByNameOrIdDocument = `
    query GetPokemonByNameOrId($id: ID!) {
  pokemonById(id: $id) {
    id
    sprites {
      other {
        home {
          front_default
        }
        official_artwork {
          front_default
        }
      }
    }
    species {
      base_happiness
      capture_rate
      genera {
        genus
        language {
          name
        }
      }
      evolution_chain {
        is_baby
        species {
          name
          id
          sprites {
            other {
              official_artwork {
                front_default
              }
            }
          }
        }
        evolves_to {
          species {
            name
            id
            sprites {
              other {
                official_artwork {
                  front_default
                }
              }
            }
          }
          evolves_to {
            species {
              name
              id
              sprites {
                other {
                  official_artwork {
                    front_default
                  }
                }
              }
            }
            evolves_to {
              species {
                name
                sprites {
                  other {
                    official_artwork {
                      front_default
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    name
    base_experience
    height
    weight
    abilities {
      is_hidden
      slot
      ability {
        name
      }
    }
    moves {
      move {
        name
        power
        pp
        priority
        type {
          name
        }
      }
    }
    stats {
      base_stat
      stat {
        name
      }
    }
    types {
      type {
        name
      }
    }
  }
}
    `
export const useGetPokemonByNameOrIdQuery = <
  TData = GetPokemonByNameOrIdQuery,
  TError = unknown
>(
  variables: GetPokemonByNameOrIdQueryVariables,
  options?: UseQueryOptions<GetPokemonByNameOrIdQuery, TError, TData>
) =>
  useQuery<GetPokemonByNameOrIdQuery, TError, TData>(
    ['GetPokemonByNameOrId', variables],
    fetcher<GetPokemonByNameOrIdQuery, GetPokemonByNameOrIdQueryVariables>(
      GetPokemonByNameOrIdDocument,
      variables
    ),
    options
  )
