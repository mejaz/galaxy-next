import useSWR from 'swr'

const DETAILS_URL = "/api/docs"

function useDocDetails(id, token) {
  const {data, error} = useSWR(id ? [`${DETAILS_URL}/${id}`, token] : null)

  return {
    details: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useDocDetails
