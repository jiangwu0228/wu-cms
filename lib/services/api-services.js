import storage from "./storage";
import axios from "axios";
import { AES } from "crypto-js";

const baseUrl = "https://cms.chtoma.com/api";

export function login(values){
  return axios({
    method: "post",
    url: `${baseUrl}/login`,
    data: {
      email: values.email,
      password: AES.encrypt(values.password, "cms").toString(),
      role: values.role,
    },
  })
} 

export function signup(values){
  return axios({
    method: "post",
    url: `${baseUrl}/signup`,
    data: {
      email: values.email,
      password: values.password,
      role: values.role,
    },
  })
}

export function logout(){
  return axios({
    method: "post",
    url: "https://cms.chtoma.com/api/logout",
    headers: { Authorization: `Bearer ${storage.token}` },
  })
}

export function getStudentList(page, limit) {
  return axios({
    method: "get",
    url: `${baseUrl}/students?page=${page}&limit=${limit}`,
    headers: { Authorization: `Bearer ${storage.token}` },
  })
}

//in this time will set page and limit to 1 and 500
export function searchStudentByName(name) {
  return axios({
    method: "get",
    url: `${baseUrl}/students?query=${name}&page=1&limit=500`,
    headers: { Authorization: `Bearer ${storage.token}` },
  })
}

export function addStudent(values) {
  return axios({
    method: "post",
    url: `${baseUrl}/students`,
    headers: { Authorization: `Bearer ${storage.token}` },
    data: {
      name: values.name,
      email: values.email,
      country: values.country,
      type: values.type
    },
  });
}

export function editStudent(values) {
  return axios({
    method: "put",
    url: `${baseUrl}/students`,
    headers: { Authorization: `Bearer ${storage.token}` },
    data: {
      id: values.id,
      name: values.name,
      email: values.email,
      country: values.country,
      type: values.type
    },
  });
}

export function deleteStudent(id) {
  return axios({
    method: "delete",
    url: `${baseUrl}/students/${id}`,
    headers: { Authorization: `Bearer ${storage.token}` },
  });
}
