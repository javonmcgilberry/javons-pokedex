import { Resolvers } from '@pokedex/generated/graphql-types'
import { loadMoveData } from '@pokedex/loaders/MoveLoader'
import { GraphQLContext } from '@pokedex/types/IPokemon'

const MovesResolver: Resolvers['Moves'] = {
  move: async (parent, _, { moveLoader }: GraphQLContext) => {
    const response = await loadMoveData(parent.move, moveLoader)
    return response
  },
}

export default MovesResolver
