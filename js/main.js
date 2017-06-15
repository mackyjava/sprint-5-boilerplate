var api = {
	url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
}; console.log(api.url);


var cargarPagina = function (){
  cargarTopics();	
}
 var cargarTopics= function (){
   $.getJSON(api.url, function(response){
   	 var topics = response;
     mostrarTopics(topics);
   });
 };
var mostrarTopics = function(topics){
	var $div = $("#temas");
 topics.forEach(function(topic){
  var $tema = $("<div />");
  var $h3= $("<h3 />");
  var $p = $("<p />");
  var $span = $("<span />");
  var autor = topic.author_name;
  var tema = topic.content;
  var respuesta = topic.responses_count;
      $h3.text(tema);
      $p.text(autor);
      $span.text(respuesta);
      $tema.append($h3);
      $tema.append($p);
      $tema.append($span);
      $div.append($tema);
      $tema.addClass("panel panel-info");
      $h3.addClass("panel-heading");
      $span.addClass("badge");
 });
};






$(document).ready(cargarPagina);