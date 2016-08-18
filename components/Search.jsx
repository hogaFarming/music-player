import React from 'react'
import Autocomplete from 'react-autocomplete'

class Search extends React.Component {
    handleRenderItem(item, isHighlighted) {
        return (
            <div style={isHighlighted ? {color: 'blue'} : {}}>
                {item.title}
            </div>
        )
    }
    shouldItemRender(item, value) {
        return !value || item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
    render() {
        return (
            <div className="search">
                <Autocomplete
                    wrapperProps={{className: 'search-autocomplete'}}
                    wrapperStyle={{display: 'block'}}
                    ref="autocomplete"
                    inputProps={{title: 'Title'}}
                    shouldItemRender={this.shouldItemRender.bind(this)}
                    value={this.props.autoCompleteValue}
                    items={this.props.tracks}
                    getItemValue={(item) => item.title}
                    onSelect={this.props.handleSelect}
                    onChange={this.props.handleChange}
                    renderItem={this.handleRenderItem}
                />
            </div>
        )
    }
}

export default Search