import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Space, Switch } from 'antd';

const BadgeComponent = () => {

  const [show, setShow] = useState(true);
  return (
    
      <Space size="large">
        <Badge dot={show}>
          <Avatar shape="square" size="large" />
        </Badge>
      </Space>

  );
};
export default BadgeComponent;