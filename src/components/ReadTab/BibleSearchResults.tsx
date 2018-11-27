import * as React from 'react';
import { Typography, Paper } from '@material-ui/core';

interface IProps {
    searchQuery: string
    searchResult: string
    searchResults: string[]
}

export default class BibleSearchResults extends React.Component<IProps, {}> {
    
    constructor(props:any) {
        super(props)
    }

    public render() {

        const { searchQuery, searchResult, searchResults } = this.props
        
        if (searchResult !== "") {

            return (
                <Paper className="bible-search-results-passage">
                    <Typography variant='h6'>
                        { searchQuery }
                    </Typography>
                    <Typography>
                        { searchResult }
                    </Typography>
                </Paper>
            )

        }
        
        if (searchResults !== []) {

            return (
                <div>
                    {searchResults.map((result:any, index:number) => {
                        return (
                            <Paper
                                key={index}
                                className="bible-search-results-passage"
                            >
                                <Typography variant='h6'>
                                    { result.reference }
                                </Typography>
                                <Typography>
                                    { result.content }
                                </Typography>
                            </Paper>
                        )
                    })}
                </div>
            )
        }

        return 
    }
}