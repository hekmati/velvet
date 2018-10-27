import { Button, Form, Icon, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { v4 } from 'node-uuid';
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
import { Playlist, Song } from '../constants/types';
import { getPlaylists, getPlaylistsState } from '../reducers/playlists';
import { getSongs, getSongsByIds } from '../reducers/songs';
import { AddOrEditPlaylistModal } from './AddOrEditPlaylistModal';
import { Songs } from './Songs';
const { Content, Sider } = Layout;

const MenuHeader = styled.h3`
  padding-top: 15px;
  color: white;
  margin-left: 14px;
  margin-right: 15px;
  font-weight: 700;
  display: flex
  justify-content: space-between
`;

const StyledLayout = styled(Layout)`
  height: 93vh;
`;

type StateProps = {
  songs: Song[];
  songsById: { [songId: string]: Song };
  playlists: Playlist[];
  isLoaded: boolean;
  isLoading: boolean;
  errorMessage: string;
  currentPlaylist: Playlist;
  currentPlaylistId: string;
  editedPlaylist: Playlist;
};

type DispatchProps = {
  loadPlaylists: () => void;
  loadSongs: () => void;
  selectPlaylist: (playlistId: string) => void;
  selectPlaylistForEdit: (playlistId: string) => void;
  addPlaylist: (playlist: Playlist) => void;
  editPlaylist: (playlist: Playlist) => void;
};

type OwnProps = {};
type Props = StateProps & DispatchProps & OwnProps;

type State = {
  modalVisible: boolean;
};

class Playlists extends React.Component<Props, State> {
  form: WrappedFormUtils;

  state = {
    modalVisible: false,
  };

  componentDidMount() {
    const { isLoaded, isLoading, loadPlaylists, loadSongs } = this.props;
    if (!isLoaded && !isLoading) {
      loadPlaylists();
      loadSongs();
    }
  }

  onSelect = ({ key }) => {
    this.props.selectPlaylist(key);
  };

  showModal = () => {
    const { isLoaded, isLoading, loadPlaylists } = this.props;
    if (!isLoaded && !isLoading) {
      loadPlaylists();
    }
    this.setState({
      modalVisible: true,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  saveFormRef = (form: Form) => {
    if (form !== null) {
      this.form = form.props.form;
    }
  };

  selectEditedPlaylist = (event, playlistId: string) => {
    const { selectPlaylistForEdit } = this.props;
    event.preventDefault();
    event.stopPropagation();
    selectPlaylistForEdit(playlistId);
    this.showModal();
  };

  addNewPlaylist = () => {
    const { selectPlaylistForEdit } = this.props;
    selectPlaylistForEdit(null);
    this.showModal();
  };

  addOrEditPlaylist = () => {
    const form = this.form;
    const { addPlaylist, editPlaylist, editedPlaylist, songsById } = this.props;
    form.validateFields((err, playlist) => {
      if (err) {
        return;
      }
      playlist.songs = playlist.songs.map(songId => songsById[songId]);

      if (editedPlaylist) {
        playlist.id = editedPlaylist.id;
        editPlaylist(playlist);
      } else {
        playlist.id = v4();
        addPlaylist(playlist);
      }
      form.resetFields();
      this.hideModal();
    });
  };

  render() {
    const { currentPlaylist, currentPlaylistId, editedPlaylist, playlists, songs } = this.props;

    return (
      <StyledLayout>
        <Sider width="20%">
          <MenuHeader>
            Playlists
            <Button type="primary" shape="circle" icon="plus" size="small" onClick={this.addNewPlaylist} />
          </MenuHeader>
          <Menu theme="dark" selectedKeys={[currentPlaylistId]} onSelect={this.onSelect}>
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
        <Content>{currentPlaylist && <Songs songs={currentPlaylist.songs} />}</Content>
        <AddOrEditPlaylistModal
          allSongs={songs}
          editedPlaylist={editedPlaylist}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modalVisible}
          onCancel={this.hideModal}
          onSubmit={this.addOrEditPlaylist}
        />
      </StyledLayout>
    );
  }
}

const mapStateToProps = state => {
  const { isLoaded, isLoading, errorMessage, currentPlaylist, currentPlaylistId, editedPlaylist } = getPlaylistsState(
    state,
  );
  return {
    songs: getSongs(state),
    songsById: getSongsByIds(state),
    playlists: getPlaylists(state),
    isLoaded,
    isLoading,
    errorMessage,
    currentPlaylist,
    currentPlaylistId,
    editedPlaylist,
  };
};

const ConnectedPlaylists = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  {
    loadPlaylists: loadPlaylistsAction,
    loadSongs: loadSongsAction,
    selectPlaylist: selectPlaylistAction,
    addPlaylist: addPlaylistAction,
    editPlaylist: editPlaylistAction,
    selectPlaylistForEdit: selectPlaylistForEditAction,
  },
)(Playlists);
export { ConnectedPlaylists as Playlists };
