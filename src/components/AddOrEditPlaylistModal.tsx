import { Form, Input, Modal, Select } from 'antd';
import 'antd/dist/antd.css';
import { FormComponentProps } from 'antd/lib/form';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { editPlaylist as editPlaylistAction } from '../actions/playlists';
import { Playlist, Song } from '../constants/types';

const Option = Select.Option;


type DispatchProps = {
  editPlaylist: (playlist: Playlist) => void;
};

type OwnProps = {
  visible: boolean;
  allSongs: Song[];
  editedPlaylist: Playlist;
  onCancel: () => void;
  onSubmit: () => void;
  wrappedComponentRef?: any;
};

const FormItem = Form.Item;

type wrappedComponentProps = { form: any } & OwnProps & FormComponentProps;

class AddOrEditPlaylistModal extends React.Component<wrappedComponentProps, {}> {
  render() {
    const { editedPlaylist, visible, onCancel, onSubmit, form, allSongs } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal visible={visible} title="Create a new collection" okText="Submit" onCancel={onCancel} onOk={onSubmit}>
        <Form layout="vertical">
          <FormItem label="Playlist Name">
            {getFieldDecorator('name', {
              initialValue: editedPlaylist ? editedPlaylist.name : '',
              rules: [{ required: true, message: 'Please input the title of the playlist!' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="Songs">
            {form.getFieldDecorator('songs', {
              initialValue: editedPlaylist ? _.map(editedPlaylist.songs, 'id') : [],
            })(
              <Select mode="multiple" >
                {allSongs.map(song => (
                  <Option key={song.id} value={song.id}>
                    {song.name.replace('.mp3', '')} - {song.artist}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedAddOrEditPlaylistModal = Form.create()(AddOrEditPlaylistModal);


const ConnectedAddOrEditPlaylistModal = connect<{}, DispatchProps, OwnProps>(
  null,
  { editPlaylist: editPlaylistAction },
)(WrappedAddOrEditPlaylistModal);
export { ConnectedAddOrEditPlaylistModal as AddOrEditPlaylistModal };
