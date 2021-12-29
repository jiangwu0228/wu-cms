import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Breadcrumb } from "antd";
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import useGetCrumbByPath from "../../lib/hooks/getBreadCrumb";

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

const BreadCrumb = (props) => {
  // const router = useRouter();
  // const path = router.pathname;
  // const pathArr = path.split("/");
  // const root = pathArr.slice(2, 3).join("/");
  const crumbLinkList = props.crumbLinkList;

  return (
    <Breadcrumb style={{ margin: '0 16px', padding: 16 }}>
      {crumbLinkList.map((item, index) =>
        item.isLink ? (
          <BreadcrumbItem key={index} href={item.href}>
            {item.value}
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={index}>{item.value}</BreadcrumbItem>
        )
      )}
    </Breadcrumb>
  );
};

export default BreadCrumb;
