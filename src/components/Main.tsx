import { Row } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Song } from '../constants/types';
import * as viewports from '../constants/viewports';
import { getSongs } from '../reducers/songs';
import { getViewport } from '../reducers/viewport';
import { Playlists } from './Playlists';
import { Songs } from './Songs';

type ownProps = {};

type StateProps = {
  viewport: string;
  songs: Song[];
};

type Props = ownProps & StateProps;

class Main extends React.Component<Props, {}> {
  render() {
    const { songs, viewport } = this.props;

    let content;

    switch (viewport) {
      case viewports.SONGS:
        content = <Songs songs={songs} />;
        break;
      case viewports.PLAYLISTS:
        content = <Playlists />;
        break;
      default:
        content = null;
    }

    return (
      <div>
        <Row>{content}</Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    viewport: getViewport(state),
    songs: getSongs(state),
  };
};

const ConnectedMain = connect(mapStateToProps)(Main);

export { ConnectedMain as Main };
