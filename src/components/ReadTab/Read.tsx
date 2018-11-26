import * as React from 'react';
import { Typography, Paper } from '@material-ui/core';

import './ReadTab.css'
import BibleSearch from './BibleSearch';

export default class Read extends React.Component<{}, {}> {

    constructor(props:any) {
        super(props)
    }

    public render() {

        return (
            <div className='read-tab'>

                <BibleSearch />

                <Paper className='read-bible'>
                    <Typography>
                        Test
                    </Typography>
                </Paper>
                
            </div>
        )
    }
}