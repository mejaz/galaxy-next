import useSWR from 'swr'

const DETAILS_URL = "/api/docs"
const fetcher = (url, token) => fetch(url, {
  headers: {
    Authorization: token,
    'Content-type': 'application/json',
  }
}).then(res => res.json())

function useProfile(id, token) {
  const {data, error} = useSWR([`${DETAILS_URL}/${id}`, token], fetcher)

  return {
    details: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useProfile
