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

    //Add
    $scope.addQuestion = () => {

        $scope.Quests.push({ text: '', image: '', answers: [], active: false });

    };

    $scope.removeQuestion = (item) => {

        let index = $scope.Quests.indexOf(item);
        $scope.Quests.splice(index, 1);

    };


    $scope.addAnswer = (item) => {

        let index = $scope.Quests.indexOf(item);
        $scope.Quests[index].answers.push({ text: '', valid: false, checked: false });

    };

    $scope.removeAnswer = (question, item) => {

        let quest_index = $scope.Quests.indexOf(question);
        let index = $scope.Quests[quest_index].answers.indexOf(item);
        $scope.Quests[quest_index].answers.splice(index, 1);

    };

    $scope.generate = () => {

        let errors = $scope.Quests.reduce((sum, quest) => {

              let errors = 0;
              if(quest.title == "") errors++;
              if(quest.answers.length <= 0) errors++;
              if(quest.answers.filter((item) => { return item.valid === true }).length <= 0) errors++;
              quest.answers.reduce((sum, answer) => { if(answer.text == "") errors++; },0);
              return sum + errors;

        },0);

        if($scope.quiz.title == '') $scope.quiz.title = 'Unnamed';
        if($scope.quiz.author == '') $scope.quiz.author = 'Unknown';

        if(errors == 0) {

              let codeBox = document.createElement("textarea")
              codeBox.id = "codeBox";
              codeBox.className = "form-control";
              jQuery(codeBox).text(`<!-- Quizer app block -->\n<div id="quizer-app-block"></div>\n<script>var quizer_questions = ${JSON.stringify($scope.Quests)}\nvar quiz_info = ${JSON.stringify($scope.quiz)};</script>\n<link href="http://sofasport.pl/Tools/QuizMaker/styles/default.min.css" rel="stylesheet"/>\n<script src="http://sofasport.pl/Tools/QuizMaker/quizLoader.min.js"></script>\n<!-- Quizer app block end -->`);
              jQuery('#generateModal .modal-body p').html('You can embed this code on your website: ').parent().append(jQuery(codeBox));
              jQuery('#generateModal').modal();

        }
        else {

              jQuery('#generateModal textarea').remove();
              jQuery('#generateModal .modal-body p').html(`There were ${errors} errors`);
              jQuery('#generateModal').modal();

        }

    };

});
