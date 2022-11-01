import useSWR from 'swr'

const GET_DESIGNATIONS_URL = '/api/designations/'
const fetcher = (url, token) => fetch(url, {
  headers: {
    Authorization: token,
    'Content-type': 'application/json',
  }
}).then(res => res.json())

function useDesignations(token) {
  const {data, error} = useSWR([GET_DESIGNATIONS_URL, token], fetcher)

  return {
    designations: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useDesignations