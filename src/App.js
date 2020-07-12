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
    if (!list.includes(word)) {
      setWords((prevArray) => [...prevArray, word]);
    } else {
      setExist(true);
    }
  }
  function viewWord(e) {
    setWord(e.target.innerText);
  }
  useEffect(() => {
    setExist(false);
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    Axios.get(url)
      .then((response) => {
        setLoad(true);
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
        <h2 className="title">Words</h2>
        <p>Track the words you learn.</p>
        <input
          onChange={(e) => setVocab(e.target.value)}
          type="text"
          placeholder="Enter a word"
          id="input"
        />

        <button className="button" onClick={() => setWord(vocab)}>
          SEARCH
        </button>
      </div>

      {load && (
        <div id="wordBox">
          <h3>{word}</h3>
          <p>{speech}</p>
          <p>{definition}</p>
          {example && <p>"{example}"</p>}
          <button className="button" onClick={() => addToList()}>
            ADD
          </button>
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
              The word you entered is invalid.
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
