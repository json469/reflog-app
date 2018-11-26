import * as React from 'react';

interface IProps {
    note:any
}

export default class BibleNoteDetail extends React.Component<IProps, {}> {

    constructor(props:any) {
        super(props)
    }

    public render() {

        const { note } = this.props

        return (

            <div className='bible-notedetail'>
                {note}
            </div>
        )
    }
}