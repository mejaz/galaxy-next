import React from 'react'

const DESIGNATION_URL = "/api/designations"

async function deleteDesignation(token, {arg}) {
  const headers = {
    Authorization: token,
    'Content-type': 'application/json',
  }
  let response = await fetch(`${DESIGNATION_URL}/${arg.id}`, {
    method: 'DELETE',
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

export default deleteDesignation
