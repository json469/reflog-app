import * as React from 'react';
import './App.css';

import NavBar from './components/navigations/NavBar'
import ThemeWrapper from './components/navigations/ThemeWrapper'

interface IStates {
  nightMode:boolean
}

class App extends React.Component<{}, IStates> {

  constructor(props: any) {
    super(props)
    this.state = {
      nightMode:false
    }

    this.handleNightMode = this.handleNightMode.bind(this)
  }

  public render() {
    return (
      <ThemeWrapper nightMode={this.state.nightMode}>
        <NavBar nightMode={this.state.nightMode} handleNightMode={this.handleNightMode}/>
      </ThemeWrapper>
    );
  }

  private handleNightMode() {
    this.setState({ nightMode : !this.state.nightMode })
  }
}

export default App;
