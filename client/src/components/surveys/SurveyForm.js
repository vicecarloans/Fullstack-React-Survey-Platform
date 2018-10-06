import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField'
import {fields} from '../../constants/survey'
import validateEmails from '../../utils/validateEmails'


export class SurveyForm extends Component {
  static propTypes = {
  }
  renderFields() {
    return (
      <div>
        {fields.map((field,i) => (
          <Field 
            key={i}
            label={field.label} 
            type="text" 
            name={field.name}
            component={SurveyField} 
          />
        ))}
      </div>
    )
  }
  render() {
    return (
      <div>
          <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat left white-text">
                  Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                Next
                <i className="material-icons right">done</i>
                </button>
          </form>
          
      </div>
    )
  }
}

function validate(values){
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '')
  
  fields.forEach(({name}) => {
    if(!values[name]){
      errors[name] = 'You must provide a value'
    }
  })
  return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm)
