export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const classWeekDays = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export const programLanguageColors = [
  "magenta",
  "volcano",
  "orange",
  "gold",
  "green",
  "cyan",
  "geekblue",
  "purple",
  "red",
  "lime",
];

export const timeUnit = ["hour", "day", "week", "month", "year"];

export const gutter = [6, 16];

export const timeUnitMap = {
  1: "year",
  2: "month",
  3: "day",
  4: "week",
  5: "hour",
};

export const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const monthsShort = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const myPayload = {
  name: "333",
  teacherId: 20,
  type: [1],
  uid: "4774f9fb-9f83-4289-89ae-37d45c73bbc6",
  price: 1,
  maxStudents: 1,
  duration: 1,
  durationUnit: 4,
  detail:
    "Description length must between 100 - 1000 characters.Description length must between 100 - 1000 characters.Description length must between 100 - 1000 characters.",
};

const coursePayload = {
  name: "Jiang Wu", //
  teacherId: 4, //
  type: [1], //
  uid: "cbad767d-b528-4477-b77c-3b8c0d741541", //
  startTime: "2021-12-09",
  price: 12, //
  maxStudents: 1, //
  duration: 1, //
  detail:
    'for (const [key, value] of Object.entries(obj)) {\n  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"\n}',
  durationUnit: 2, //
};

const coursePreview = {
  data: {
    name: "Jiang Wu",
    uid: "cbad767d-b528-4477-b77c-3b8c0d741541",
    startTime: "2021-12-09",
    price: 12,
    maxStudents: 1,
    duration: 1,
    detail:
      'for (const [key, value] of Object.entries(obj)) {\n  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"\n}',
    durationUnit: 2,
    type: [
      {
        id: 1,
        name: "C",
      },
    ],
    scheduleId: 1551, // link to scheduledId
    teacherId: 4,
    createdAt: "2021-12-01 02:08:50",
    updatedAt: "2021-12-01 02:08:50",
    id: 1312, // link to courseId
    cover: "http://lorempixel.com/800/600/technics/",
    star: 0,
    teacherName: "Dr. Ludwig Murray",
  },
  code: 201,
  msg: "success",
};

const schedulePayload = {
  chapters: [
    {
      name: "123",
      content: "234",
      order: 1,
    },
    {
      name: "456",
      content: "678",
      order: 2,
    },
  ],
  classTime: ["Sunday 12:04:00", "Friday 06:00:00"],
  scheduleId: 1551, // link to scheduledId
  courseId: 1312, // link to courseId
};

const updateCourse = {
  "name": "3334",
  "teacherId": 4,
  "type": [
      2
  ],
  "uid": "0d096e14-1ead-4754-a6ce-91356a740e60",
  "startTime": "2021-12-15",
  "price": 1,
  "maxStudents": 2,
  "duration": 2,
  "detail": "Description length must between 100 - 1000 characters.Description length must between 100 - 1000 characters.",
  "cover": "http://lorempixel.com/800/600/technics/",
  "durationUnit": 2,
  "id": 1326
}