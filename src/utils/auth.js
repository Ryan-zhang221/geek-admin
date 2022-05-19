import { useStorage } from "./storage"

export const getToken = () => {
  console.log(useStorage('token'))
  return useStorage('token').value
}