import React from 'react'
import Search from './Search'
import Details from './Details'
import Player from './Player'
import Progress from './Progress'
import Footer from './Footer'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            menuTracks: [],
            tracks: [],
            currentTrack: null,
            isPlaying: false,
            elapsed: 0,
            total: 0
        }
    }
    componentDidMount() {
        this.calculateAudioStuff()
    }
    calculateAudioStuff() {
        this.timeoutId = setInterval(() => {
            if (!this.state.currentTrack) {
                this.setState({
                    elapsed: 0,
                    total: 0
                })
                return
            }
            if (!this.state.isPlaying) return undefined
            let audio = this.refs.audio
            if (audio.ended) {
                this.trackControl('forward')
                return
            }
            this.setState({
                elapsed: audio.currentTime,
                total: audio.duration
            })
        }, 50)
    }
    handleChange(event, value) {
        this.setState({ searchValue: value })
        let url = 'http://tingapi.ting.baidu.com/v1/restserver/ting' +
            '?method=baidu.ting.search.catalogSug&query=' + value
        fetch(url).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data.song) return
            let song = data.song.map((item) => {
                return {
                    id: item.songid,
                    title: item.songname,
                    artist: item.artistname
                }
            }) || []
            this.setState({ menuTracks: song })
        })
    }
    handleSearchSelect(value, track) {
        if (typeof value === 'object') {
            track = value
            value = null
        }
        let url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.downWeb&songid=' +
            track.id + '&bit=24&_t=1393123213'
        this.setState({ tracks: this.state.menuTracks })
        fetch(url).then((response) => {
            return response.json()
        }).then((data) => {
            let track = {
                link: data.bitrate[0].file_link,
                id: data.songinfo.song_id,
                img: data.songinfo.pic_big,
                title: data.songinfo.title,
                author: data.songinfo.author
            }
            this.setState({
                currentTrack: track,
                isPlaying: true
            })
            if (value) this.setState({ searchValue: value })
        })
    }
    handlePosition(event) {
        if (!this.state.currentTrack) return undefined
        let progressWidth = event.target.offsetWidth
        let currentTime = event.nativeEvent.offsetX / progressWidth * this.state.total
        this.refs.audio.currentTime = currentTime
        this.setState({ elapsed: currentTime })
    }
    trackControl(type, position) {
        let total = this.state.tracks.length
        let currIndex = this.state.currentTrack ? this.state.tracks.findIndex((item) => {
            return item.id === this.state.currentTrack.id
        }) : -1
        let nextIndex = currIndex + 1 >= total ? 0         : currIndex + 1
        let prevIndex = currIndex - 1 <  0     ? total - 1 : currIndex - 1
        let randomIndex = Math.floor(Math.random() * total)
        let audio = this.refs.audio
        console.dir(audio)
        switch (type)
        {
        case 'forward':
            this.handleSearchSelect(this.state.tracks[nextIndex])
            // this.setState({ currentTrack: this.state.tracks[nextIndex], isPlaying: true })
            break
        case 'backward':
            this.handleSearchSelect(this.state.tracks[prevIndex])
            // this.setState({ currentTrack: this.state.tracks[prevIndex], isPlaying: true })
            break
        case 'random':
            this.handleSearchSelect(this.state.tracks[randomIndex])
            // this.setState({ currentTrack: this.state.tracks[randomIndex], isPlaying: true })
            break
        case 'stop':
            this.setState({ currentTrack: null, isPlaying: false })
            break
        case 'togglePlay':
            if (this.state.isPlaying) {
                audio.pause()
                this.setState({ isPlaying: false })
            } else if (!this.state.currentTrack) {
                this.setState({ currentTrack: this.state.tracks[0], isPlaying: true })
            } else {
                audio.play()
                this.setState({ isPlaying: true })
            }
            break
        case 'position':
            audio.currentTime = position
            this.setState({ elapsed: position })
        }
    }
    render() {
        let audioSrc = this.state.currentTrack  ? this.state.currentTrack.link : ''
        let bgSrc = this.state.currentTrack  ? this.state.currentTrack.img : ''
        let bgStyle = {
            backgroundImage: `linear-gradient(
                                rgba(0, 0, 0, 0.7),
                                rgba(0, 0, 0, 0.7)
                            ), url(${bgSrc})`
        }
        return (
            <div className="app" style={bgStyle}>
                <audio src={audioSrc} ref="audio" autoPlay></audio>
                <Search
                    tracks={this.state.menuTracks}
                    autoCompleteValue={this.state.searchValue}
                    handleChange={this.handleChange.bind(this)}
                    handleSelect={this.handleSearchSelect.bind(this)}
                />
                <Details title={this.state.currentTrack ? this.state.currentTrack.title : '暂无歌曲'} />
                <Player currentTrack={this.state.currentTrack}
                    isPlaying={this.state.isPlaying}
                    forward={this.trackControl.bind(this, 'forward')}
                    backward={this.trackControl.bind(this, 'backward')}
                    togglePlay={this.trackControl.bind(this, 'togglePlay')}
                    stop={this.trackControl.bind(this, 'stop')}
                    random={this.trackControl.bind(this, 'random')} />
                <Progress elapsed={this.state.elapsed} total={this.state.total}
                    handlePosition={this.handlePosition.bind(this)} />
                <Footer />
            </div>
        )
    }
}

export default App
