import {Row} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import * as viewports from '../constants/viewports';
import {getViewport} from '../reducers/viewport';
import { Songs } from './Songs';

type ownProps = {};

type StateProps = {
  viewport: string;
};

type Props = ownProps & StateProps;

class Main extends React.Component<Props, {}> {
  render() {
    const {viewport} = this.props;

    let content;

    switch (viewport) {
      case viewports.SONGS:
        content = <Songs />;
        break;
      // case viewports.PLAYLISTS:
      //   content = <Playlists />;
      //   break;
      default:
        content = null;
    }

    return (
      <div>
        <Row >{content}</Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    viewport: getViewport(state),
  };
};

const ConnectedMain = connect(mapStateToProps)(Main);

export {ConnectedMain as Main};
