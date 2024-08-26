import React, { useState } from 'react';
import './Drawer.css'
import { Button, Drawer } from 'antd';
import BadgeComponent from '../Badge/Badge';
const DrawerComponent = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button shape='square' className='ant-design-button' onClick={showDrawer}>
        <BadgeComponent/>
      </Button>
      <Drawer title="Invites" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default DrawerComponent;