import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

import './css/main.css'

let container = document.getElementById('container')
render(
    <App />,
    container
)