import React from "react";
import DashboardLayout from "../../../../components/layout/dashboard/dashboardLayout";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  // todo get student profile here;
  const id = context.params;
  return {
    props: id,
  };
}

const CourseId = (props) => {
  const router = useRouter();
  const id = router.query.id;

  console.log(id);
  return <DashboardLayout>this is course {props.id}</DashboardLayout>;
};

export default CourseId;
