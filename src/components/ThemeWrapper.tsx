import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import * as React from "react";

interface IProps {
    nightMode:boolean
}

interface IStates {
    theme:any
}

class ThemeWrapper extends React.Component<IProps, IStates> {
    
    constructor(props:any) {
        super(props)

        this.state = {
            theme: createMuiTheme({
                palette: { type : (this.props.nightMode) ? 'dark' : 'light' },
                typography: { fontFamily: 'Roboto', useNextVariants: true }
            })
        }
    }

    public componentWillReceiveProps(nextProps:any) {
        this.setState({
            theme: createMuiTheme({
                palette: { type : (nextProps.nightMode) ? 'dark' : 'light' },
                typography: { fontFamily: 'Roboto', useNextVariants: true }
            })
        })
    }

    public render() {

        const { theme } = this.state

        return (
            <MuiThemeProvider theme={theme}>
                {this.props.children}
            </MuiThemeProvider>
        )
    }
}

export default ThemeWrapper;