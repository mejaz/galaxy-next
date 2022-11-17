import useSWR from 'swr'

const USER_PROFILE_URL = "/api/user/profile"

function useProfile(id, token) {
  const params = new URLSearchParams({id})
  const {data, error} = useSWR(id ? [`${USER_PROFILE_URL}?${params}`, token] : null)

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useProfile
