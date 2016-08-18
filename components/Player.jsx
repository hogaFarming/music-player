import React from 'react'

class Player extends React.Component {
    render() {
        let audioSrc = this.props.currentTrack && ('media/' + this.props.currentTrack.title + '.mp3')
        // let audioSrc = 'media/海阔天空.mp3'
        let toggleBtnClass = this.props.isPlaying ? 'fa fa-pause' : 'fa fa-play'
        return (
            <div className="player">
                <audio src={audioSrc} autoPlay>
                    您的浏览器不支持 audio 标签。
                </audio>
                <button onClick={this.props.backward}>
                    <i className="fa fa-step-backward"></i>
                </button>
                <div className="player-center">
                    <button onClick={this.props.togglePlay}>
                        <i className={toggleBtnClass}></i>
                    </button>
                    <button onClick={this.props.stop}>
                        <i className="fa fa-stop"></i>
                    </button>
                    <button onClick={this.props.random}>
                        <i className="fa fa-random"></i>
                    </button>
                </div>
                <button onClick={this.props.forward}>
                    <i className="fa fa-step-forward"></i>
                </button>
            </div>
        )
    }
}

export default Player