const React = require("react");
const { useState, useRef } = React;

const GuGudan = () => {
  const [num1, setNum1] = useState(Math.ceil(Math.random() * 9));
  const [num2, setNum2] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(value) === num1 * num2) {
      setResult(`정답! : ${value}`);
      setValue("");
      setNum1(Math.ceil(Math.random() * 9));
      setNum2(Math.ceil(Math.random() * 9));
    } else {
      setResult("땡!");
      setValue("");
    }
  };
  return (
    <>
      <div id="question">
        {num1}곱하기{num2}는?
      </div>
      <form onSubmit={onSubmit}>
        <input type="number" value={value} onChange={onChange} />
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = GuGudan;
