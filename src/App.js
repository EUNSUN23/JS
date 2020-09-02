import React, { PureComponent } from "react";
import "./App.css";

class Speed extends PureComponent {
  state = {
    status: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeout;
  startTime;
  endTime;
  onClickScreen = (e) => {
    const { status, message, result } = this.state;
    if (status === "waiting") {
      this.setState({ status: "ready", message: "초록색이 되면 클릭하세요" });
      this.timeout = setTimeout(() => {
        this.setState({ status: "now", message: "클릭하세요!" });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (status === "ready") {
      clearTimeout(this.timeout);
      this.setState({
        status: "waiting",
        message: "너무 성급하시네요. 초록색이 되면 클릭하세요",
      });
    } else if (status === "now") {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          status: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  resetOnclick = () => {
    this.setState({ result: [] });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <div>
        {/*result가 빈배열이 아니면 평균겂, 빈배열일때는 아무것도 안보이게하기*/}
        평균시간 :{result.reduce((a, c) => a + c) / result.length}
        ms
      </div>
    );
  };

  render() {
    const { status, message } = this.state;

    return (
      <>
        <div id="screen" className={status} onClick={this.onClickScreen}>
          {message}
        </div>
        <button onClick={this.resetOnclick}>reset</button>
        {this.renderAverage()}
      </>
    );
  }
}

export default Speed;
