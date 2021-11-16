import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Breadcrumb } from "antd";

// const BreadCrumb = () => {
//   const routes = [
//     {
//       path: "index",
//       breadcrumbName: "home",
//     },
//     {
//       path: "first",
//       breadcrumbName: "first",
//       children: [
//         {
//           path: "/general",
//           breadcrumbName: "General",
//         },
//         {
//           path: "/layout",
//           breadcrumbName: "Layout",
//         },
//         {
//           path: "/navigation",
//           breadcrumbName: "Navigation",
//         },
//       ],
//     },
//     {
//       path: "second",
//       breadcrumbName: "second",
//     },
//   ];

//   function itemRender(route, params, routes, paths) {
//     const last = routes.indexOf(route) === routes.length - 1;
//     return last ? (
//       <span>{route.breadcrumbName}</span>
//     ) : (
//       <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
//     );
//   }

//   return <Breadcrumb itemRender={itemRender} routes={routes} />;
// };

const BreadCrumb = () => {
  const router = useRouter();
  const path = router.pathname;
  const pathArr = path.split("/");
  const root = pathArr.slice(2, 3).join("/");

  return (
    <Breadcrumb style={{ margin: "16px 16px 0" }}>
      <Breadcrumb.Item>
        <Link href={root}>{"CMS " + root.toLocaleUpperCase() + " SYSTEM"}</Link>
      </Breadcrumb.Item>

    </Breadcrumb>
  );
};

export default BreadCrumb;
