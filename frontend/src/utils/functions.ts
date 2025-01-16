import axios from "axios";
import mongoose from "mongoose";

// Function for fetching data.
// url is required argument, _id is optional argument.
export function getData(
  url: string,
  filter: { _id?: mongoose.Types.ObjectId } = {}
) {
  return axios.get(`http://localhost:3000/api/${url}`, {
    params: filter,
  });
}

// Function for deleting data.
export function deleteData(url: string, id: string) {
  return axios.delete(`http://localhost:3000/api/${url}?_id=${id}`);
}
