import useSWR from 'swr'

const VERIFY_TOKEN_API_URL = '/api/verify-token'

function useVerifyToken(token) {
  const {data, error} = useSWR(() => token ? [VERIFY_TOKEN_API_URL, token] : null)

  return {
    data, error
  }
}

export default useVerifyToken
