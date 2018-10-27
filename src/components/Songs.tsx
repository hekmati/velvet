import { Icon, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectSong as selectSongAction } from '../actionCreators/songs';
import { loadSongs as loadSongsAction } from '../actions/songs';
import { Song } from '../constants/types';
import { getSongsState } from '../reducers/songs';
import { AudioPlayer } from './AudioPlayer';
const { Content, Sider } = Layout;

const StyledLayout = styled(Layout)`
  height: 93vh;
`;

type StateProps = {
  isLoaded: boolean;
  isLoading: boolean;
  errorMessage: string;
  currentSong: Song;
  currentSongId: string;
};

type DispatchProps = {
  loadSongs: () => void;
  selectSong: (songId: string) => void;
};

type OwnProps = {
  songs: Song[];
};
type Props = StateProps & DispatchProps & OwnProps;

const Songs = ({ isLoaded, isLoading, songs, currentSongId, currentSong, loadSongs, selectSong }: Props) => {
  if (!isLoaded && !isLoading) {
    loadSongs();
  }

  const onSelect = ({ key }) => {
    selectSong(key);
  };

  return (
    <StyledLayout>
      <Sider width="30%" style={{ marginLeft: '30px', background: '#fff' }}>
        <Menu selectedKeys={[currentSongId]} onSelect={onSelect}>
          {songs.map(song => (
            <Menu.Item key={song.id}>
              <Icon type="customer-service" theme="outlined" />
              <strong>{song.name.replace('.mp3', '')}</strong>
              <span> - {song.artist}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content>{currentSong && <AudioPlayer songsIds={songs.map(song => song.id)}/>}</Content>
    </StyledLayout>
  );
};

const mapStateToProps = state => {
  const { isLoaded, isLoading, errorMessage, currentSong, currentSongId } = getSongsState(state);
  return {
    isLoaded,
    isLoading,
    errorMessage,
    currentSong,
    currentSongId,
  };
};

const ConnectedSongs = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  { loadSongs: loadSongsAction, selectSong: selectSongAction },
)(Songs);
export { ConnectedSongs as Songs };
