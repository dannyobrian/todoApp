import React, {Component} from 'react'
import globalstyle from '../../stylesheets/style.scss'

export default class Header extends Component {
  componentDidMount() {
    document.title = 'Todo list';
  }
  render() {
    return (
      <header className="Header">Header</header>
    )
  }
}


