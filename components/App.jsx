import React from 'react'
import Search from './Search'
import Details from './Details'
import Player from './Player'
import Progress from './Progress'
import Footer from './Footer'

let TRACKS = [
    { id: 1, title: '海阔天空' }
]

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            currentTrack: null
        }
    }
    componentDidMount() {

    }
    handleChange(event, value) {
        this.setState({ searchValue: value })
    }
    handleSearchSelect(value, track) {
        this.setState({
            searchValue: value,
            currentTrack: track
        })
    }
    render() {
        // let currentTrack = TRACKS[this.state.currentTrack]
        return (
            <div className="app">
                <Search
                    tracks={TRACKS}
                    autoCompleteValue={this.state.searchValue}
                    handleChange={this.handleChange.bind(this)}
                    handleSelect={this.handleSearchSelect.bind(this)}
                />
                <Details title={this.state.currentTrack ? this.state.currentTrack.title : '暂无歌曲'} />
                <Player currentTrack={this.state.currentTrack} />
                <Progress elapsed="2:35" total="3:45" />
                <Footer />
            </div>
        )
    }
}
