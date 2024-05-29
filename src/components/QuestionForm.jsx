import React, { Component } from 'react';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      alternatives: ['', '', '', ''],
      correctAlternative: 0,
      subjects: [],
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleToggle = (subject) => {
    const { subjects } = this.state;
    const updatedSubjects = subjects.includes(subject)
      ? subjects.filter((s) => s !== subject)
      : [...subjects, subject];
    this.setState({ subjects: updatedSubjects });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pergunta:
          <input
            type="text"
            name="question"
            value={this.state.question}
            onChange={this.handleChange}
          />
        </label>
        {/* Render alternatives input fields */}
        {/* Render toggle buttons for subjects */}
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default QuestionForm;
