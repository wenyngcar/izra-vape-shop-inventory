import axios from "axios";

// Function for fetching data.
export function getData(url: string) {
  return axios.get(`http://localhost:3000/api/${url}`);
}
