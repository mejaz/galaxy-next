import React from 'react'

const ADD_USER_URL = '/api/user/add'
const EDIT_USER_URL = '/api/user/edit'

async function postEmpDetails(token, {arg}) {
  const {id, isEdit, ...details} = arg
  let url = ADD_USER_URL
  if (isEdit) {
    let params = new URLSearchParams({id})
    url = `${EDIT_USER_URL}?${params}`
  }
  const headers = {
    Authorization: token,
    'Content-type': 'application/json',
  }
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(details),
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

export default postEmpDetails
