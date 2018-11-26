import * as React from 'react';
import './ReadTab.css'

import BibleSearch from './BibleSearch';
import BibleNoteList from './BibleNoteList';

interface IStates {
    verses:any[]
}

export default class Read extends React.Component<{}, IStates> {

    constructor(props:any) {
        super(props)

        this.state = {
            verses: []
        }
    }

    public render() {

        const { verses } = this.state

        return (
            <div className='read-tab'>

                <BibleSearch />
                <BibleNoteList verses={verses} />

            </div>
        )
    }
}