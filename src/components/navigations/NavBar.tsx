import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core/';
import MoreVertIcon  from '@material-ui/icons/MoreVert'
import * as React from 'react';

interface IProps {
    nightMode:boolean
    handleNightMode:any
}

interface IStates {
    anchorEl:any
}

class NavBar extends React.Component<IProps, IStates> {

    constructor(props:any) {
        super(props)

        this.state = {
            anchorEl: null,
        }

        this.handleNightMode = this.handleNightMode.bind(this)
    }

    public render() {

        const { nightMode } = this.props
        const { anchorEl } = this.state

        return (

            <div className='navbar'>
                <AppBar position='static' color='inherit' >
                    <Toolbar >
                        <Typography variant='title' color='default'>
                            RefLog
                        </Typography>
                        <div className="navbar-right">
                            <span className="navbar-right">
                                <IconButton
                                    color='inherit'
                                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleOpen(e)}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleNightMode}>
                                        { (nightMode) ? 'Disable' : 'Enable'} Night Mode
                                    </MenuItem>
                                </Menu>

                            </span>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    private handleOpen(e:any) {
        this.setState({ anchorEl: e.currentTarget })
    }

    private handleClose() {
        this.setState({ anchorEl: null })
    }

    private handleNightMode() {
        this.props.handleNightMode()
        this.handleClose()
    }
}

export default NavBar