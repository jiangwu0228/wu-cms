import storage from "../../lib/services/storage";
import axios from "axios";
import { message } from "antd";
import { AES } from "crypto-js";
import moment from "moment";

const axiosInstance = axios.create({
  baseURL: "http://cms.chtoma.com/api",
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
    const msg = err.response.data.message;
    const code = err.response.data.statusCode;
    message.error(msg);
    return Promise.reject({ msg, code });
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

export const getStudents = async (values) => {
  try {
    const res = await axiosInstance.get("/students", {
      params: {
        page: values.page,
        limit: values.limit,
        query: values.query,
        userId: values.userId,
      },
    });
    return res;
  } catch (err) {
    errorHandler(err);
  }
};

export const getStudent = async (id) => {
  try {
    const res = await axiosInstance.get("/students/" + id);
    return res.data;
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
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const getCourse = async (id) => {
  try {
    const res = await axiosInstance.get("/courses/detail?id=" + id);
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const getTeachers = async (query, page, limit) => {
  try {
    const res = await axiosInstance.get("/teachers", {
      params: {
        query: query,
        page: page,
        limit: limit,
      },
    });
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const getCourseTypes = async () => {
  try {
    const res = await axiosInstance.get("/courses/type");
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const getCourseCode = async () => {
  try {
    const res = await axiosInstance.get("/courses/code");
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const addCourse = async (values) => {
  try {
    const res = await axiosInstance.post("/courses", {
      name: values.name,
      teacherId: values.teacherId,
      type: values.type,
      uid: values.uid,
      startTime: values.startTime.format("YYYY-MM-DD"),
      price: values.price,
      maxStudents: values.maxStudents,
      duration: values.duration,
      detail: values.detail,
      cover: values.cover,
      durationUnit: values.durationUnit,
    });
    message.success(res.msg);
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const editSchedule = async (values) => {
  try {
    const res = await axiosInstance.put("/courses/schedule", {
      chapters: values.chapters,
      classTime: values.classTime,
      scheduleId: values.scheduleId,
      courseId: values.courseId,
    });
    message.success(res.msg);
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const editCourse = async (values) => {
  try {
    const res = await axiosInstance.put("/courses", {
      id: values.id,
      name: values.name,
      teacherId: values.teacherId,
      type: values.type,
      uid: values.uid,
      startTime: values.startTime.format("YYYY-MM-DD"),
      price: values.price,
      maxStudents: values.maxStudents,
      duration: values.duration,
      detail: values.detail,
      cover: values.cover,
      durationUnit: values.durationUnit,
    });
    message.success(res.msg);
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const getOverView = async () => {
  try {
    const res = await axiosInstance.get("/statistics/overview");
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const getMainStudent = async () => {
  try {
    const res = await axiosInstance.get("/statistics/student");
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const getMainTeacher = async () => {
  try {
    const res = await axiosInstance.get("/statistics/teacher");
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
}

export const getMainCourse = async () => {
  try {
    const res = await axiosInstance.get("/statistics/course");
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
}

export const getWorld = async () => {
  return await axios.get(
    'https://code.highcharts.com/mapdata/custom/world-palestine-highres.geo.json'
  );
};
