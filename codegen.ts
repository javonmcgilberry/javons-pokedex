import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './graphql/typedefs/*.graphql',
  documents: './graphql/{queries,mutations}/*.graphql',
  hooks: { afterOneFileWrite: ['prettier --write'] },
  generates: {
    'generated/graphql-types.ts': {
      plugins: [
        '@graphql-codegen/typescript',
        '@graphql-codegen/typescript-resolvers',
      ],
      config: {
        contextType: '../models#GraphQLContext',
        mappers: {
          Pokemon: '../models#IPokemon',
          PokemonTypes: '../models#IPokemonTypes',
          PokemonStats: '../models#IPokemonStats',
          PokemonStat: '../models#IPokemonStat',
          Sprites: '../models#ISprites',
          OtherSprites: '../models#IOtherSprites',
          Home: '../models#IHome',
          PokemonByTypeObject: '../models#IPokemonByTypeObject',
          PokemonTypeDetails: '../models#IPokemonTypeDetails',
          Result: '../models#IResult',
        },
      },
    },
    'generated/graphql-hooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: {
          endpoint: `"/api/graphql"`,
        },
      },
    },
  },
}
export default config
