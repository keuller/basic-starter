import 'index.css'
import React from 'react'
import { render } from 'react-dom'

let App = (props) => (
    <main>
        <h2>Basic React Starter</h2>
    </main>
)

document.addEventListener('DOMContentLoaded', (evt) => {
    console.log('Basic React Starter')
    render(<App />, document.querySelector('#app'))
})
