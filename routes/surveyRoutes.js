const _ = require('lodash')
const Path = require('path-parser').default
const {URL} = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates')

const Survey = mongoose.model('surveys')

module.exports = app => {
    app.get('/api/surveys', async (req,res) => {
        const surveys = await Survey.find({_user: req.user.id})
                                    .select({recipients: false});
        res.send(surveys)
    })

    app.get('/api/surveys/:surveyId/:choice',(req,res) => {
        res.send('Thanks for voting!')
    });
    // The webhook
    app.post('/api/surveys/webhooks', (req,res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
            const result = _.chain(req.body)
            .map(({email, url}) => {
                // {surveyId: ..., choice: ...}
                const match = p.test(new URL(url).pathname)
                if(match){
                    return { email, surveyId: match.surveyId, choice: match.choice}
                }
            })
            // No undefined
            .compact()
            // Never have record that duplicate by email and surveyId
            .uniqBy('email', 'surveyId')
            // Pull out an array
            .each(({surveyId, email, choice}) => {
                console.log(surveyId, email, choice)
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {email: email, responded:false }
                    }
                }, {
                    $inc: {[choice]: 1},
                    $set: { 'recipients.$.responded': true},
                    lastResponded: new Date()
                }).exec();

            }).value();

        res.send(result)
    })

    app.post('/api/surveys', 
    requireLogin, 
    requireCredits, 
    async (req, res) => {
        const {title, subject, body, recipients} = req.body

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        })

        // Send email here

        // Param 1: the whole survey
        // Param 2: template of survey
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user)
        }catch(err){
            res.status(422).send(err)
        }
        
    });
}; 