import axios from "axios";
import mongoose from "mongoose";

const baseUrl = "http://localhost:3000/api/";

// Function for fetching data.
// url is required argument, _id is optional argument.
export function getData(
  url: string,
  filter: {
    brandId?: mongoose.Types.ObjectId; // For fetching item that belongs only to specific brand.
  } = {}
) {
  return axios.get(`${baseUrl}${url}`, {
    params: filter,
  });
}

// Function for deleting data.
export function deleteData(url: string, id: string) {
  return axios.delete(`${baseUrl}${url}?_id=${id}`);
}

// Function for creating data.
export function postData(url: string, body: object) {
  return axios.post(
    `${baseUrl}${url}`,
    {
      ...body,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
