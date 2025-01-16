import axios from 'axios'

export function getBrands() {
    return axios.get('http://localhost:3000/api/brands')
}