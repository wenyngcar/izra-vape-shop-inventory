import axios from "axios";
import mongoose from "mongoose";

const baseUrl = "http://localhost:3000/api/";

// Function for fetching data.
// url is required argument, _id is optional argument.
export function getData(
  url: string,
  filter: { _id?: mongoose.Types.ObjectId } = {}
) {
  return axios.get(`${baseUrl}${url}`, {
    params: filter,
  });
}

// Function for deleting data.
export function deleteData(url: string, id: string) {
  return axios.delete(`${baseUrl}${url}?_id=${id}`);
}
