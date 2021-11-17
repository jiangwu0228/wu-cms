import storage from "../../lib/services/storage";
import axios from "axios";
import { message } from "antd";
import { AES } from "crypto-js";

const axiosInstance = axios.create({
  baseURL: "https://cms.chtoma.com/api",
  responseType: "json",
});

//handler normal request
axiosInstance.interceptors.request.use((config) => {
  if (!config.url.includes("login" || "signup")) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: "Bearer " + storage?.token,
      },
    };
  }
  return config;
});

//handler normal response
axiosInstance.interceptors.response.use(
  (res) => {
    if (
      res.data.code.toString().startsWith("2") ||
      code.toString().startsWith("3")
    ) {
      return res.data;
    } else {
      message.error(res.data.msg);
    }
  },
  (err) => {
    const msg = err.response.data.msg;
    const code = err.response.status;
    message.error(msg);
    return Promise.reject({ meg, code });
  }
);

//handler normal error(no response)
const errorHandler = (err) => {
  console.error(err);
};

export const login = async (values) => {
  try {
    const res = await axiosInstance.post("/login", {
      email: values.email,
      password: AES.encrypt(values.password, storage.key).toString(),
      role: values.role,
    });
    return res;
  } catch (err) {
    errorHandler(err);
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/logout");
    return res;
  } catch (err) {
    errorHandler(err);
  }
};

export const signup = async (values) => {
  try {
    const res = await axiosInstance.post("/signup", {
      email: values.email,
      password: values.password,
      role: values.role,
    });
    return res;
  } catch (err) {
    errorHandler(err);
  }
};

export const getStudents = async (page, limit, query, userId) => {
  try {
    const res = await axiosInstance.get("/students", {
      params: {
        page: page,
        limit: limit,
        query: query,
        userId: userId,
      },
    });
    return res;
  } catch (err) {
    errorHandler(err);
  }
};

export const addStudent = async (values) => {
  try {
    const res = await axiosInstance.post("/students", {
      name: values.name,
      email: values.email,
      country: values.country,
      type: values.type,
    });
    message.success(res.msg);
    return res;
  } catch (err) {
    errorHandler(err);
  }
};

export const editStudent = async (values) => {
  try {
    const res = await axiosInstance.put("/students", {
      id: values.id,
      name: values.name,
      email: values.email,
      country: values.country,
      type: values.type,
    });
    message.success(res.msg);
    return res;
  } catch (err) {
    errorHandler(err);
  }
};

export const deleteStudent = async (id) => {
  try {
    const res = await axiosInstance.delete(`/students/${id}`);
    message.success(res.msg);
    return res;
  } catch (err) {
    errorHandler(err);
  }
};

export const getCourses = async (page) => {
  try {
    const res = await axiosInstance.get("/courses", {
      params: {
        page: page,
        limit: 20,
      },
    });
    return res;
  } catch (err) {
    errorHandler(err);
  }
}


export const courseDetail = async (id) => {
  try {
    const res = await axiosInstance.get(`/courses/${id}`);
    return res;
  } catch (err) {
    errorHandler(err);
  }
}