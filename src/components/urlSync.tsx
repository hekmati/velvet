import * as React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import * as UrlPattern from 'url-pattern';
import { selectPlaylist as selectPlaylistAction } from '../actionCreators/playlists';
import { selectSong as selectSongAction } from '../actionCreators/songs';
import { setViewport as setViewportAction } from '../actionCreators/viewport';
import * as viewports from '../constants/viewports';
import { getCurrentPlaylist } from '../reducers/playlists';
import { getLocation } from '../reducers/rootReducer';
import { getCurrentSong } from '../reducers/songs';
import { getViewport } from '../reducers/viewport';

const VIEWPORT_ONLY_URL = new UrlPattern('/:viewport');
const VIEWPORT_WITH_OBJECT_ID_URL = new UrlPattern('/:viewport/:objectId');

type StateProps = {
  viewport: string | null;
  currentSongId: string | null;
  currentPlaylistId: string | null;
  location: {
    pathname: string;
  };
};

type DispatchProps = {
  push: (url: string) => void;
  setViewport: (viewport: string) => void;
  selectSong: (objectId: string) => void;
  selectPlaylist: (objectId: string) => void;
};

type Props = StateProps & DispatchProps;

class URLSync extends React.Component<Props> {
  updateStateFromUrl = () => {
    const { location, setViewport, selectPlaylist, selectSong } = this.props;
    let matchResult;
    const locationPathname = encodeURI(location.pathname);

    matchResult = VIEWPORT_WITH_OBJECT_ID_URL.match(locationPathname);

    if (matchResult !== null) {
      setViewport(matchResult.viewport);
      if (matchResult.viewport === viewports.SONGS) {
        selectSong(decodeURI(matchResult.objectId));
      } else if (matchResult.viewport === viewports.PLAYLISTS) {
        selectPlaylist(decodeURI(matchResult.objectId));
      }
      return;
    }

    matchResult = VIEWPORT_ONLY_URL.match(locationPathname);

    if (matchResult !== null) {
      setViewport(matchResult.viewport);
      return;
    }

    throw new Error(`Invalid URL was given
     ${locationPathname}`);
  };

  updateUrlFromState = () => {
    const { viewport, location, push, currentSongId, currentPlaylistId } = this.props;
    let expectedUrl;

    if (viewport === viewports.SONGS && currentSongId) {
      expectedUrl = VIEWPORT_WITH_OBJECT_ID_URL.stringify({ viewport, objectId: currentSongId });
    } else if (viewport === viewports.PLAYLISTS && currentPlaylistId) {
      expectedUrl = VIEWPORT_WITH_OBJECT_ID_URL.stringify({ viewport, objectId: currentPlaylistId });
    } else if (viewport) {
      expectedUrl = VIEWPORT_ONLY_URL.stringify({ viewport });
    } else {
      throw new Error(`Invalid state was provided ${JSON.stringify(this.props)}, URL cannot be computed`);
    }

    expectedUrl = decodeURI(expectedUrl);
    if (expectedUrl !== location.pathname) {
      push(expectedUrl);
    }
  };

  componentWillMount() {
    const { location } = this.props;

    // Before mounting (when the app is starting) we parse the URL and update the state (if the URL is not just '/').
    if (location.pathname === '/') {
      // Default values are set by the reducers, we just need to update the URL.
      this.updateUrlFromState();
    } else {
      this.updateStateFromUrl();
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;

    // On location updates (back/forward by the user), we update the state.
    // Other updates are to the state, for which we update the URL.
    if (prevLocation !== location) {
      this.updateStateFromUrl();
    } else {
      this.updateUrlFromState();
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  const viewport = getViewport(state);
  const location = getLocation(state);
  const currentSong = getCurrentSong(state);
  const currentPlaylist = getCurrentPlaylist(state);
  const currentSongId = currentSong ? currentSong.id : null;
  const currentPlaylistId = currentPlaylist ? currentPlaylist.id : null;

  return {
    viewport,
    location,
    currentSongId,
    currentPlaylistId,
  };
};

const ConnectedURLSync = connect<StateProps, DispatchProps>(
  mapStateToProps,
  {
    push: pushAction,
    selectPlaylist: selectPlaylistAction,
    selectSong: selectSongAction,
    setViewport: setViewportAction,
  },
)(URLSync);

export { ConnectedURLSync as URLSync };
