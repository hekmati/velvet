import { Button, Icon, Layout, Menu } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  selectPlaylist as selectPlaylistAction,
  selectPlaylistForEdit as selectPlaylistForEditAction,
} from '../actionCreators/playlists';
import {
  addPlaylist as addPlaylistAction,
  editPlaylist as editPlaylistAction,
  loadPlaylists as loadPlaylistsAction,
} from '../actions/playlists';
import { loadSongs as loadSongsAction } from '../actions/songs';
import { Playlist } from '../constants/types';
import { getPlaylists, getPlaylistsState } from '../reducers/playlists';

const { Sider } = Layout;

const MenuHeader = styled.h3`
  padding-top: 15px;
  color: white;
  margin-left: 14px;
  margin-right: 15px;
  font-weight: 700;
  display: flex
  justify-content: space-between
`;

type StateProps = {
  playlists: Playlist[];
  isLoaded: boolean;
  isLoading: boolean;
  errorMessage: string;
  currentPlaylistId: string;
};

type DispatchProps = {
  loadPlaylists: () => void;
  loadSongs: () => void;
  selectPlaylist: (playlistId: string) => void;
  selectPlaylistForEdit: (playlistId: string) => void;
  addPlaylist: (playlist: Playlist) => void;
  editPlaylist: (playlist: Playlist) => void;
};

type OwnProps = {
  showModal: () => void;
};
type Props = StateProps & DispatchProps & OwnProps;


class PlaylistsMenu extends React.Component <Props, {}> {

  componentDidMount() {
    const { isLoaded, isLoading, loadPlaylists, loadSongs } = this.props;
    if (!isLoaded && !isLoading) {
      loadPlaylists();
      loadSongs();
    }
  }

  onSelectPlaylist = ({ key }) => {
    this.props.selectPlaylist(key);
  };


  selectEditedPlaylist = (event, playlistId: string) => {
    const { selectPlaylistForEdit, showModal } = this.props;
    event.preventDefault();
    event.stopPropagation();
    selectPlaylistForEdit(playlistId);
    showModal();
  };

  addNewPlaylist = () => {
    const { selectPlaylistForEdit, showModal } = this.props;
    selectPlaylistForEdit(null);
    showModal();
  };

  render() {
    const { currentPlaylistId, playlists } = this.props;
    return (
      <Sider width="20%">
          <MenuHeader>
            Playlists
            <Button type="primary" shape="circle" icon="plus" size="small" onClick={this.addNewPlaylist} />
          </MenuHeader>
          <Menu theme="dark" selectedKeys={[currentPlaylistId]} onSelect={this.onSelectPlaylist}>
            {playlists.map(playlist => (
              <Menu.Item key={playlist.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Icon type="profile" theme="outlined" />
                  <strong>{playlist.name}</strong>
                </div>
                <Button
                  shape="circle"
                  icon="edit"
                  size="small"
                  onClick={event => this.selectEditedPlaylist(event, playlist.id)}
                  style={{
                    marginTop: '7px',
                    paddingLeft: '3px',
                  }}
                />
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
    )

  }
}

const mapStateToProps = state => {
  const { isLoaded, isLoading, errorMessage, currentPlaylistId } = getPlaylistsState(
    state,
  );
  return {
    playlists: getPlaylists(state),
    isLoaded,
    isLoading,
    errorMessage,
    currentPlaylistId
  };
};

const ConnectedPlaylistsMenu = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
    {
    loadPlaylists: loadPlaylistsAction,
    loadSongs: loadSongsAction,
    selectPlaylist: selectPlaylistAction,
    addPlaylist: addPlaylistAction,
    editPlaylist: editPlaylistAction,
    selectPlaylistForEdit: selectPlaylistForEditAction,
  },
)(PlaylistsMenu);
export { ConnectedPlaylistsMenu as PlaylistsMenu }
