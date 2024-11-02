const API_ENDPOINT = import.meta.env.VITE_FUNC_API_ENDPOINT

export const callPublicApi = async () => {
  console.log('Calling Public API')
  const response = await fetch(`${API_ENDPOINT}/public`)
  console.log(await response.json())
}

export const callPrivateApi = async (bearerToken: string) => {
  console.log('Calling Private API')
  const response = await fetch(`${API_ENDPOINT}/private`, {
    headers: { Authorization: `Bearer ${bearerToken}` },
  })
  console.log(await response.json())
}

export const callAdminApi = async (bearerToken: string) => {
  console.log('Calling Admin API')
  const response = await fetch(`${API_ENDPOINT}/admin`, {
    headers: { Authorization: `Bearer ${bearerToken}` },
  })
  console.log(await response.json())
}
