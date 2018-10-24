import { Icon, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectPlaylist as selectPlaylistAction } from '../actionCreators/playlists';
import { loadPlaylists as loadPlaylistsAction } from '../actions/playlists';
import { Playlist } from '../constants/types';
import { getPlaylists, getPlaylistsState } from '../reducers/playlists';
import { Songs } from './Songs';
const { Content, Sider } = Layout;

const StyledLayout = styled(Layout)`
  height: 93vh;
`;

type StateProps = {
  playlists: Playlist[];
  isLoaded: boolean;
  isLoading: boolean;
  errorMessage: string;
  currentPlaylist: Playlist;
  currentPlaylistId: string;
};

type DispatchProps = {
  loadPlaylists: () => void;
  selectPlaylist: (playlistId: string) => void;
};

type OwnProps = {};
type Props = StateProps & DispatchProps & OwnProps;

const Playlists = ({ isLoaded, isLoading, playlists, currentPlaylistId, currentPlaylist, loadPlaylists, selectPlaylist }: Props) => {
  if (!isLoaded && !isLoading) {
    loadPlaylists();
  }

  const onSelect = ({ key }) => {
    selectPlaylist(key);
  };

  return (
    <StyledLayout>
      <Sider width="20%">
        <Menu theme="dark" selectedKeys={[currentPlaylistId]} onSelect={onSelect}>
          {playlists.map(playlist => (
            <Menu.Item key={playlist.id}>
              <Icon type="profile" theme="outlined" />
              <strong>{playlist.name}</strong>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content>{currentPlaylist && <Songs songs={currentPlaylist.songs}/>}</Content>
    </StyledLayout>
  );
};

const mapStateToProps = state => {
  const { isLoaded, isLoading, errorMessage, currentPlaylist, currentPlaylistId } = getPlaylistsState(state);
  return {
    playlists: getPlaylists(state),
    isLoaded,
    isLoading,
    errorMessage,
    currentPlaylist,
    currentPlaylistId,
  };
};

const ConnectedPlaylists = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  { loadPlaylists: loadPlaylistsAction, selectPlaylist: selectPlaylistAction },
)(Playlists);
export { ConnectedPlaylists as Playlists };
