import React from 'react'

class Progress extends React.Component {
    render() {
        let elapsedSeconds = getSeconds(this.props.elapsed)
        let totalSeconds = getSeconds(this.props.total)
        let position = elapsedSeconds / totalSeconds
        return (
            <div className="progress">
                <span>{this.props.elapsed}</span>
                <progress value={position} max="1"></progress>
                <span>{this.props.total}</span>
            </div>
        )
    }
}

function getSeconds(videoTime) {
    let split = videoTime.split(':')
    let minutes = split[0]
    let seconds = split[1] * 1
    return minutes * 60 + seconds
}

export default Progress