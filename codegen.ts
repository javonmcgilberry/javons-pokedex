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
        contextType: '../types/IPokemon#GraphQLContext',
        mappers: {
          Pokemon: '../types/IPokemon#IPokemon',
          PokemonTypes: '../types/IPokemon#IPokemonTypes',
          PokemonStats: '../types/IPokemon#IPokemonStats',
          PokemonStat: '../types/IPokemon#IPokemonStat',
          Sprites: '../types/IPokemon#ISprites',
          OtherSprites: '../types/IPokemon#IOtherSprites',
          FrontDefault: '../types/IPokemon#Front_Default',
          Home: '../types/IPokemon#IHome',
          PokemonByTypeObject: '../types/IPokemon#IPokemonByTypeObject',
          PokemonTypeDetails: '../types/IPokemon#IPokemonTypeDetails',
          Result: '../types/IPokemon#IResult',
          PokemonSpecies: '../types/PokemonSpecies#IPokemonSpecies',
          Genera: '../types/PokemonSpecies#IGenera',
          Chain: '../types/EvolutionChain#IChain',
          MoveDetails: '../types/IPokemon#IMoveDetails',
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
