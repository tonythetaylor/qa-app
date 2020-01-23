import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import CountdownTimer from '../utils/countdownTimer';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
    };
  }

  async componentDidMount() {
    const questions = (await axios.get('http://localhost:8081/')).data;
    this.setState({
      questions,
    });
  }

  cardColor(answers) {
      if (answers <= 10) return 'card def-success mb-3'
      if (answers > 10 && answers <= 25) return 'card def-lukewarm mb-3'
      if (answers > 25 && answers <= 35) return 'card def-mild mb-3'
      if (answers > 35 && answers <= 45) return 'card def-heatingup mb-3'
      if (answers > 45 && answers <= 50) return 'card def-hottopic mb-3'
  }

  render() {
    const { questions } = this.state;

    return (
      <div className="container">
        <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-3">

        <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Ask a Random Question</div>
              <div className="card-body">
                <h4 className="card-title">+ New Question</h4>
                <p className="card-text">Don't worry. Someone will answer!</p>
              </div>
            </div>
          </Link>
          </div>
          {questions === null && <p>Loading questions...</p>}
          {
            questions && questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/question/${question.id}`}>
                  <div className={this.cardColor(question.answers)}>
                    <div className="card-header">
                      Answers: {question.answers} 
                      <div><span>
                      <CountdownTimer />
                                            </span></div>
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Questions;