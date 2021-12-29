import { AlertOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, List, Row, Select, Space, Spin, Typography } from 'antd';
import { format } from 'date-fns';
import { flatten } from 'lodash';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import DashboardLayout from '../../../components/layout/dashboard/dashboardLayout';
const Message = () => {
    return (
        <DashboardLayout>
            message works!
        </DashboardLayout>
    );
}

export default Message;
