import axios from "axios";

// Function for fetching data.
export function getData(url: string) {
  return axios.get(`http://localhost:3000/api/${url}`);
}

export function deleteData(url: string, id: string) {
  return axios.delete(`http://localhost:3000/api/${url}?_id=${id}`);
}
