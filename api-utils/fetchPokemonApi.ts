type FetchParams = Parameters<typeof fetch>
type FetchInput = FetchParams[0]
type FetchInit = FetchParams[1]

export const fetchPokemonApiData = <T>(
  input: FetchInput,
  init: FetchInit = {}
): Promise<T> => {
  return fetch(input, {
    ...init,
    credentials: 'same-origin',
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
      return resp
    })
    .then((resp) => resp.json() as Promise<T>)
}
