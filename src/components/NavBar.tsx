import { AppBar, IconButton, Menu, MenuItem, Tab, Tabs, Toolbar, Typography} from '@material-ui/core/';
import MoreVertIcon  from '@material-ui/icons/MoreVert'
import * as React from 'react';

import '../App.css';

interface IProps {
    nightMode:boolean
    handleNightMode:any
    handleTabChange:any
}

interface IStates {
    tabValue:any
    openSetting:any
}

class NavBar extends React.Component<IProps, IStates> {

    constructor(props:any) {
        super(props)

        this.state = {
            tabValue: 0,
            openSetting: null,
        }
        
        this.handleSettingClose = this.handleSettingClose.bind(this)
        this.handleNightMode = this.handleNightMode.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    public render() {

        const { nightMode } = this.props
        const { tabValue, openSetting } = this.state

        return (
            
            <div className='navbar'>
                <AppBar position='static' color='inherit' >
                    <Toolbar>
                        <Typography variant='title' color='default'>
                            RefLog
                        </Typography>
                        
                        <div className="navbar-right">
                            <span className="navbar-right">

                                <IconButton
                                    color='inherit'
                                    aria-owns={openSetting ? 'simple-menu' : undefined}
                                    aria-haspopup="true"
                                    onClick={(event) => this.handleSettingOpen(event)}
                                >
                                    <MoreVertIcon />
                                </IconButton>

                                <Menu
                                    anchorEl={openSetting}
                                    open={Boolean(openSetting)}
                                    onClose={this.handleSettingClose}
                                >
                                    <MenuItem onClick={this.handleNightMode}>
                                        { (nightMode) ? 'Disable' : 'Enable'} Night Mode
                                    </MenuItem>
                                </Menu>

                            </span>
                                    
                            <span className="navbar-right">

                                <Tabs 
                                    value={tabValue}
                                    onChange={(event, value) => this.handleTabChange(value)}
                                >
                                    <Tab label="Read" value="read"/>
                                    <Tab label="Feed" value="feed"/>
                                    <Tab label="Pray" value="pray"/>
                                </Tabs>

                            </span>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    private handleTabChange(tabChange:any) {
        this.props.handleTabChange(tabChange)
    }

    private handleSettingOpen(e:any) {
        this.setState({ openSetting: e.currentTarget })
    }

    private handleSettingClose() {
        this.setState({ openSetting: null })
    }

    private handleNightMode() {
        this.handleSettingClose()
        this.props.handleNightMode()
    }
}

export default NavBar