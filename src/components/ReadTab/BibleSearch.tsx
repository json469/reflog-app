import * as React from 'react';
import Axios from 'axios'

import { Button, CircularProgress, Dialog, DialogTitle, Slide, TextField, DialogActions, DialogContent } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

import BibleSearchResults from './BibleSearchResults'

interface IStates {
    dialogFAB: boolean
    searchField: string
    searchQuery: string
    searchResult: string
    searchResults: string[]
    loading: boolean
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
            loading: true,
        }

        this.openFAB = this.openFAB.bind(this)
        this.closeFAB = this.closeFAB.bind(this)
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this)
        this.searchByPassage = this.searchByPassage.bind(this)
        this.searchByPassageSearch = this.searchByPassageSearch.bind(this)
    }

    public render() {
        
        const { dialogFAB, searchQuery, searchResult, searchResults, loading } = this.state

        return (

            <div className='bible-search'>
                <Button
                    id='bible-fab'
                    color='secondary'
                    variant='extendedFab'
                    onClick={this.openFAB}
                >
                    <AddIcon />
                    verse
                </Button>
                <Dialog
                    TransitionComponent={Transition}
                    open={dialogFAB}
                    onClose={this.closeFAB}
                    fullWidth={true}
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                >   
                    <DialogTitle>
                        <TextField
                            id="filled-search"
                            label="Seach by passage or contents"
                            type="search"
                            margin="none"
                            variant="filled"
                            fullWidth={true}
                            onChange={(e) => this.onSearchFieldChange(e.target.value)}
                        />
                    </DialogTitle>

                    <DialogContent className='bible-search-results' >
                        {((searchResult !== "" ) && loading) ?
                            <div className='loading'>
                                <CircularProgress thickness={3}/>
                            </div>
                        :
                            <BibleSearchResults searchQuery={searchQuery} searchResult={searchResult} searchResults={searchResults} />
                        }
                    </DialogContent>

                    <DialogActions>
                        <Button 
                            color="primary"
                            onClick={this.searchByPassage}
                        >
                            Search
                        </Button>
                        <Button onClick={this.closeFAB} color="primary">
                            Cancel
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
            this.setState({
                searchField: "",
                searchQuery: "",
                searchResult: "",
                searchResults: [],
                loading: true,
            })
        this.setState({ dialogFAB: false })
    }

    private onSearchFieldChange(searchField: string) {
        this.setState({ searchField })
    }

    // Search by chapter first
    private searchByPassage() {

        // Clear our past state
        this.setState({
            searchQuery: "",
            searchResult: "",
            searchResults: [],
            loading: true,
        })

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
                'include-verse-numbers': 'true',
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
                        loading: false,
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
                'page-size': 100,
            }
        }

        Axios.get(url, config)
            .then(res => {

                const searchResults = res.data.results

                console.log(searchResults.toString())

                this.setState({
                    searchResults,
                    loading: false,
                })
            })
        
    }

}

function Transition(props:any) {
    return <Slide direction="up" {...props} />;
}