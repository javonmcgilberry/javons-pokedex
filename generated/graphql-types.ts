import { GraphQLResolveInfo } from 'graphql'
import {
  IPokemon,
  IPokemonTypes,
  IPokemonStats,
  IPokemonStat,
  ISprites,
  IOtherSprites,
  Front_Default,
  IHome,
  IPokemonByTypeObject,
  IPokemonTypeDetails,
  IResult,
  GraphQLContext,
} from '../models'
import { IPokemonSpecies, IGenera } from '../types/PokemonSpecies'
import { IChain } from '../types/EvolutionChain'
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
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

export type OtherSprites = {
  __typename?: 'OtherSprites'
  home?: Maybe<Home>
}

export type Pokemon = {
  __typename?: 'Pokemon'
  id?: Maybe<Scalars['ID']>
  name: Scalars['String']
  sprites: Sprites
  stats?: Maybe<Array<PokemonStats>>
  types?: Maybe<Array<PokemonTypes>>
}

export type PokemonByTypeObject = {
  __typename?: 'PokemonByTypeObject'
  pokemon?: Maybe<Result>
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
  allPokemonByType: Array<PokemonByTypeObject>
  allPokemonSpecies: Array<Result>
  allPokemonTypes: Array<Result>
  pokemonById?: Maybe<Pokemon>
  pokemonSpeciesById?: Maybe<PokemonSpecies>
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Chain: ResolverTypeWrapper<IChain>
  EvolutionDetails: ResolverTypeWrapper<EvolutionDetails>
  EvolutionItem: ResolverTypeWrapper<EvolutionItem>
  EvolvesToDetails: ResolverTypeWrapper<
    Omit<EvolvesToDetails, 'evolves_to' | 'species'> & {
      evolves_to?: Maybe<Array<Maybe<ResolversTypes['EvolvesToDetails']>>>
      species?: Maybe<ResolversTypes['Pokemon']>
    }
  >
  Genera: ResolverTypeWrapper<IGenera>
  Home: ResolverTypeWrapper<IHome>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  LanguageDetails: ResolverTypeWrapper<LanguageDetails>
  OtherSprites: ResolverTypeWrapper<IOtherSprites>
  Pokemon: ResolverTypeWrapper<IPokemon>
  PokemonByTypeObject: ResolverTypeWrapper<IPokemonByTypeObject>
  PokemonSpecies: ResolverTypeWrapper<IPokemonSpecies>
  PokemonStat: ResolverTypeWrapper<IPokemonStat>
  PokemonStats: ResolverTypeWrapper<IPokemonStats>
  PokemonTypeDetails: ResolverTypeWrapper<IPokemonTypeDetails>
  PokemonTypes: ResolverTypeWrapper<IPokemonTypes>
  Query: ResolverTypeWrapper<{}>
  Result: ResolverTypeWrapper<IResult>
  Sprites: ResolverTypeWrapper<ISprites>
  String: ResolverTypeWrapper<Scalars['String']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']
  Chain: IChain
  EvolutionDetails: EvolutionDetails
  EvolutionItem: EvolutionItem
  EvolvesToDetails: Omit<EvolvesToDetails, 'evolves_to' | 'species'> & {
    evolves_to?: Maybe<Array<Maybe<ResolversParentTypes['EvolvesToDetails']>>>
    species?: Maybe<ResolversParentTypes['Pokemon']>
  }
  Genera: IGenera
  Home: IHome
  ID: Scalars['ID']
  Int: Scalars['Int']
  LanguageDetails: LanguageDetails
  OtherSprites: IOtherSprites
  Pokemon: IPokemon
  PokemonByTypeObject: IPokemonByTypeObject
  PokemonSpecies: IPokemonSpecies
  PokemonStat: IPokemonStat
  PokemonStats: IPokemonStats
  PokemonTypeDetails: IPokemonTypeDetails
  PokemonTypes: IPokemonTypes
  Query: {}
  Result: IResult
  Sprites: ISprites
  String: Scalars['String']
}

export type ChainResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Chain'] = ResolversParentTypes['Chain']
> = {
  evolves_to?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['EvolvesToDetails']>>>,
    ParentType,
    ContextType
  >
  is_baby?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  species?: Resolver<Maybe<ResolversTypes['Pokemon']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EvolutionDetailsResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['EvolutionDetails'] = ResolversParentTypes['EvolutionDetails']
> = {
  item?: Resolver<
    Maybe<ResolversTypes['EvolutionItem']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EvolutionItemResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['EvolutionItem'] = ResolversParentTypes['EvolutionItem']
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EvolvesToDetailsResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['EvolvesToDetails'] = ResolversParentTypes['EvolvesToDetails']
> = {
  evolution_details?: Resolver<
    Maybe<ResolversTypes['EvolutionDetails']>,
    ParentType,
    ContextType
  >
  evolves_to?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['EvolvesToDetails']>>>,
    ParentType,
    ContextType
  >
  species?: Resolver<Maybe<ResolversTypes['Pokemon']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeneraResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Genera'] = ResolversParentTypes['Genera']
> = {
  genus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  language?: Resolver<
    Maybe<ResolversTypes['LanguageDetails']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HomeResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Home'] = ResolversParentTypes['Home']
> = {
  front_default?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  front_female?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  front_shiny?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  front_shiny_female?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LanguageDetailsResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['LanguageDetails'] = ResolversParentTypes['LanguageDetails']
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OtherSpritesResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['OtherSprites'] = ResolversParentTypes['OtherSprites']
> = {
  home?: Resolver<Maybe<ResolversTypes['Home']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PokemonResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Pokemon'] = ResolversParentTypes['Pokemon']
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  sprites?: Resolver<ResolversTypes['Sprites'], ParentType, ContextType>
  stats?: Resolver<
    Maybe<Array<ResolversTypes['PokemonStats']>>,
    ParentType,
    ContextType
  >
  types?: Resolver<
    Maybe<Array<ResolversTypes['PokemonTypes']>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PokemonByTypeObjectResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['PokemonByTypeObject'] = ResolversParentTypes['PokemonByTypeObject']
> = {
  pokemon?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PokemonSpeciesResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['PokemonSpecies'] = ResolversParentTypes['PokemonSpecies']
> = {
  base_happiness?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  capture_rate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  evolution_chain?: Resolver<
    Maybe<ResolversTypes['Chain']>,
    ParentType,
    ContextType
  >
  genera?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Genera']>>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PokemonStatResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['PokemonStat'] = ResolversParentTypes['PokemonStat']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PokemonStatsResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['PokemonStats'] = ResolversParentTypes['PokemonStats']
> = {
  base_stat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  effort?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  stat?: Resolver<Maybe<ResolversTypes['PokemonStat']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PokemonTypeDetailsResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['PokemonTypeDetails'] = ResolversParentTypes['PokemonTypeDetails']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PokemonTypesResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['PokemonTypes'] = ResolversParentTypes['PokemonTypes']
> = {
  slot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  type?: Resolver<
    Maybe<ResolversTypes['PokemonTypeDetails']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  allPokemon?: Resolver<
    Array<ResolversTypes['Pokemon']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllPokemonArgs, 'offset'>
  >
  allPokemonByType?: Resolver<
    Array<ResolversTypes['PokemonByTypeObject']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllPokemonByTypeArgs, 'type'>
  >
  allPokemonSpecies?: Resolver<
    Array<ResolversTypes['Result']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllPokemonSpeciesArgs, 'offset'>
  >
  allPokemonTypes?: Resolver<
    Array<ResolversTypes['Result']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllPokemonTypesArgs, 'offset'>
  >
  pokemonById?: Resolver<
    Maybe<ResolversTypes['Pokemon']>,
    ParentType,
    ContextType,
    RequireFields<QueryPokemonByIdArgs, 'id'>
  >
  pokemonSpeciesById?: Resolver<
    Maybe<ResolversTypes['PokemonSpecies']>,
    ParentType,
    ContextType,
    RequireFields<QueryPokemonSpeciesByIdArgs, 'id'>
  >
}

export type ResultResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SpritesResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Sprites'] = ResolversParentTypes['Sprites']
> = {
  back_default?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  back_female?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  back_shiny?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  back_shiny_female?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  front_default?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  front_female?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  front_shiny?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  front_shiny_female?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  other?: Resolver<
    Maybe<ResolversTypes['OtherSprites']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = GraphQLContext> = {
  Chain?: ChainResolvers<ContextType>
  EvolutionDetails?: EvolutionDetailsResolvers<ContextType>
  EvolutionItem?: EvolutionItemResolvers<ContextType>
  EvolvesToDetails?: EvolvesToDetailsResolvers<ContextType>
  Genera?: GeneraResolvers<ContextType>
  Home?: HomeResolvers<ContextType>
  LanguageDetails?: LanguageDetailsResolvers<ContextType>
  OtherSprites?: OtherSpritesResolvers<ContextType>
  Pokemon?: PokemonResolvers<ContextType>
  PokemonByTypeObject?: PokemonByTypeObjectResolvers<ContextType>
  PokemonSpecies?: PokemonSpeciesResolvers<ContextType>
  PokemonStat?: PokemonStatResolvers<ContextType>
  PokemonStats?: PokemonStatsResolvers<ContextType>
  PokemonTypeDetails?: PokemonTypeDetailsResolvers<ContextType>
  PokemonTypes?: PokemonTypesResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Result?: ResultResolvers<ContextType>
  Sprites?: SpritesResolvers<ContextType>
}
