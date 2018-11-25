import * as React from 'react';
import './App.css';

import { CssBaseline } from '@material-ui/core';
import NavBar from './components/NavBar'
import ThemeWrapper from './components/ThemeWrapper'

import Read from './components/Read'
import Feed from './components/Feed'
import Pray from './components/Pray'


interface IStates {
  nightMode:boolean
  tabChange:string
}

class App extends React.Component<{}, IStates> {

  constructor(props: any) {
    super(props)
    this.state = {
      nightMode:false,
      tabChange:'read',
    }

    this.handleNightMode = this.handleNightMode.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  public render() {

    const { tabChange } = this.state

    return (
      <ThemeWrapper nightMode={this.state.nightMode}>
        <CssBaseline />
        <NavBar nightMode={this.state.nightMode} handleNightMode={this.handleNightMode} handleTabChange={this.handleTabChange}/>
        {(tabChange === 'read') ? <Read /> : ''}
        {(tabChange === 'feed') ? <Feed /> : ''}
        {(tabChange === 'pray') ? <Pray /> : ''}
      </ThemeWrapper>
    );
  }
  
  private handleNightMode() {
    this.setState({ nightMode : !this.state.nightMode })
  }

  private handleTabChange(tabChange:string) {
    this.setState({ tabChange })
  }
}

export default App;
