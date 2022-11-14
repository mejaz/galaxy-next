import React from 'react'

const SUBMIT_URL = `/api/user/generate/#id`

async function postCertData(token, {arg}) {
  const {id, ...data} = arg

  const headers = {
    Authorization: token,
    'Content-type': 'application/json',
  }
  const url = SUBMIT_URL.replace("#id", id)
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  })

  if (response.ok) {
    const headers = response.headers
    return {blob: await response.blob(), headers}
  } else {
    if (response.status === 401) {
      let error = new Error('Not authorized')
      error.status = 401
      throw error
    } else {
      let error = new Error("")
      error.status = response.status
      error.message = (await response.json()).message
      throw error
    }
  }
}

export default postCertData
