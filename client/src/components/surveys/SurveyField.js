// Fields contains logic to render a single logic label and textinput

import React, { Component } from 'react'

export default class SurveyField extends Component {

    render() {
        const {input, label, meta : {error, touched}} = this.props
        return (
            <div>
                <label>{label}</label>
                <input {...input} style={{marginBottom:'5px'}}/>
                <div className="red-text">
                    {touched && error}
                </div>
            </div>
        )
    }
}
