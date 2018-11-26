import * as React from 'react';
import './ReadTab.css'

import BibleSearch from './BibleSearch';
import BibleNoteList from './BibleNoteList';

export default class Read extends React.Component<{}, {}> {

    constructor(props:any) {
        super(props)
    }

    public render() {

        return (
            <div className='read-tab'>

                <BibleSearch />
                <BibleNoteList />

            </div>
        )
    }
}