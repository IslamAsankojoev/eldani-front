import ky from 'ky-universal'

export const kyInstance = ky.create({
  prefixUrl: 'http://localhost:8000/api',
})
// process.env.API_URL

// axiosInstance.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem('token')
//   if (config.headers && token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

// axiosInstance.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config
//     if (
//       error.response &&
//       error.response.status === 403 &&
//       originalRequest &&
//       !originalRequest.sent
//     ) {
//       originalRequest.sent = true
//       try {
//         const token = localStorage.getItem('token')
//         return axiosInstance.request(originalRequest)
//       } catch (e) {
//         throw error
//       }
//     }
//     throw error
//   },
// )
