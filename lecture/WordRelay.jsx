const React = require("react"); //컴포넌트 분리할땐 쓰이는 파일 불러오기. 여기서는 react 불러온것.
const { Component } = React; // extends React.Component -> extends Component

class WordRelay extends Component {
  state = {
    text: "hello webpack",
  };
  render() {
    return <h1>{this.state.text}</h1>;
  }
}

module.exports = WordRelay; //쪼갠 파일에서 필요한 부분3. 1,2 는 맨 위 두줄
