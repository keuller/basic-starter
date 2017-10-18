import 'index.css'
import React from 'react'
import { render } from 'react-dom'

let App = (props) => (
    <main>
        <h2>Basic React Boilerplate</h2>
    </main>
)

document.addEventListener('DOMContentLoaded', (evt) => {
    console.log('Basic React Starter')
    render(<App />, document.querySelector('#app'))
})
