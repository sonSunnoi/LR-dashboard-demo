import ky from 'ky'

const apiClient = ky.create({ prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL })

export default apiClient
