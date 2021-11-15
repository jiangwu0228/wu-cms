import {
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  SolutionOutlined,
  ReadOutlined,
  MessageOutlined,
  FileAddOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  ProjectOutlined,
} from "@ant-design/icons";

const overView = {
  icon: <DashboardOutlined />,
  title: "Overview",
  path: "/",
};

const student = {
  icon: <SolutionOutlined />,
  title: "Student",
  hideLinkInBreadcrumb: true,
  children: [
    {
      icon: <TeamOutlined />,
      title: "Student List",
      path: "/students-list",
    },
  ],
};

const teacher = {
  icon: <DeploymentUnitOutlined />,
  title: "Teacher",
  hideLinkInBreadcrumb: true,
  children: [
    {
      icon: <TeamOutlined />,
      title: "Teacher List",
      path: "/teachers-list",
    },
  ],
};

const classSchedule = {
  icon: <CalendarOutlined />,
  title: "Class Schedule",
  path: "/schedule",
};

const studentCourses = {
  icon: <ReadOutlined />,
  title: "Student Courses",
  hideLinkInBreadcrumb: true,
  children: [
    {
      icon: <ProjectOutlined />,
      title: "All Course",
      path: "/courses",
    },
    {
      icon: <FileAddOutlined />,
      title: "My Courses",
      path: "/courses/own",
    },
  ],
};

const course = {
  icon: <ReadOutlined />,
  title: "Course",
  hideLinkInBreadcrumb: true,
  children: [
    {
      icon: <UnorderedListOutlined />,
      title: "All Course",
      path: "/course",
    },
    {
      icon: <FileAddOutlined />,
      title: "Add Create",
      path: "/course/addCourse",
    },
    {
      icon: <EditOutlined />,
      title: "Edit Course",
      path: "/course/editCourse",
    },
  ],
};

const message = {
  icon: <MessageOutlined />,
  title: "Message",
  path: "/message",
};

const profile = {
  icon: <UserOutlined />,
  title: "Profile",
  path: "/profile",
};

export const managerMenuConfig = [overView, student, teacher, course, message];

export const studentMenuConfig = [
  overView,
  studentCourses,
  classSchedule,
  message,
  profile,
];

export const teacherMenuConfig = [
  overView,
  classSchedule,
  student,
  course,
  message,
  profile,
];
