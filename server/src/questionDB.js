module.exports = (mongoose) => {
    const questionSchema = new mongoose.Schema({
      title: {type: String, required: true },
      question: {type: String, required: true},
      username: {type: String, require: true, trim: true, minlength: 3},
      answers: [{answer: String, username: String, votes: Number}],
  }, {
      timestamps: true,
  });
  
    const questionModel = mongoose.model('Question', questionSchema);
  
    async function getQuestions() {
      try {
        return await questionModel.find();
      } catch (error) {
        console.error("getQuestions:", error.message);
        return {};
      }
    }
  
    async function getQuestion(id) {
      try {
        return await questionModel.findById(id);
      } catch (error) {
        console.error("getQuestion:", error.message);
        return {};
      }
    }
  
    async function createQuestion(title, question, username) {
      let newQuestion = new questionModel({title: title, question: question, username: username, answers:[]});
      return newQuestion.save();
    }
  
    async function bootstrap(count = 10) {
      let l = (await getQuestions()).length;
      console.log("Question collection size:", l);
  
      if (l === 0) {
        let promises = [];
        for (let i = 0; i < count; i++) {
          let newQuestion = new questionModel({title: `Question number ${i}`, question: 'bla bla', username: `Username${i}`, answers:[]});
          promises.push(newQuestion.save());
        }
        return Promise.all(promises);
      }
    }
  
    return {
      getQuestions,
      getQuestion,
      createQuestion,
      bootstrap
    }
  }