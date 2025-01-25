import axios from "axios";
import mongoose from "mongoose";

const baseUrl = "http://localhost:3000/api/";

// Function for fetching data.
// url is required argument, filter is optional argument.
// filter is mostly used on fetching item base on brandId.
export function getData(
  url,
  filter = {}
) {
  return axios.get(`${baseUrl}${url}`, {
    params: filter,
  });
}

// Function for deleting data.
export function deleteData(url, id) {
  return axios.delete(`${baseUrl}${url}?_id=${id}`);
}

// Function for creating data.
export function postData(url, body) {
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

// Function for editing data.
export function patchData(url, body) {
  return axios.patch(
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
