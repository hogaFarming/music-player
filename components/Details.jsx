import React from 'react'

class Details extends React.Component {
    render() {
        return (
            <div className="details">
                <div className="details-title">{this.props.title}</div>
            </div>
        )
    }
}

export default Details