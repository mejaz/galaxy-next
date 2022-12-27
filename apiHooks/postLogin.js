import React from 'react'

async function postLogin(url, {arg}) {
  const headers = {
    'Content-type': 'application/json',
  }
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers
  })

  if (response.ok) {
    return response
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

export default postLogin
