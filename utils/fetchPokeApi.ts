type FetchParams = Parameters<typeof fetch>
type FetchInput = FetchParams[0]
type FetchInit = FetchParams[1]

export const fetchPokemonApi = <T>(
  input: FetchInput,
  init: FetchInit = {}
): Promise<T> => {
  return fetch(input, {
    ...init,
    // ensure cookies are always passed
    credentials: 'same-origin',

    headers: {
      ...init.headers,
      // always include this header
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      // Throw error for error status codes (400+)
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }

      return resp
    })
    .then((resp) => resp.json() as Promise<T>)
}
