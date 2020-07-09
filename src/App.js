import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  let initialWords = JSON.parse(localStorage.getItem("words")) || [];
  const [vocab, setVocab] = useState("");
  const [word, setWord] = useState("");
  const [speech, setSpeech] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [load, setLoad] = useState(false);
  const [words, setWords] = useState(initialWords);
  function addToList() {
    setWords((prevArray) => [...prevArray, word]);
  }
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
    let list = words;
    localStorage.setItem("words", JSON.stringify(list));
  }, [word, words]);

  return (
    <>
      <h2 className="title">Words</h2>

      <Container className="d-flex justify-content-center">
        <Row className="text-center">
          {" "}
          <Form>
            <Form.Group className="align-items-center">
              <Col>
                <Form.Control
                  onChange={(e) => setVocab(e.target.value)}
                  type="text"
                  placeholder="Enter a word"
                  className="mx-sm-3"
                  id="input"
                />
              </Col>
            </Form.Group>
            <Button onClick={() => setWord(vocab)} variant="outline-primary">
              Search
            </Button>
          </Form>
        </Row>
      </Container>

      {load && (
        <Container className=" mt-5 d-flex justify-content-center">
          <Card
            className="h-100 shadow-sm bg-white rounded"
            style={{ width: "18rem" }}
          >
            <Card.Header></Card.Header>
            <Card.Body>
              <Card.Title>{word}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {speech}
              </Card.Subtitle>
              <Card.Text>{definition}</Card.Text>
              {example && <Card.Text>"{example}"</Card.Text>}
              <Button
                className="mt-auto font-weight-bold"
                variant="outline-success"
                onClick={() => addToList()}
                block
              >
                Add
              </Button>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}

export default App;
