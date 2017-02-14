# Quizer.app
Just a simple quiz making app written in pure JavaScript. I've made it exclusively for SofaSport, but feel free to use it.

Creator
--

Quiz creator is made in Angular.js. In order to use it, just copy the files to your server.

Embeding
--

After finishing your quiz, you can copy the code and embed it on your website 

It looks like this:
```javascript

<div id="quizer-app-block"></div>
<script>
  var quizer_questions = [...] //questions arra
  var quiz_info = {}; //quiz info oobject
</script>
<link rel="stylesheet" href="http://sofasport.pl/Tools/QuizMaker/styles/default.min.css"/>
<script src="quizLoader.min.js"></script> //quiz loader

 ```
  
  So for example (taking from demo.html)

```javascript
  <div id="quizer-app-block"></div>r
  <script>var quizer_questions = [{"title":"Ronaldo was a player of...","image":"","answers":[{"text":"Real Madrid","valid":false,"$$hashKey":"object:8"},{"text":"Liverpool","valid":false,"$$hashKey":"object:9"},{"text":"AC Milan","valid":true,"$$hashKey":"object:10"},{"text":"Inter Mediolan","valid":false,"$$hashKey":"object:11"}],"active":false,"$$hashKey":"object:4"},{"text":"","image":"","answers":[{"text":"Real Madrid","valid":true,"checked":false,"$$hashKey":"object:33"},{"text":"AC Milan","valid":false,"checked":false,"$$hashKey":"object:37"},{"text":"Manchester City","valid":false,"checked":false,"$$hashKey":"object:40"},{"text":"FC Barcelona","valid":false,"checked":false,"$$hashKey":"object:43"}],"active":false,"$$hashKey":"object:27","title":"Robinho was leaving..."},{"text":"","image":"","answers":[{"text":"FC Barcelona","valid":true,"checked":false,"$$hashKey":"object:52"},{"text":"Real Madrid","valid":true,"checked":false,"$$hashKey":"object:55"},{"text":"Granada","valid":false,"checked":false,"$$hashKey":"object:58"},{"text":"Villareal","valid":true,"checked":false,"$$hashKey":"object:61"}],"active":false,"$$hashKey":"object:46","title":"Which teams were compating in the Primera Division?"}]
  var quiz_info = {"title":"Sezon 2006/2007","author":"Jacob Griffin"};</script>
  <link rel="stylesheet" href="http://sofasport.pl/Tools/QuizMaker/styles/default.min.css"/>
  <script src="quizLoader.min.js"></script>
  ```
  
Warning
--
 
 I'd be happy if you find this script useful. However, take a note that it was made purely for SofaSport.pl, so the quiz generation script uses always a link http://sofasport... You can leave that and use SofaSport as CDN, but it's better to just change embed function a little. 
 
 Just find thiss line...
 
```javascript
jQuery(codeBox).text(`<!-- Quizer app block -->\n<div id="quizer-app-block"></div>\n<script>var quizer_questions = ${JSON.stringify($scope.Quests)}\nvar quiz_info = ${JSON.stringify($scope.quiz)};</script>\n<link href="http://sofasport.pl/Tools/QuizMaker/styles/default.min.css" rel="stylesheet"/>\n<script src="http://sofasport.pl/Tools/QuizMaker/quizLoader.min.js"></script>\n<!-- Quizer app block end -->`);
```

and make according changes.

I think it can save you a lot frustration of kind "why my changes don't work?!". That could be a reason ;) So, please change this.

Restrictions
--

First thing - I doubt if script works okay, when there are embeded more than once quzier.app quizes on the website. I created it to make it work in one quiz per page manner. I'll probably extend script functionality later.

Second - creator is written in ES6, so there may be problems for poeple who think IE8 is a browser ;) Embed script uses old-style JS, so don't worry.

License
--

CC 3.0 https://creativecommons.org/licenses/by/3.0/
Have a good time! ;)

