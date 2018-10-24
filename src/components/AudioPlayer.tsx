import { Icon, Tooltip } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { nextSong as nextSongAction, prevSong as prevSongAction} from '../actionCreators/songs';
import { Song } from '../constants/types';
import { getCurrentSong } from '../reducers/songs';

const AudioPlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 93vh;
`;

const StyledImage = styled.img`
  display: block;
  height: 50vh;
  width: auto;
`;

const StyledIcon = styled(Icon)`
  font-size: 20px;
`;


type DispatchProps = {
  prevSong: () => void;
  nextSong: () => void;
};

type StateProps = {
  currentSong: Song;
};

type OwnProps = {};

type Props = StateProps & DispatchProps & OwnProps;

const AudioPlayer = ({ currentSong, nextSong, prevSong }: Props) => {
  const onClickPrev = () => {
    prevSong();
  };

  const onClickNext = () => {
    nextSong();
  };

  return (
    <AudioPlayerContainer>
      <StyledImage src={currentSong.photoURL} />
      <audio controls={true} key={currentSong.id} autoPlay={true}>
        <source src={`http://localhost:3000/${currentSong.name}`} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
      <div>
        <Tooltip title="Previous"><StyledIcon type="step-backward" theme="outlined" onClick={onClickPrev}/></Tooltip>
        <Tooltip title="Next"><StyledIcon type="step-forward" theme="outlined" onClick={onClickNext}/></Tooltip>
      </div>
    </AudioPlayerContainer>
  );
};

const mapStateToProps = state => {
  return {
    currentSong: getCurrentSong(state),
  };
};

const ConnectedAudioPlayer = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  { prevSong: prevSongAction, nextSong: nextSongAction},
)(AudioPlayer);
export { ConnectedAudioPlayer as AudioPlayer };
