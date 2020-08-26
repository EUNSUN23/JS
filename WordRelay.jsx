const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  state = {
    text: "은선",
    value: "",
    result: "",
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSubmit = (e) => {
    const word = this.state.text;
    const answer = this.state.value;
    e.preventDefault();
    if (answer[0] === word[word.length - 1]) {
      this.setState((prevState) => {
        return {
          result: "정답!",
          text: prevState.value,
          value: "",
        };
      });
      this.input.focus();
    } else {
      this.setState({
        result: "땡!",
        value: "",
      });
      this.input.focus;
    }
  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };
  render() {
    return (
      <>
        <div>{this.state.text}</div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="wordInput">글자를 입력하세요</label>
          <input
            className="wordInput"
            ref={this.onRefInput}
            type="text"
            value={this.state.value}
            onChange={this.onChange}
          />
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
