import React from 'react'
import { connect } from 'react-redux'
import {fields} from '../../constants/survey'
import * as actions from '../../actions'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
  const reviewFields = fields.map(field => (
    <div key={field.name}>
      <label>{field.label}</label>
      <div>
        {formValues[field.name]}
      </div>
    </div>
  ))
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}      
      <button 
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      >Back</button>
      <button 
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

const MapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values }
}
const MapDispatchToProps = dispatch => bindActionCreators({
  submitSurvey: actions.submitSurvey
}, dispatch)
export default connect(MapStateToProps, MapDispatchToProps)(withRouter(SurveyFormReview)) 