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

export type Home = {
  __typename?: 'Home'
  front_default?: Maybe<Scalars['String']>
  front_female?: Maybe<Scalars['String']>
  front_shiny?: Maybe<Scalars['String']>
  front_shiny_female?: Maybe<Scalars['String']>
}

export type OtherSprites = {
  __typename?: 'OtherSprites'
  home?: Maybe<Home>
}

export type Pokemon = {
  __typename?: 'Pokemon'
  id: Scalars['ID']
  name: Scalars['String']
  sprites: Sprites
  stats?: Maybe<Array<PokemonStats>>
  types?: Maybe<Array<PokemonTypes>>
}

export type PokemonByTypeObject = {
  __typename?: 'PokemonByTypeObject'
  pokemon?: Maybe<Result>
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
  allPokemonByType: Array<PokemonByTypeObject>
  allPokemonSpecies: Array<Result>
  allPokemonTypes: Array<Result>
  pokemonById?: Maybe<Pokemon>
}

export type QueryAllPokemonArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset: Scalars['Int']
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

export type GetAllPokemonQueryVariables = Exact<{
  offset: Scalars['Int']
  limit?: InputMaybe<Scalars['Int']>
}>

export type GetAllPokemonQuery = {
  __typename?: 'Query'
  allPokemon: Array<{
    __typename?: 'Pokemon'
    id: string
    name: string
    sprites: {
      __typename?: 'Sprites'
      other?: {
        __typename?: 'OtherSprites'
        home?: { __typename?: 'Home'; front_default?: string | null } | null
      } | null
    }
    stats?: Array<{
      __typename?: 'PokemonStats'
      base_stat: number
      stat?: { __typename?: 'PokemonStat'; name: string } | null
    }> | null
  }>
}

export const GetAllPokemonDocument = `
    query GetAllPokemon($offset: Int!, $limit: Int) {
  allPokemon(offset: $offset, limit: $limit) {
    id
    name
    sprites {
      other {
        home {
          front_default
        }
      }
    }
    stats {
      base_stat
      stat {
        name
      }
    }
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
