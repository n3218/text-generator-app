import React, { Component } from "react"

export default class TextGenerator extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      paragraphs: 1,
      results: []
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentDidMount() {
    this.fetchText()
  }

  fetchText() {
    this.setState({ isLoading: true })
    let url = "https://baconipsum.com/api/?type=meat-and-filler&paras=" + this.state.paragraphs
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ results: data, isLoading: false })
      })
  }
  shouldComponentUpdate() {
    return true
  }

  onChangeHandler(e) {
    console.log(e.target.value)
    this.setState({ paragraphs: e.target.value }, () => this.fetchText())
  }

  displayResults() {
    if (this.state.isLoading) {
      return <p>Loading...</p>
    } else {
      return this.state.results.map((p, i) => <p key={i}>{p}</p>)
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="text-container">
        <h1>Text Generator</h1>
        <div className="text-controls">
          <h2>Real time options:</h2>
          <p>Paragraphs:</p>
          <input min="1" onChange={this.onChangeHandler} type="number" value={this.state.paragraphs} />
        </div>
        <div className="text-result">{this.displayResults()}</div>
      </div>
    )
  }
}
