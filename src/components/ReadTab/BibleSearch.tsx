import * as React from 'react';
import Axios from 'axios'

import { Button, Dialog, DialogTitle, Slide, TextField, DialogActions, DialogContent, DialogContentText, Typography, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

interface IStates {
    dialogFAB: boolean
    searchField: string
    searchQuery: string
    searchResult: string
    searchResults: string[]
}

export default class BibleSearch extends React.Component<{}, IStates> {
    
    constructor(props:any) {
        super(props)

        this.state = {
            dialogFAB: false,
            searchField: "",
            searchQuery: "",
            searchResult: "",
            searchResults: [],
        }

        this.openFAB = this.openFAB.bind(this)
        this.closeFAB = this.closeFAB.bind(this)
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this)
        this.addVerse = this.addVerse.bind(this)
        this.searchByPassage = this.searchByPassage.bind(this)
        this.searchByPassageSearch = this.searchByPassageSearch.bind(this)
    }

    public render() {
        
        const { dialogFAB, searchQuery, searchResult, searchResults } = this.state

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

                    <DialogContent className='bible-search-field'>
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

                    <DialogContent className="bible-search-results">

                    {(searchResult !== "") ? 
                        <Paper className="bible-search-results-passage">
                            <Typography variant='h6'>
                                { searchQuery }
                            </Typography>
                            <Typography>
                                { searchResult }
                            </Typography>
                        </Paper>
                    :
                        <div>
                            {searchResults.map((result:any, index:number) => {
                                return (
                                    <Paper className="bible-search-results-passagesearch" key={index}>
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
                    }  




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
        this.setState({ searchField: ""})
        this.setState({ dialogFAB: false })
    }

    private onSearchFieldChange(searchField: string) {
        this.setState({ searchField })
    }

    private addVerse() {
        
        const { searchField } = this.state
        
        alert(searchField)
        this.searchByPassage()
    }

    // Search by chapter first
    private searchByPassage() {

        const { searchField } = this.state

        const url = 'https://api.esv.org/v3/passage/text/'
        const config = {
            headers : {
                Authorization : '145dd9bb843cbbb7139f1bd00ee2d16cc151fe54'
            },
            params : {
                'q': searchField,
                'include-headings': 'false',
                'include-footnotes': 'false',
                'include-verse-numbers': 'false',
                'include-short-copyright': 'false',
                'include-passage-references': 'false',
                'indent-poetry': 'false',
            }
        }

        Axios.get(url, config)
            .then(res => {
                
                const searchQuery = res.data.canonical
                const searchResult = res.data.passages[0]

                if (searchResult !== undefined) {

                    this.setState({
                        searchQuery,
                        searchResult,
                    })

                } else {
                    this.searchByPassageSearch()
                }
            })

    }

    // Then try search for verses
    private searchByPassageSearch() {

        const { searchField } = this.state

        const url = 'https://api.esv.org/v3/passage/search/'
        const config = {
            headers : {
                Authorization : '145dd9bb843cbbb7139f1bd00ee2d16cc151fe54'
            },
            params : {
                'q': searchField,
            }
        }

        Axios.get(url, config)
            .then(res => {

                const searchResults = res.data.results

                console.log(searchResults.toString())

                this.setState({
                    searchResults,
                })
            })
        
    }

}

function Transition(props:any) {
    return <Slide direction="up" {...props} />;
}