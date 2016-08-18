import React from 'react'

class Progress extends React.Component {
    render() {
        let elapsed = this.props.elapsed
        let total = this.props.total
        let position = total === 0 ? '0' : elapsed / total
        return (
            <div className="progress">
                <span>{formatSeconds(elapsed)}</span>
                <progress value={position} max="1" onClick={this.props.handlePosition}></progress>
                <span>{formatSeconds(total)}</span>
            </div>
        )
    }
}

function formatSeconds(seconds) {
    let minutes = ('00' + Math.floor(seconds / 60)).slice(-2)
    let secs = ('00' + Math.floor(seconds % 60)).slice(-2)
    return minutes + ':' + secs
}

export default Progress
