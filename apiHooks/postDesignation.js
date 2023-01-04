import React from 'react'

const ADD_DESIGNATION_URL = "/api/designations/add"

async function postDesignation(token, {arg}) {
  const headers = {
    Authorization: token,
    'Content-type': 'application/json',
  }
  let response = await fetch(ADD_DESIGNATION_URL, {
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

export default postDesignation
