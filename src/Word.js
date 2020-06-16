import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: {},
    };
  }
  addToList() {
    let list = this.state.words;
    list[Object.keys(list).length] = this.props.word;
    this.setState({ words: list });
  }
  render() {
    return (
      <>
        <div className="container-fluid">
          <Card style={{ width: "18rem" }}>
            <Card.Header></Card.Header>
            <Card.Body>
              <Card.Title>{this.props.word}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {this.props.pos}
              </Card.Subtitle>
              <Card.Text>{this.props.definition}</Card.Text>
              <Card.Text>"{this.props.example}"</Card.Text>
            </Card.Body>
          </Card>
          <Button variant="outline-success" onClick={() => this.addToList()}>
            Add
          </Button>
        </div>
        <div>
          {Object.keys(this.state.words).map((key, index) => {
            return <div key={key}> {this.state.words[key]} </div>;
          })}
        </div>
      </>
    );
  }
}

export default Word;
