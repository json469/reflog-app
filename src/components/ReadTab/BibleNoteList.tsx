import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import BibleNoteDetail from './BibleNoteDetail'

interface IProps {
    verses:any[]
}

interface IStates {
    notes:any[]
    loading:boolean
}

export default class BibleNoteList extends React.Component<IProps, IStates> {

    constructor(props:any) {
        super(props)

        this.state = {
            notes: [],
            loading: true,
        }

        this.fetchNotes()
    }

    public render() {

        const { notes, loading } = this.state

        if (loading) { return <CircularProgress className='loading' thickness={3}/>}

        return (

            <div className='bible-notelist'>
                
                {notes.map((note:any, index:number) => {
                    <BibleNoteDetail note={note} key={index}/>
                })}}

            </div>
        )
    }

    private fetchNotes() {

        const { verses } = this.props
        const { notes } = this.state

        verses.forEach( async (verse:string) => {
            const url = `https://api.esv.org/v3/passage/text/?q=${verse}&include-verse-numbers=false&include-footnotes=false&include-headings=false&include-short-copyright=false&include-passage-references=false&indent-poetry=false`
            const config = { method: 'GET', headers : { Authorization : '145dd9bb843cbbb7139f1bd00ee2d16cc151fe54'}}

            await fetch(url, config)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    notes: notes.concat(json),
                    loading: false,
                })
            })
        })

    }
}