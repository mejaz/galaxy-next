import useSWR from 'swr'

const USER_PROFILE_BASIC_URL = "/api/user/profile-basic"

function useProfileBasic(id, token) {
  const params = new URLSearchParams({id})
  const {data, error} = useSWR([`${USER_PROFILE_BASIC_URL}?${params}`, token])

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useProfileBasic
