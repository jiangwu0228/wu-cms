import { useRouter } from "next/router";

const useGetCrumbByPath = () => {
  const pathCrumbMap = {
    manager: "CMS MANAGER SYSTEM",
    teacher: "CMS TEACHER SYSTEM",
    student: "CMS STUDENT SYSTEM",
    "students-list": "Student",
    "teachers-list": "Teacher",
    course: "Course",
    message: "Message",
    "add-course": "Add Course",
    "edit-course": "Edit Course",
  };

  const defaultCrumbMap = {
    manager: "Overview",
    teacher: "Overview",
    student: "Overview",
    "students-list": "Student List",
    "teachers-list": "Teacher List",
    course: "All Courses",
  };

  const isDetail = (pathList) => {
    const lastPath = pathList[pathList.length - 1];
    const reg = /\[.*\]/;
    return reg.test(lastPath);
  };

  const router = useRouter();
  const pathList = router.pathname.split("/").slice(1);

  //remove [dynamic route] path
  const isDetailPath = isDetail(pathList);
  if (isDetailPath) {
    pathList.pop();
  }

  //map path to crumb value
  const crumbList = pathList.slice(1).map((item, index) => ({
    value: pathCrumbMap[item],
    href: "/" + pathList.slice(0, index + 2).join("/"),
  }));

  //add default crumb : overview
  const defaultPath = pathList[pathList.length - 1];
  if (defaultCrumbMap[defaultPath]) {
    crumbList.push({
      value: defaultCrumbMap[defaultPath],
      href: crumbList[crumbList.length - 1].href,
    });
  }

  //add Detail in the end
  if (isDetailPath) {
    crumbList.push({ value: "Detail" });
  }

  //add isLink
  const crumbLinkList = crumbList.map((item, index) => ({
    ...item,
    isLink: index !== 1 && index !== crumbList.length - 1,
  }));

  return crumbLinkList;
};

export default useGetCrumbByPath;
