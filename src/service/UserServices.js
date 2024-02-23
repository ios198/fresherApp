//import axios from "axios";
import axios from "./customize-axios";
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
  //return axios.post(`api/users`, {
  //  name: { name },
  //  job: { job },
  //});
  return axios.post(`/api/users`, {
    name,
    job,
  });
};

const UpdateCreatedUser = (id, name, job) => {
  //return axios.post(`api/users`, {
  //  name: { name },
  //  job: { job },
  //});
  return axios.put(`/api/users/${id}`, {
    name,
    job,
  });
};

export { fetchAllUser, postCreateUser, UpdateCreatedUser };
