import useSWR from 'swr'

const GET_DESIGNATIONS_URL = '/api/designations/'

function useDesignations(token) {
  const {data, error, mutate} = useSWR([GET_DESIGNATIONS_URL, token])

  return {
    designations: data,
    isLoading: !error && !data,
    mutate
  }
}

export default useDesignations