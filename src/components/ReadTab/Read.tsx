import * as React from 'react';
import { Button, Typography, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

import './ReadTab.css'

export default class Read extends React.Component<{}, {}> {

    constructor(props:any) {
        super(props)
    }

    public render() {

        return (
            <div className='read-tab'>

                <Paper className='read-bible'>
                    <Typography>
                        Test
                    </Typography>
                </Paper>

                <Button id='read-fab' variant='fab'>
                    <AddIcon />
                </Button>

            </div>
        )
    }
}