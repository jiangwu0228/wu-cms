import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../../components/layout/dashboard/dashboardLayout";
import { getCourses } from "../../../api/api-services";
import InfiniteScroll from "react-infinite-scroll-component";
import "antd/dist/antd.css";
import { List, Divider, Spin, BackTop, Button } from "antd";
import storage from "../../../../lib/services/storage";

import CourseCard from "../../../../components/common/courseCard";

const AllCourses = () => {
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState(0);
  const [total, setTotal] = useState(0);

  const loadMoreData = async () => {
    const res = await getCourses(paginator + 1);
    if (!!res) {
      res.courses.forEach((course) => {
        setData((data) => [...data, course]);
      });
      // setData(...data, res.data.courses)
      setPaginator(res.paginator.page);
      setTotal(res.total);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <DashboardLayout>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < total}
        loader={<Spin size="large" />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="contentLayout"
        style={{ overflow: "hidden" }}
      >
        <List
          grid={{
            gutter: 14,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <CourseCard {...item}>
                <Button type="primary" style={{ marginTop: "10px" }}>
                  <a href={`/dashboard/${storage.role}/course/${item.id}`}>
                    Read More
                  </a>
                </Button>
              </CourseCard>
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
      <BackTop />
    </DashboardLayout>
  );
};

export default AllCourses;
