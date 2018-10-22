import { Layout } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Navbar } from './components/Navbar';
import { URLSync } from './components/urlSync';

const { Content } = Layout;


// interface StateProps {
//   // viewport: string;
// }

// interface DispatchProps {
//   // setViewport: (viewport: string) => void;
// }

// type Props = StateProps & DispatchProps;

const VelvetApp = () => {
  return (
    <Layout>
      <URLSync/>
      <Navbar />
      <Content style={{ padding: '0 50px' }}>
        <div style={{ padding: 24, minHeight: 280 }}>Contento Mui Lindo</div>
      </Content>
    </Layout>
  );
};

// const mapStateToProps = state => {
//   return {
//     viewport: getViewport(state.viewport),
//   };
// };

const ConnectedVelvetApp = connect()(VelvetApp);
export { ConnectedVelvetApp as VelvetApp }
