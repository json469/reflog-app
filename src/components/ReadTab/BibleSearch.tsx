import * as React from 'react';

import { Button, Dialog, DialogTitle, Slide, TextField, DialogActions, DialogContent, DialogContentText, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

interface IStates {
    dialogFAB: boolean
    searchField: string
}

export default class BibleSearch extends React.Component<{}, IStates> {
    
    constructor(props:any) {
        super(props)

        this.state = {
            dialogFAB: false,
            searchField: "",
        }

        this.openFAB = this.openFAB.bind(this)
        this.closeFAB = this.closeFAB.bind(this)
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this)
        this.addVerse = this.addVerse.bind(this)
    }

    public render() {
        
        const { dialogFAB } = this.state

        return (
            
            <div className='bible-search'>
                <Button
                    id='bible-fab'
                    color='secondary'
                    variant='fab'
                    onClick={this.openFAB}
                >
                    <AddIcon />
                </Button>
                <Dialog
                    TransitionComponent={Transition}
                    open={dialogFAB}
                    onClose={this.closeFAB}
                >
                    <DialogTitle>
                        Add a new verse
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Seach by chapter or by contents
                        </DialogContentText>
                        <TextField
                            id="filled-search"
                            label="Search field"
                            type="search"
                            margin="none"
                            variant="filled"
                            onChange={(e) => this.onSearchFieldChange(e.target.value)}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.closeFAB} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addVerse} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                    
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

    private onSearchFieldChange(searchField: string) {
        this.setState({ searchField })
    }

    private addVerse() {
        
        const { searchField } = this.state
        
        alert(searchField)
        this.closeFAB()
    }

}

function Transition(props:any) {
    return <Slide direction="up" {...props} />;
}