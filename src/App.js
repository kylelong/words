import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  let initialWords = JSON.parse(localStorage.getItem("words")) || [];
  const [vocab, setVocab] = useState("");
  const [word, setWord] = useState("");
  const [speech, setSpeech] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [load, setLoad] = useState(false);
  const [words, setWords] = useState(initialWords);
  const [exist, setExist] = useState(false);
  const [err, setErr] = useState(false);
  function addToList() {
    setExist(false);
    let list = words;
    if (!err) {
      //the word is valid
      if (!list.includes(word)) {
        //and does not exists in the saved list
        setWords((prevArray) => [...prevArray, word]);
      } else {
        setExist(true);
      }
    }
  }
  function searchWord() {
    setWord(vocab);
    setLoad(true);
    if (load && word === "") {
      setErr(true);
    }
  }
  function viewWord(e) {
    setLoad(true);
    setWord(e.target.innerText);
  }
  useEffect(() => {
    setExist(false);
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    Axios.get(url)
      .then((response) => {
        setErr(false);
        setWord(response.data[0].word);
        setSpeech(response.data[0].meanings[0].partOfSpeech);
        setDefinition(response.data[0].meanings[0].definitions[0].definition);
        setExample(response.data[0].meanings[0].definitions[0].example);
      })
      .catch((error) => {
        setErr(true);
        setWord("");
        setSpeech("");
        setDefinition("");
        setExample("");
      });
    let list = words;
    localStorage.setItem("words", JSON.stringify(list));
  }, [word, words, err]);

  return (
    <>
      <div id="header">
        <div className="wave-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#F3F4F5"
              fillOpacity="1"
              d="M0,0L24,0C48,0,96,0,144,42.7C192,85,240,171,288,202.7C336,235,384,213,432,176C480,139,528,85,576,74.7C624,64,672,96,720,122.7C768,149,816,171,864,202.7C912,235,960,277,1008,250.7C1056,224,1104,128,1152,106.7C1200,85,1248,139,1296,138.7C1344,139,1392,85,1416,58.7L1440,32L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
            ></path>
          </svg>
        </div>
        <svg
          id="one"
          className="shapes"
          viewbox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
                M 0, 21
                C 0, 5.25 5.25, 0 21, 0
                S 42, 5.25 42, 21
                    36.75, 42 21, 42
                    0, 36.75 0, 21
            "
            fill="#FADB5F"
          ></path>
        </svg>

        <svg
          className="shapes"
          id="two"
          viewbox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
                M 0, 11.5
                C 0, 10.35 10.35, 0 11.5, 0
                S 23, 10.35 23, 11.5
                    12.65, 23 11.5, 23
                    0, 12.65 0, 11.5
            "
            fill="#2186EB"
          ></path>
        </svg>

        <svg
          id="three"
          className="shapes"
          viewbox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
                M 0, 17
                C 0, 7.819999999999999 7.819999999999999, 0 17, 0
                S 34, 7.819999999999999 34, 17
                    26.18, 34 17, 34
                    0, 26.18 0, 17
            "
            fill="#31B237"
          ></path>
        </svg>

        <svg
          className="shapes"
          id="four"
          viewbox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
                M 0, 15.5
                C 0, 11.004999999999999 11.004999999999999, 0 15.5, 0
                S 31, 11.004999999999999 31, 15.5
                    19.995, 31 15.5, 31
                    0, 19.995 0, 15.5
            "
            fill="#EF4E4E"
          ></path>
        </svg>

        <svg
          className="shapes"
          id="five"
          viewbox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
                M 0, 15.5
                C 0, 7.284999999999999 7.284999999999999, 0 15.5, 0
                S 31, 7.284999999999999 31, 15.5
                    23.715, 31 15.5, 31
                    0, 23.715 0, 15.5
            "
            fill="#F9703E"
          ></path>
        </svg>

        <svg
          className="shapes"
          id="six"
          viewbox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
                M 0, 24
                C 0, 23.759999999999998 23.759999999999998, 0 24, 0
                S 48, 23.759999999999998 48, 24
                    24.240000000000002, 48 24, 48
                    0, 24.240000000000002 0, 24
            "
            fill="#9446ED"
          ></path>
        </svg>

        <svg
          className="shapes"
          id="seven"
          viewbox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
                M 0, 18
                C 0, 4.5 4.5, 0 18, 0
                S 36, 4.5 36, 18
                    31.5, 36 18, 36
                    0, 31.5 0, 18
            "
            fill="#2DCCA7"
          ></path>
        </svg>

        <h2 className="title">Words</h2>
        <p>Track the words you learn.</p>
        <input
          onChange={(e) => setVocab(e.target.value)}
          type="text"
          placeholder="Enter a word"
          id="input"
        />

        <button className="button" onClick={() => searchWord()}>
          SEARCH
        </button>
      </div>

      {load && (
        <div id="wordBox">
          <h3>{!err && <span>{word}</span>}</h3>
          <p>{speech}</p>
          <p>{definition}</p>
          {example && <p>"{example}"</p>}
          {!err && (
            <button className="button" onClick={() => addToList()}>
              ADD
            </button>
          )}
          {/*The word already exist */}
          {exist && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-alert-triangle"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#FFC107"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M12 9v2m0 4v.01" />
                <path d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75" />
              </svg>
              {word} is already saved.
            </div>
          )}

          {err && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-alert-triangle"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#FFC107"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M12 9v2m0 4v.01" />
                <path d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75" />
              </svg>
              <p id="err">The entered word was blank or invalid.</p>
            </div>
          )}
        </div>
      )}
      {words.length > 0 && (
        <div id="learned">
          <h3>Learned Words</h3>
          <ul>
            {words.map((word, index) => (
              <li key={index} onClick={(e) => viewWord(e)}>
                {word}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
