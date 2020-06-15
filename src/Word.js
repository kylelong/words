import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Word extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default Word;
