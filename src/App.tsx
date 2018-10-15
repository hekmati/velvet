import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
// import { URLSync } from './urlSync/urlSync'
import * as React from 'react';
import styled from 'styled-components';

const { Content, Header } = Layout;

const VelvetTitle = styled.div`
  width: 100px;
  float: left;
  text-align: center;  
  color: white;
  font-size: 20px;
  font-weight: 700;
`;


class App extends React.Component {
  public render() {
    return (
      <Layout>
        {/*<URLSync/>*/}
        <Header>
          <VelvetTitle>Velvet</VelvetTitle>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['songs']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="songs">Songs</Menu.Item>
            <Menu.Item key="playlists">Playlists</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {/*<div style={{ padding: 24, minHeight: 280 }}>Content</div>*/}
        </Content>
      </Layout>
    );
  }
}

export default App;
