/**==============================***
*** onlyzs1023@gmail.com 2017/02
***==============================***/

/**
*** angularjs
**/
var app = angular.module("myApp", []);

function getRandom(max, min){
	return ( Math.random() * ( Number(max) - Number(min) ) ) + Number(min);
}

// HEADER CONTROLLER
app.controller('headerListController', function() {
	this.links = [
		{linker:'index.html',title:'HOME'},
		{linker:'index.html#work',title:'WORKS'},
		{linker:'index.html#about',title:'ABOUT'},
		{linker:'contact.html',title:'CONTACT'}
	];
	this.logo = "SAWAKO";
});

// HOME CONTROLLER
app.controller('homeController', function() {
	this.homeContent = [
		{linker: '', 
		 title: 'PROJECT A', 
		 content:'some intro...', 
		 skill:'coffeescript, scala, mysql'},
		{linker: '', 
		 title: 'PROJECT B', 
		 content:'some intro...', 
		 skill:'TypeScript, java, postreg'},
		{linker: '', 
		 title: 'PROJECT C', 
		 content:'some intro...',
		 skill:'nodejs, mysql'},
		{linker: '', 
		 title: 'PROJECT D', 
		 content:'some intro...', 
		 skill:'chainer, python'},
		{linker: '', 
		 title: 'PROJECT E', 
		 content:'some intro...', 
		 skill:'angularjs, php, mongodb'},
		{linker: '', 
		 title: 'PROJECT F', 
		 content:'some intro...',
		 skill:'php'},
	];
});

// ABOUT CONTROLLER
app.controller('aboutController', function() {
	this.introDetails = [
		{title:'Name',content:'...'},
		{title:'Nationality',content:'China'},
		{title:'Birth',content:'...'}
	];
	this.involvedProjects = [
		{project:'1',detail:'a',skill:'A'},
		{project:'2',detail:'b',skill:'B'},
		{project:'3',detail:'c',skill:'C'},
		{project:'4',detail:'d',skill:'D'},
	];
	this.skillBars = [
		{currentValue:'50',currentWidth:'width: 50%;',currentTitle:'Python',currentClass:'progress-bar progress-bar-striped bg-danger'},
		{currentValue:'70',currentWidth:'width: 70%;',currentTitle:'PHP',currentClass:'progress-bar progress-bar-striped bg-success'},
		{currentValue:'60',currentWidth:'width: 60%;',currentTitle:'Javascript(JQuery)',currentClass:'progress-bar progress-bar-striped bg-info'},
		{currentValue:'40',currentWidth:'width: 40%;',currentTitle:'C#(asp.net)/Java',currentClass:'progress-bar progress-bar-striped bg-warning'},
	];
	this.otherInfo = [
		{title:'BACKGROUND', content:['Bachelor\'s Degree...','MASTER\'s Degree...']},
		{title:'HOBBY', content:['Hiking & Climbing','Reading']},
	];
});

// CONTACT CONTROLLER
app.controller('contactController', function() {
	this.iconLinks = [
		{linker:'https://twitter.com/onlyzs89',icon_src:'assets/img/twitter.png'},
		{linker:'http://weibo.com/zsonly',icon_src:'assets/img/weibo.png'},
		{linker:'http://qiita.com/onlyzs',icon_src:'assets/img/qiita.png'},
		{linker:'https://github.com/onlyzs89',icon_src:'assets/img/github.png'}
	];
});

// BOARD CONTROLLER
app.controller('boardController', function($scope) {
	var badgeClass = ["badge-default","badge-primary","badge-success","badge-info","badge-warning","badge-danger"];
	badgeLen = badgeClass.length;
	var megBoard = $(".cnt");
	
	var width=megBoard.innerWidth();
	var height=megBoard.innerHeight();
	
	this.addMessage = function(){
		this.messages.push({
			content:this.newMessage,
			badge:"badge badge-random " + badgeClass[Math.floor(getRandom(badgeLen, 0))],
			style:"top:" + Math.floor(getRandom(height, 0)) + "px;left:" + Math.floor(getRandom(width, 0)) + "px;opacity:" + getRandom(0.8, 0.2) +";font-size:" + Math.floor(getRandom(220, 120)) + "%;"}
		);
		//this.newMessage = "";
	}

	var msg_content = get_msg();
	var msg_arr = [];
	$.each(JSON.parse(msg_content)["content"], function(i,v){
		msg_arr.push({
			content:v,
			badge:"badge badge-random " + badgeClass[Math.floor(getRandom(badgeLen, 0))],
			style:"top:" + Math.floor(getRandom(height, 0)) + "px;left:" + Math.floor(getRandom(width, 0)) + "px;opacity:" + getRandom(0.8, 0.2) +";font-size:" + Math.floor(getRandom(220, 120)) + "%;"
		});
	});
	
	this.messages = msg_arr;

});


/**
*** ajax
**/
// INQUERY FORM
$('#inquery-form').submit(function(event) {
	event.preventDefault();

	var $form = $(this);
	var $button = $form.find('button');
	
	$.ajax({
		url: $form.attr('action'),
		type: $form.attr('method'),
		data: $form.serialize(),
		timeout: 10000,
		beforeSend: function() {
			$button.attr('disabled', true);
		},
		complete: function() {
			$button.attr('disabled', false);
		},
		success: function(result) {
			$form[0].reset();
			$('#response-inquery').text("Thanks for your inquery! I will response to you soon. ☺");
		},
		error: function(xhr, textStatus, error) {
			$('#response-inquery').text(error);
		}
	});
	return false;
});

// MESSAGE FORM
$('#msg-form').submit(function(event) {
	event.preventDefault();

	var $form = $(this);
	var $button = $form.find('button');
	
	$.ajax({
		url: $form.attr('action'),
		type: $form.attr('method'),
		data: $form.serialize(),
		beforeSend: function() {
			$button.attr('disabled', true);
		},
		complete: function() {
			$button.attr('disabled', false);
		},
		success: function(result) {
			$form[0].reset();
			$('#response-msg').text(result);
		},
		error: function(xhr, textStatus, error) {
			$('#response-msg').text(error);
		}
	});
	return false;
});

// AJAX CALL PHP METHORD
function get_msg(){
	var result = $.ajax({
        type: 		"POST",
        url: 		"method/msg.php",
        data: 		"request-msg=true",
		dataType: 	'json',
		async: 		false
	}).responseText;
	return result;
}