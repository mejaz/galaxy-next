import useSWR from 'swr'

const GET_DOC_TYPES_URL = '/api/docs/types'

function useDocTypes(token) {
  const {data, error, mutate} = useSWR([GET_DOC_TYPES_URL, token])

  return {
    docTypes: data,
    isLoading: !error && !data,
    mutate
  }
}

export default useDocTypes