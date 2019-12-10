import * as React from 'react';
import './style.css';

export default class App extends React.Component {
  public componentDidMount() {
    import('./lazyLoadedFile').then((mod) => {
      mod.default();
    });
  }
  public render() {
    return (
      <React.Fragment>
        <div className="container">Hello People</div>
      </React.Fragment>
    );
  }
}
