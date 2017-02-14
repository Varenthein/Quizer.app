var app = angular.module('Quizer',[]); //create app module

app.controller('QuizCreatorController', function($scope) { //create Quizer controller


    $scope.quiz = { title: '', author: '' };

    //Default questions array structure
    $scope.Quests = [
      { title: 'What is your name?',
        image: '',
        answers: [{
            text: 'Mathhew',
            valid: false
          },
          {
            text: 'Thomas',
            valid: false
          },
          {
            text: 'Paul',
            valid: true
          },
          {
            text: 'Philipp',
            valid: false
          }
        ],
        active: false
      },
    ];

    //Add question
    $scope.addQuestion = () => {

        $scope.Quests.push({ text: '', image: '', answers: [], active: false });

    };

    //Remove question
    $scope.removeQuestion = (item) => {

        let index = $scope.Quests.indexOf(item);
        $scope.Quests.splice(index, 1);

    };

    //Add answer
    $scope.addAnswer = (item) => {

        let index = $scope.Quests.indexOf(item);
        $scope.Quests[index].answers.push({ text: '', valid: false, checked: false });

    };

    //Remove answer
    $scope.removeAnswer = (question, item) => {

        let quest_index = $scope.Quests.indexOf(question);
        let index = $scope.Quests[quest_index].answers.indexOf(item);
        $scope.Quests[quest_index].answers.splice(index, 1);

    };

    //generate quiz
    $scope.generate = () => {

        let errors = $scope.Quests.reduce((sum, quest) => {

              let errors = 0;
              if(quest.title == "") errors++; //if there is a question without title, it won't generate emebd code
              if(quest.answers.length <= 0) errors++; //the same if there is a question without answer
              if(quest.answers.filter((item) => { return item.valid === true }).length <= 0) errors++; //return error if there is a question without valid answers
              quest.answers.reduce((sum, answer) => { if(answer.text == "") errors++; },0); //return error if there is an answer without text
              return sum + errors;

        },0);

        if($scope.quiz.title == '') $scope.quiz.title = 'Unnamed'; //set default title if not set
        if($scope.quiz.author == '') $scope.quiz.author = 'Unknown'; //set default author if not set

        if(errors == 0) { //if there are no errors

              let codeBox = document.createElement("textarea"); //create textarea to store embed code
              codeBox.id = "codeBox";
              codeBox.className = "form-control"; //add bootstrap styling
              jQuery(codeBox).text(`<!-- Quizer app block -->\n<div id="quizer-app-block"></div>\n<script>var quizer_questions = ${JSON.stringify($scope.Quests)}\nvar quiz_info = ${JSON.stringify($scope.quiz)};</script>\n<link href="http://sofasport.pl/Tools/QuizMaker/styles/default.min.css" rel="stylesheet"/>\n<script src="http://sofasport.pl/Tools/QuizMaker/quizLoader.min.js"></script>\n<!-- Quizer app block end -->`);
              jQuery('#generateModal .modal-body p').html('You can embed this code on your website: ').parent().append(jQuery(codeBox)); //set modal text
              jQuery('#generateModal').modal(); //show modal

        }
        else { //if there were some errors

              jQuery('#generateModal textarea').remove(); //remove textarea
              jQuery('#generateModal .modal-body p').html(`There were ${errors} errors`); //set modal text
              jQuery('#generateModal').modal(); //show modal

        }

    };

});
