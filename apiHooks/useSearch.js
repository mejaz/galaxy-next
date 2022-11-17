import useSWR from 'swr'

function useSearch(token, baseUrl, args, page, rowsPerPage) {
  let params = new URLSearchParams(args)

  let url = `${baseUrl}?${params}`
  const {data, error} = useSWR(Object.values(args).length > 1
    ? [`${url}&page=${page}&rowsPerPage=${rowsPerPage}`, token]
    : null
  )

  return {
    totalCount: data && data.count,
    rows: data && data.rows,
    isLoading: !error && !data,
  }
}

export default useSearch
