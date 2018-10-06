import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchSurveys} from '../../actions'
export class SurveyList extends Component {
    componentDidMount(){
        this.props.fetchSurveys()
    }
    renderSurveys(){
        return this.props.surveys.reverse().map(survey => (
            <div key={survey._id} className="card darken-1">
                <div className="card-content">
                    <span className="card-title">{survey.title}</span>
                    <p>
                        {survey.body}
                    </p>
                    <p className="right">
                        Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                    </p>
                </div>
                <div className="card-action">
                    <a>Yes: {survey.yes}</a>
                    <a>No: {survey.no}</a>
                </div>
            </div>
        ))
    }
    render() {
        return (
        <div>
            <h3>Survey List</h3>
            {this.renderSurveys()}
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    surveys: state.surveys
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSurveys
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList)
