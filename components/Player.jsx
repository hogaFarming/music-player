import React from 'react'

class Player extends React.Component {
    render() {
        let toggleBtnClass = this.props.isPlaying ? 'fa fa-pause' : 'fa fa-play'
        return (
            <div className="player">
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
