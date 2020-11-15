const router = require('express').Router();
const Question = require('./questionDB');

router.route('/').get((req, res) => {
    Question.find()
        .then(questions => res.json(questions))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Question.findById(req.params.id)
        .then(question => res.json(question))
        .catch(err => res.status(400).json('Error: ' + err));
});

  router.route('/add').post((req, res) =>{
    const title = req.body.title;
    const question = req.body.question;
    const username = req.body.username;
    const answers = []
    const newQuestion = new Question({title, question, username, answers});

    newQuestion.save()
        .then(() => res.json('Question added!'))
        .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id/addanswer').post((req, res) => {
    const answer = {answer: req.body.answer, username: req.body.username, votes: 0};
    console.log(answer);
    const specificquestion = Question.findByIdAndUpdate(
        req.params.id,
        {$push: {answers: answer}},
        {safe: true, upsert: true, new: true})
            .then(question => res.json(question.answers))
            .catch(err => res.status(400).json('Error: ' + err));

      //console.log(specificquestion.answers);
  });

  router.route('/:id/upvoteanswer/:answerid').get((req, res) => {
          Question.
              findOneAndUpdate({
                  "_id": req.params.id,
                  "answers._id": req.params.answerid
              }, {
                  "$inc": {
                      "answers.$.votes": 1
                  }
              })
              .then(question => res.json(question))
              .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id/downvoteanswer/:answerid').get((req, res) => {
      Question.
          findOneAndUpdate({
              "_id": req.params.id,
              "answers._id": req.params.answerid
          }, {
              "$inc": {
                  "answers.$.votes": -1
              }
          })
          .then(question => res.json(question))
          .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;
