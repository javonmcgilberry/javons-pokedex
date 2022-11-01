# Javon's Pokedex

This Web App was created to demonstrate my collective strengths with React, Typescript, & GraphQL. It is a live Pokedex, utilizing the PokeAPI. As a personal challenge to myself, it was my first time wrapping a Rest API with a GraphQL server--and in this respect, having to make carefully thoughtout design decisions to ensure solid performance.

Being as though I wanted to go the extra mile and create a GraphQL server, Next.js just naturally seemed like the most fitting choice given not simply the ease of use with respects to time constraints, but especially the pro of SSR--being able to build both the client and server together easily--but also asset caching benefits, because I knew this would be pretty image/icon etc. etc. heavy application.

One major hurdle, however, was that I had to figure out how to assess was tackling what many people call the "N+1" problem: making multiple trips unnecessary trips in order to fetch nested data. Many of the pokeAPI rest endpoints don't quite provide a broad scope of all the information without making redundant calls, and I didn't know how to address this issue at first. This obstacle--basically "learning by doing"--is what took up the majority of my time. I had to learn how to leverage a dependency called **DataLoader** (which helps cache pokemon requests by pokemon key or id and limit the redundancy) and also for added resiliciency to keep from unnecessarily pinging the API, the server also has a response cache to return previously requested information.

The UI itself was a piece of cake, haha, not much I can say on that one other than trying my best to implement best practices and code cleanliness :)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you how to get a development env running

```
npm run install
```

(Before running or building the application, you must run the following command to generate the necessary types with graphql codegen)

```
npm run generate
```

```
npm run dev
```

## Running the tests

Unit Tests:

```
npm run dev
```

Integration Tests:

```
npm run cypress:open
```

### Test Philosophy

The unit tests are in place to cover user behavior across the component library. Most are relatively compositional in nature, and as such are written in such a manner so that if their underlying implementation changes, the test itself should still pass; for the most part they are simply tracking that callback/helpers fn's are passed their necessary arguments when requested, and various conditional statements are met when & wherever applicable, for determining whether or not to display a particular component.

**The integration tests are strongest barometer of success**, because while the unit tests cover the components in isolation, the integration tests are a true representation of how well these components are working _together_, and give me a confident pulse on how I am handling information from the true API, vs performing mocks.

## Built With

- [Next.js](https://nextjs.org/) - The web framework used
- [Typescript](https://www.typescriptlang.org/) - Dependency Management
- [GraphQL](https://graphql.org/) - Dependency Management
- [GraphQL Yoga](https://www.the-guild.dev/graphql/yoga-server) - Dependency Management
- [React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/) - Dependency Management
- [GraphQL Codegen](https://www.the-guild.dev/graphql/codegen) - Dependency Management
- [Eslint](https://eslint.org/) - Lint
- [lint-staged](https://github.com/okonet/lint-staged) - Lint
- [Prettier](https://prettier.io/) - Code Formatting
- [TailwindCSS](https://tailwindcss.com/) - CSS
- [React Spring](https://react-spring.dev/) - CSS

## Authors

- **Javon McGilberry**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Special Thanks to Symmetry Systems for providing this challenge--I needed the mental exercise!
