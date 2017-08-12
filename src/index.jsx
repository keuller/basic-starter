import 'index.css'
import React from 'react'
import { render } from 'react-dom'

let Sample = (props) => {
  return (<div>Basic React Starter</div>)
}

document.addEventListener('DOMContentLoaded', (evt) => {
  console.log('Basic React Starter')
  render(<Sample />, document.querySelector('#app'))
})
