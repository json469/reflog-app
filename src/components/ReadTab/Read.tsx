import * as React from 'react';
import { Button, Dialog, Typography, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

import './ReadTab.css'

interface IStates {
    dialogFAB: boolean
}

export default class Read extends React.Component<{}, IStates> {

    constructor(props:any) {
        super(props)

        this.state = {
            dialogFAB: false,
        }

        this.openFAB = this.openFAB.bind(this)
        this.closeFAB = this.closeFAB.bind(this)
    }

    public render() {

        const { dialogFAB } = this.state

        return (
            <div className='read-tab'>

                <Paper className='read-bible'>
                    <Typography>
                        Test
                    </Typography>
                </Paper>

                <Button
                    id='read-fab'
                    color='secondary'
                    variant='fab'
                    onClick={this.openFAB}
                >
                    <AddIcon />
                </Button>

                <Dialog open={dialogFAB} onClose={this.closeFAB}>
                    <Typography>
                        Add new bible.
                    </Typography>
                </Dialog>

            </div>
        )
    }

    private openFAB() {
        this.setState({ dialogFAB: true })
    }

    private closeFAB() {
        this.setState({ dialogFAB: false })
    }
}