import { Layout } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Main } from './components/Main';
import { Navbar } from './components/Navbar';
import { URLSync } from './components/urlSync';

const { Content } = Layout;

const VelvetApp = () => {
  return (
    <Layout style={{height:'100vh'}}>
      <URLSync/>
      <Navbar />
      <Content>
        <Main/>
      </Content>
    </Layout>
  );
};


const ConnectedVelvetApp = connect()(VelvetApp);
export { ConnectedVelvetApp as VelvetApp }
