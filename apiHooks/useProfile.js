import useSWR from 'swr'

const USER_PROFILE_URL = "/api/user/profile"
const fetcher = (url, token) => fetch(url, {
  headers: {
    Authorization: token,
    'Content-type': 'application/json',
  }
}).then(res => res.json())

function useProfile(id, token) {
  const params = new URLSearchParams({id})
  const {data, error} = useSWR([`${USER_PROFILE_URL}?${params}`, token], fetcher)

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useProfile
