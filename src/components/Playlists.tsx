import { Form, Layout } from 'antd';
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
import { getPlaylistsState } from '../reducers/playlists';
import { getSongs, getSongsByIds } from '../reducers/songs';
import { AddOrEditPlaylistModal } from './AddOrEditPlaylistModal';
import { Songs } from './Songs';
const { Content } = Layout;
import { PlaylistsMenu } from './PlaylistsMenu';

const StyledLayout = styled(Layout)`
  height: 93vh;
`;

type StateProps = {
  songs: Song[];
  songsById: { [songId: string]: Song };
  isLoaded: boolean;
  isLoading: boolean;
  currentPlaylist: Playlist;
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


type Props = StateProps & DispatchProps;

type State = {
  modalVisible: boolean;
};

class Playlists extends React.Component<Props, State> {
  form: WrappedFormUtils;

  state = {
    modalVisible: false,
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
    const { currentPlaylist, editedPlaylist, songs } = this.props;

    return (
      <StyledLayout>
        <PlaylistsMenu showModal={this.showModal}/>
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
  const { isLoaded, isLoading, currentPlaylist, editedPlaylist } = getPlaylistsState(
    state,
  );
  return {
    songs: getSongs(state),
    songsById: getSongsByIds(state),
    isLoaded,
    isLoading,
    currentPlaylist,
    editedPlaylist,
  };
};

const ConnectedPlaylists = connect<StateProps, DispatchProps>(
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
