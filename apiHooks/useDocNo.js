import useSWR from 'swr'

const DOC_NO_URL = "/api/docs/docNo"

function useDocNo(docCode, token) {
  const params = new URLSearchParams({docCode})
  const {data, error} = useSWR([`${DOC_NO_URL}?${params}`, token])

  return {
    docNo: data && data.docCode,
    isLoading: !error && !data,
    isError: error
  }
}

export default useDocNo
