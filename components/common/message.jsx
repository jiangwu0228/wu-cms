
import {
    BellOutlined,
    UserOutlined
  } from '@ant-design/icons';
  import {
    Avatar,
    Badge,
    Button,
    Col,
    Dropdown,
    Layout,
    List,
    message,
    notification,
    Space,
    Spin,
    Tabs
  } from 'antd';
  import { formatDistanceToNow } from 'date-fns';
  import Link from 'next/link';
  import React, { useEffect, useState } from 'react';
  import InfiniteScroll from 'react-infinite-scroll-component';
  import storage from '../../lib/services/storage';
  
  const { Header, Content, Sider } = Layout;

function Messages(props) {
  // const { paginator, setPaginator, hasMore, data, setData } = useListEffect<
  //   MessagesRequest,
  //   MessagesResponse,
  //   Message
  // >(apiService.getMessages.bind(apiService), 'messages', false, { type: props.type });

  useEffect(() => {
    if (props.clearAll && data && data.length) {
      const ids = data
        .filter((item) => item.status === 0)
        .map((item) => item.id);

      if (ids.length) {
        apiService.markAsRead(ids).then((res) => {
          if (res.data) {
            setData(data.map((item) => ({ ...item, status: 1 })));
          }

          if (props.onRead) {
            props.onRead(ids.length);
          }
        });
      } else {
        message.warn(`All of these ${props.type}s has been marked as read!`);
      }
    }
  }, [props.clearAll]);

  useEffect(() => {
    if (!!props.message && props.message.type === props.type) {
      setData([props.message, ...data]);
    }
  }, [props.message]);

  return (
    <InfiniteScroll
      next={() => setPaginator({ ...paginator, page: paginator.page + 1 })}
      hasMore={hasMore}
      loader={
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      }
      dataLength={data.length}
      endMessage={<div style={{ textAlign: "center" }}>No more</div>}
      scrollableTarget={props.scrollTarget}
    >
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            style={{ opacity: item.status ? 0.4 : 1 }}
            actions={[
              <Space>
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                })}
              </Space>,
            ]}
            onClick={() => {
              if (item.status === 1) {
                return;
              }
              apiService.markAsRead([item.id]).then((res) => {
                if (res.data) {
                  const target = data.find((msg) => item.id === msg.id);

                  target.status = 1;
                  setData([...data]);
                }

                if (props.onRead) {
                  props.onRead(1);
                }
              });
            }}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.from.nickname}
              description={item.content}
            />
          </List.Item>
        )}
      ></List>
    </InfiniteScroll>
  );
}

export function MessagePanel() {
  const types = ["notification", "message"];
  const [activeType, setActiveType] = useState("notification");
  const { msgStore, dispatch } = useMsgStatistic();
  // 为了让子组件监听到父组件中的状态
  const [clean, setClean] =
    useState <
    { [key in MessageType]: number } >
    {
      notification: 0,
      message: 0,
    };
  const [message, setMessage] = useState < Message > null;

  useEffect(() => {
    apiService.getMessageStatistic().then((res) => {
      const { data } = res;

      if (!!data) {
        const {
          receive: { notification, message },
        } = data;

        dispatch({
          type: "increment",
          payload: { type: "message", count: message.unread },
        });
        dispatch({
          type: "increment",
          payload: { type: "notification", count: notification.unread },
        });
      }
    });

    const sse = apiService.messageEvent();

    sse.onmessage = (event) => {
      let { data } = event;

      data = JSON.parse(data || {});

      if (data.type !== "heartbeat") {
        const content = data.content;

        if (content.type === "message") {
          notification.info({
            message: `You have a message from ${content.from.nickname}`,
            description: content.content,
          });
        }

        setMessage(content);
        dispatch({
          type: "increment",
          payload: { type: content.type, count: 1 },
        });
      }
    };

    return () => {
      sse.close();
      dispatch({ type: "reset" });
    };
  }, []);
  return (
    <Badge size="small" count={msgStore.total} offset={[10, 0]}>
      <HeaderIcon>
        <Dropdown
          overlayStyle={{
            background: "#fff",
            borderRadius: 4,
            width: 400,
            height: 500,
            overflow: "hidden",
          }}
          placement="bottomRight"
          trigger={["click"]}
          overlay={
            <>
              <Tabs
                renderTabBar={(props, DefaultTabBar) => (
                  <TabNavContainer>
                    <DefaultTabBar {...props} />
                  </TabNavContainer>
                )}
                onChange={(key) => {
                  if (key !== activeType) {
                    setActiveType(key);
                  }
                }}
                animated
              >
                {types.map((type) => (
                  <TabPane key={type} tab={`${type} (${msgStore[type]})`}>
                    <MessageContainer id={type}>
                      <Messages
                        type={type}
                        scrollTarget={type}
                        clearAll={clean[type]}
                        onRead={(count) => {
                          dispatch({
                            type: "decrement",
                            payload: { type, count },
                          });
                        }}
                        message={message}
                      />
                    </MessageContainer>
                  </TabPane>
                ))}
              </Tabs>

              <Footer justify="space-between" align="middle">
                <Col span={12}>
                  <Button
                    onClick={() =>
                      setClean({
                        ...clean,
                        [activeType]: ++clean[activeType],
                      })
                    }
                  >
                    Mark all as read
                  </Button>
                </Col>
                <Col span={12}>
                  <Button>
                    <Link href={`/dashboard/${storage.role}/message`}>
                      View history
                    </Link>
                  </Button>
                </Col>
              </Footer>
            </>
          }
        >
          <BellOutlined style={{ fontSize: 24, marginTop: 5 }} />
        </Dropdown>
      </HeaderIcon>
    </Badge>
  );
}
