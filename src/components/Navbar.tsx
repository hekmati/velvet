import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setViewport as setViewportAction } from '../actionCreators/viewport';
import * as viewports from '../constants/viewports';
import { getViewport } from '../reducers/viewport';

const { Header } = Layout;

const Title = styled.div`
  width: 100px;
  float: left;
  text-align: center;
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

type StateProps = {
  viewport: string;
}

type DispatchProps = {
  setViewport: (viewport: string) => void;
}

type OwnProps = {};

type Props = StateProps & DispatchProps & OwnProps;

const Navbar = ({ viewport, setViewport }: Props) => {
  const onMenuClick = ({ key }) => {
    setViewport(key);
  };

  return (
    <Header>
      <Title>Velvet</Title>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[viewport]}
        style={{ lineHeight: '64px' }}
        onClick={onMenuClick}
      >
        <Menu.Item key={viewports.SONGS}>Songs</Menu.Item>
        <Menu.Item key={viewports.PLAYLISTS}>Playlists</Menu.Item>
      </Menu>
    </Header>
  );
};

const mapStateToProps = state => {
  return {
    viewport: getViewport(state),
  };
};

const ConnectedNavbar = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  { setViewport: setViewportAction },
)(Navbar);
export { ConnectedNavbar as Navbar }
