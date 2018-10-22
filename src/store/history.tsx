import createHistory from 'history/createBrowserHistory';

// Using browser history (the modern one, without `#`) as `react-router-redux`'s history.
const history = createHistory();

export default history;
