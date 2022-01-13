import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { click } from "@testing-library/user-event/dist/click";

function App() {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(0);
  const [point, setPoint] = useState(0);
  const [clicked, setClicked] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quizStart, setQuizStart] = useState("free");

  useEffect(() => {
    fetch("./quiz.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        setData(res);
      });
  }, []);

  function startorend(status) {
    setQuizStart(status);
    setActiveIndex(0);

    if (data[activeIndex]?.correct_answer === checked.split("-")[1]) {
      setPoint(point + 20);
    }
  }

  function answer() {
    if (data[activeIndex]?.correct_answer === checked.split("-")[1]) {
      setPoint(point + 20);
    }
    setActiveIndex(activeIndex + 1);
    setChecked();
  }

  function handleOptionChange2(changeEvent) {
    setChecked(changeEvent);
  }

  return (
    <div className="App">
      {quizStart === "start" ? (
        <div className="content">
          <h2>{data[activeIndex].question}</h2>
          {data[activeIndex]?.answers?.map((item, index) => {
            return (
              <>
                <label className="disabled">
                  <input
                    type="radio"
                    value={"option-" + item + "-" + index}
                    checked={checked === "option-" + item + "-" + index}
                    // onChange={handleOptionChange2}
                  />
                  <span>{item}</span>
                  <a
                    className={"option " + clicked}
                    onClick={() =>
                      handleOptionChange2("option-" + item + "-" + index)
                    }
                  >
                    {item}
                  </a>
                </label>
              </>
            );
          })}
          {activeIndex === data.length - 1 ? (
            <a className="button" onClick={() => startorend("end")}>
              Sınavı Bitir
            </a>
          ) : (
            <a className="button" onClick={() => answer()}>
              Cevapla
            </a>
          )}
        </div>
      ) : quizStart === "end" ? (
        <>
          <div className="point-area">
            <p className="point-title">Puanınız</p>
            <p className="point">
              {point} <span>XP</span>
            </p>
          </div>
        </>
      ) : (
        <div className="content">
          <a className="button" onClick={() => startorend("start")}>
            Sınavı başlat
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
