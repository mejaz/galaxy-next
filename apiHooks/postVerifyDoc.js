import React from 'react'

const DOC_VERIFY_URL = "/api/public/docs/#id/verify"

async function postVerifyDoc(reqId, {arg}) {
  const headers = {
    'Content-type': 'application/json',
  }
  let response = await fetch(DOC_VERIFY_URL.replace("#id", reqId), {
    method: 'POST',
    body: JSON.stringify(arg),
    headers
  })

  if (response.ok) {
    return (await response.blob())
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

export default postVerifyDoc
