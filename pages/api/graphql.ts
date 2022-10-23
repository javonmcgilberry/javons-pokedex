// pages/api/graphql.js
// rename to avoid ts hook warning
import { useResponseCache as responseCache } from '@envelop/response-cache'
import { createServer } from '@graphql-yoga/node'
import PokemonApi from '../../utils/PokemonApi'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { loadSchema } from '@graphql-tools/load'
import { PokemonLoader } from '@pokedex/loaders/PokemonLoader'
import { GraphQLContext } from '@pokedex/models'
import resolvers from '@pokedex/graphql/resolvers'

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
    PokemonApi: new PokemonApi(),
    pokemonDataLoader: PokemonLoader,
  }),
})

export default server
