// pages/api/graphql.js
// rename to avoid ts hook warning
import { useResponseCache as responseCache } from '@envelop/response-cache'
import { createServer } from '@graphql-yoga/node'
import PokemonApi from '../../utils/PokemonApi'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import resolvers from '../../graphql/resolvers'
import { PokemonLoader } from '../../loaders/PokemonLoader'
import { GraphQLContext } from '../../types/IPokemon'
import { loadSchema } from '@graphql-tools/load'
import { PokemonSpeciesLoader } from '@pokedex/loaders/PokemonSpeciesLoader'
import { ChainLoader } from '@pokedex/loaders/ChainLoader'
import { MoveLoader } from '@pokedex/loaders/MoveLoader'

const schema = await loadSchema('./graphql/typedefs/*.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const server = createServer<GraphQLContext>({
  schema: schemaWithResolvers,
  plugins: [
    responseCache({
      includeExtensionMetadata: true,
      session: () => null,
    }),
  ],
  context: () => ({
    PokemonApi: PokemonApi,
    pokemonDataLoader: PokemonLoader,
    pokemonSpeciesDataLoader: PokemonSpeciesLoader,
    chainLoader: ChainLoader,
    moveLoader: MoveLoader,
  }),
})

export default server
