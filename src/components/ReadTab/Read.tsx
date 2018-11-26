import * as React from 'react';
import { Typography, Paper } from '@material-ui/core';

import './ReadTab.css'

export default class Read extends React.Component<{}, {}> {

    constructor(props:any) {
        super(props)
    }

    public render() {

        return (

            <Paper className="bible">
                <Typography>
                    Test
                </Typography>
            </Paper>
        )
    }
}