const BASE = '/api/v1'
let token = null

function getToken() {
  if (!token) token = localStorage.getItem('monie_token')
  return token
}

async function req(method, path, body) {
  const t = getToken()
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    },
    body: body != null ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  if (res.status === 204) return null
  return res.json()
}

export async function initSession() {
  const storedUserId = localStorage.getItem('monie_user_id')
  const data = await req('POST', '/session', storedUserId ? { userId: storedUserId } : {})
  token = data.token
  localStorage.setItem('monie_token', data.token)
  localStorage.setItem('monie_user_id', data.userId)
  return data
}

export const getProducts    = ()           => req('GET',    '/products')
export const createProduct  = (body)       => req('POST',   '/products', body)
export const deleteProduct  = (id)         => req('DELETE', `/products/${id}`)
export const getRoutines    = ()           => req('GET',    '/routines')
export const setRoutineSlot = (slot, ids)  => req('PUT',    `/routines/${slot}`, { productIds: ids })
export const getIngredients    = (category) => req('GET',  `/ingredients${category && category !== 'all' ? `?category=${category}` : ''}`)
export const createIngredient  = (body)     => req('POST', '/ingredients', body)
