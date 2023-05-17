import axios from 'axios'

export const ScandiWebApi = axios.create({
  // Would be a .env var
  baseURL: "https://scandiweb-api-vradriano.vercel.app/api" 
})