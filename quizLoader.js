/* For older browsers */

if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}

//FADE IN, FADE OUT functions

Element.prototype.fadeIn = function(callbackF) {

  var s = this.style;
  s.opacity = parseFloat(0);
  s.display = 'block';
  (function fade(){if((s.opacity-=(-.05))>1) { if(typeof callbackF === 'function') callbackF(); } else setTimeout(fade,30)})();

}

Element.prototype.fadeOut = function(callbackF) {

  var s = this.style;
  s.opacity = 1;
  s.display = 'block';
  (function fade(){if((s.opacity-=.05)<=0) { s.display="none"; if(typeof callbackF === 'function') callbackF(); } else setTimeout(fade,30)})();


}

//DOM helpers

function findDOM(query) { return document.querySelector("#quizer-app-block"+((query !== undefined) ? ' '+query : '')); }
function findAll(query) { return document.querySelectorAll("#quizer-app-block "+query); }

//Quizer
var Quizer = function(questions) {

  this.questions = questions; //define table of questions at the start

};

//start quiz method
Quizer.prototype.startQuiz = function() {

    //hide title page and show the first question
    findDOM('#quizer_title_page').fadeOut(function() {
      findDOM('.question').fadeIn();
    });

};


//show next question method
Quizer.prototype.nextQuestion = function(now) {

   if(findAll('.question')[now+1] !== undefined) { //if there is another question

     //hide present question and show another
     findAll('.question')[now].fadeOut(function() {
        findAll('.question')[now+1].fadeIn();
     }); 
     } 
     else { //there are no more questions

      this.countResult(); //count result
      //hide present question and show the final slide
      findAll('.question')[now].fadeOut(function() {
        findAll('.result')[0].fadeIn();
      });

    }

};

//Count result function
Quizer.prototype.countResult = function() {

    var result = quizer_questions.reduce(function(sum, quest, i) {

        return sum + ((quest.answers.reduce(function(result, answer) {
            return (answer.valid === answer.checked) ? result+1 : result; //if at least one choice doesn't match required answer, count zero points
        },0) === (quest.answers.length)) ? 1 : 0);

    },0);

    findDOM('.result span').innerHTML = result +"/"+quizer_questions.length; //refresh points
}

Quizer.prototype.init = function() {

      //CREATE TITLE PAGE
      var html = document.createElement('DIV');
      html.id = 'quizer_title_page';
      html.className = 'title';
      html.innerHTML = '<h2>' + quiz_info.title + '</h2>\n<hr>\n<span>by ' + quiz_info.author + '</span><br>';

      var button = document.createElement('BUTTON');
      button.id = "start_quiz_button";
      button.className = 'btn btn-primary'; //add bootstrap styling
      button.innerHTML = "Start the quiz";
      button.addEventListener("click", function() {
            this.startQuiz(); //add onClick event - startQuiz
      }.bind(this));
      html.appendChild(button);

      findDOM().appendChild(html); //append title page

      var self = this;
      this.questions.forEach(function(question, i) { //for each question create seperated slide

      //create question div
      var html = document.createElement('DIV');
      html.ID = 'quest_'+quizer_questions.indexOf(question);
      html.className = 'question';
      html.innerHTML = '<h3>'+ question.title +'</h3>\n';
      html.style.display = 'none';

          question.answers.forEach(function(answer,j) {

                answer.id = j;
                html.innerHTML += '<a id="answer_'+j+'" class="answer">' + answer.text + '</a>';

          });
          var button = document.createElement('BUTTON');
          button.className = 'btn btn-primary next';
          button.innerHTML = "Next";
          button.addEventListener("click", function() {
                self.nextQuestion(i);
          });
          html.appendChild(button);

      findDOM().appendChild(html);

    });

    //result page append
    var html = document.createElement('DIV');
    html.id = 'quest_result';
    html.className = 'result';
    this.encoded_url = encodeURIComponent(window.location.href);
    html.innerHTML = '<h3>Your result is....</h3>\n<hr>\n<span>0/0</span><p>Share</p><hr><!-- Sharingbutton Facebook --><a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u='+this.encoded_url+'" target="_blank" aria-label="Facebook"><div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg></div>Facebook</div></a><!-- Sharingbutton Twitter --><a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=Check%20out%20this%20new%20quiz!%&url='+this.encoded_url+'" target="_blank" aria-label="Twitter"><div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg></div>Twitter</div></a><!-- Sharingbutton Google+ --><a class="resp-sharing-button__link" href="https://plus.google.com/share?url='+this.encoded_url+'" target="_blank" aria-label="Google+"><div class="resp-sharing-button resp-sharing-button--google resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.37 12.93c-.73-.52-1.4-1.27-1.4-1.5 0-.43.03-.63.98-1.37 1.23-.97 1.9-2.23 1.9-3.57 0-1.22-.36-2.3-1-3.05h.5c.1 0 .2-.04.28-.1l1.36-.98c.16-.12.23-.34.17-.54-.07-.2-.25-.33-.46-.33H7.6c-.66 0-1.34.12-2 .35-2.23.76-3.78 2.66-3.78 4.6 0 2.76 2.13 4.85 5 4.9-.07.23-.1.45-.1.66 0 .43.1.83.33 1.22h-.08c-2.72 0-5.17 1.34-6.1 3.32-.25.52-.37 1.04-.37 1.56 0 .5.13.98.38 1.44.6 1.04 1.84 1.86 3.55 2.28.87.23 1.82.34 2.8.34.88 0 1.7-.1 2.5-.34 2.4-.7 3.97-2.48 3.97-4.54 0-1.97-.63-3.15-2.33-4.35zm-7.7 4.5c0-1.42 1.8-2.68 3.9-2.68h.05c.45 0 .9.07 1.3.2l.42.28c.96.66 1.6 1.1 1.77 1.8.05.16.07.33.07.5 0 1.8-1.33 2.7-3.96 2.7-1.98 0-3.54-1.23-3.54-2.8zM5.54 3.9c.33-.38.75-.58 1.23-.58h.05c1.35.05 2.64 1.55 2.88 3.35.14 1.02-.08 1.97-.6 2.55-.32.37-.74.56-1.23.56h-.03c-1.32-.04-2.63-1.6-2.87-3.4-.13-1 .08-1.92.58-2.5zM23.5 9.5h-3v-3h-2v3h-3v2h3v3h2v-3h3"/></svg></div>Google+</div></a><!-- Sharingbutton Tumblr --><a class="resp-sharing-button__link" href="https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;caption=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;content='+this.encoded_url+'&amp;canonicalUrl='+this.encoded_url+'&amp;shareSource=tumblr_share_button" target="_blank" aria-label="Tumblr"><div class="resp-sharing-button resp-sharing-button--tumblr resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5.5v5h5v4h-5V15c0 5 3.5 4.4 6 2.8v4.4c-6.7 3.2-12 0-12-4.2V9.5h-3V6.7c1-.3 2.2-.7 3-1.3.5-.5 1-1.2 1.4-2 .3-.7.6-1.7.7-3h3.8z"/></svg></div>Tumblr</div></a><!-- Sharingbutton E-Mail --><a class="resp-sharing-button__link" href="mailto:?subject=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;body='+this.encoded_url+'" target="_self" aria-label="E-Mail"><div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"/></svg></div>E-Mail</div></a><!-- Sharingbutton Pinterest --><a class="resp-sharing-button__link" href="https://pinterest.com/pin/create/button/?url='+this.encoded_url+'&amp;media='+this.encoded_url+'&amp;description=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking." target="_blank" aria-label="Pinterest"><div class="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z"/></svg></div>Pinterest</div></a>  ';
    html.style.display = 'none';

    findDOM().appendChild(html);

    //PICKING ANSWERS
    var answers = findAll('a.answer');

    for (var i=0;i<answers.length;i++) {

         questions = this.questions;
         answers[i].addEventListener("click", function() {

         var parent = questions[this.parentNode.ID.replace('quest_','')];
         var item = parent.answers[this.id.replace('answer_','')]; //item is the answer here
         item.checked = (item.checked == true) ? false : true;
         this.className = (item.checked == true) ? "answer checked" : "answer";

            if(parent.answers.filter(function(item) { return item.valid == true; }).length == 1)parent.answers.forEach(function(answer, j) {

            var str = this.id.replace('answer_','');
            var number = parseInt(answer.id);
            var num2 =  parseInt(str);
            if(number != num2) {
             answer.checked = false;
             findAll('.question')[this.parentNode.ID.replace('quest_','')].querySelectorAll('a.answer')[j].className = "answer";

           }


         }.bind(this));

       });

      }
}

var Quiz = new Quizer(quizer_questions).init();
