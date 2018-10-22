import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  songs: [
    {
      id: v4(),
      name: 'Beat.mp3',
    },
    {
      id: v4(),
      name: 'Dylan Song.mp3',
    },
    {
      id: v4(),
      name: 'Now Or Never.mp3',
    },
    {
      id: v4(),
      name: 'Latino Hip-Hop.mp3',
    },
  ],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchSongs = () => delay(300).then(() => fakeDatabase.songs);

// export const addTodo = (text) =>
//   delay(500).then(() => {
//     const todo = {
//       id: v4(),
//       text,
//       completed: false,
//     };
//     fakeDatabase.todos.push(todo);
//     return todo;
//   });
//
// export const toggleTodo = (id) =>
//   delay(500).then(() => {
//     const todo = fakeDatabase.todos.find(t => t.id === id);
//     todo.completed = !todo.completed;
//     return todo;
//   });
