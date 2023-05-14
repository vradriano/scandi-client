import axios from 'axios'

export const ScandiWebApi = axios.create({
  // Would be a .env var
  baseURL: "https://scandiweb-vra.000webhostapp.com/scandiweb/api" 
})