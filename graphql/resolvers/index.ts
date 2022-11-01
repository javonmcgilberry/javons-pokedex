import { Resolvers } from '@pokedex/generated/graphql-types'
import ChainResolver from './ChainResolver'
import MovesResolver from './MovesResolver'
import PokemonResolver from './PokemonResolver'
import QueryResolver from './QueryResolver'

const resolvers: Resolvers = {
  Query: QueryResolver,
  Pokemon: PokemonResolver,
  Chain: ChainResolver,
  Moves: MovesResolver,
}

export default resolvers
