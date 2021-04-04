import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import 'rsuite/dist/styles/rsuite-default.css';

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (
      <div>
        <AppRouter />
      </div>
    );
  }
}

export default App;
