import * as React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import * as UrlPattern from 'url-pattern';
// import * as viewports from './constants/viewports';
// import { showMachine as showMachineAction } from '../../actionCreators/machines';
// import { showOperation as showOperationAction } from '../../actionCreators/operations';
// import { showTag as showTagAction } from '../../actionCreators/tags';
import { setViewport as setViewportAction } from '../actionCreators/viewport';
// import { getCurrentMachineId } from '../../reducers/machines';
// import { getCurrentOperationId } from '../../reducers/operations';
import { getLocation } from '../reducers/rootReducer';
// import { getCurrentTagName } from '../../reducers/tags';
import { getViewport } from '../reducers/viewport';

const VIEWPORT_ONLY_URL = new UrlPattern('/:viewport');
const VIEWPORT_WITH_OBJECT_ID_URL = new UrlPattern('/:viewport/:objectId');

type StateProps = {
  viewport: string | null;
  // currentMachineId: string | null;
  // currentTagId: string | null;
  // currentOperationId: string | null;
  location: {
    pathname: string;
  };
};

type DispatchProps = {
  push: (url: string) => void;
  setViewport: (viewport: string) => void;
  // showTag: (objectId: string) => void;
  // showMachine: (objectId: string) => void;
  // showOperation: (objectId: string) => void;
};

type Props = StateProps & DispatchProps;

class URLSync extends React.Component<Props> {
  updateStateFromUrl = () => {
    const { location, setViewport } = this.props;
    let matchResult;
    const locationPathname = encodeURI(location.pathname);

    matchResult = VIEWPORT_WITH_OBJECT_ID_URL.match(locationPathname);

    if (matchResult !== null) {
      setViewport(matchResult.viewport);
      // if (matchResult.viewport === viewports.SONGS) {
      //   showMachine(decodeURI(matchResult.objectId));
      // } else if (matchResult.viewport === viewports.PLAYLISTS) {
      //   showTag(decodeURI(matchResult.objectId));
      // }
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
    const { viewport, location, push } = this.props;
    let expectedUrl;

    // if (viewport && currentMachineId) {
    //   expectedUrl = VIEWPORT_WITH_OBJECT_ID_URL.stringify({ viewport, objectId: currentMachineId });
    // } else if (viewport && currentTagId) {
    //   expectedUrl = VIEWPORT_WITH_OBJECT_ID_URL.stringify({ viewport, objectId: currentTagId });
    // } else if (viewport && currentOperationId) {
    //   expectedUrl = VIEWPORT_WITH_OBJECT_ID_URL.stringify({ viewport, objectId: currentOperationId });
    // } else
    if (viewport) {
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

const mapStateToProps = (state: any) => {
  const viewport = getViewport(state.viewport);
  const location = getLocation(state);

  return {
    viewport,
    location,
  };
};

const ConnectedURLSync = connect<StateProps, DispatchProps>(
  mapStateToProps,
  {
    push: pushAction,
    setViewport: setViewportAction,
  },
)(URLSync);

export { ConnectedURLSync as URLSync };
