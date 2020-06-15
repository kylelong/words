import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Axios from "axios";
import Word from "./Word";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Search() {
  const [data, setData] = useState(null);
  const [vocab, setVocab] = useState("");
  const [word, setWord] = useState("");
  const [speech, setSpeech] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    Axios.get(url)
      .then((response) => {
        setLoad(true);
        setWord(response.data[0].word);
        setSpeech(response.data[0].meanings[0].partOfSpeech);
        setDefinition(response.data[0].meanings[0].definitions[0].definition);
        setExample(response.data[0].meanings[0].definitions[0].example);
      })
      .catch((error) => console.log());
  }, [word]);

  return (
    <>
      <Form inline>
        <Form.Label htmlFor="input">Word Search </Form.Label>
        <Form.Group>
          <Form.Control
            onChange={(e) => setVocab(e.target.value)}
            type="text"
            placeholder="Enter a word"
            className="mx-sm-3"
            id="input"
          />
          <Button onClick={() => setWord(vocab)} variant="outline-primary">
            Search
          </Button>
        </Form.Group>
      </Form>
      {load && (
        <Word
          word={word}
          pos={speech}
          definition={definition}
          example={example}
          date="Jun 15, 2020"
        />
      )}
    </>
  );
}
function App() {
  return (
    <>
      <Search />
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
