var api = {
	url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
}; console.log(api.url);

var $div = $("#temas");
var cargarPagina = function (){
  cargarTopics();
  $("#add-topic").submit(agregarTema);
  $("#buscar").click(filtrarResultados);
  $(document).on("click",".redirigir",redirigirP);	
}


 var cargarTopics= function (){
   $.getJSON(api.url, function(topics){
     topics.forEach(crearTopics);
      
   });
   };

var crearTopics = function(topic){
	var autor = topic.author_name;
  var tema = topic.content;
  var id = topic.id;
  var respuesta = topic.responses_count;
  var $tema = $("<div />");
  var $h3= $("<h3 />");
  var $a=$("<a />");
  var $p = $("<p />");
  var $span = $("<span />");
  
      $a.text(tema);
      $p.text(autor);
      $span.text(respuesta);
      $h3.append($a);
      $tema.append($h3);
      $tema.append($p);
      $tema.append($span);
      $div.prepend($tema);
      $tema.addClass("panel panel-info");
      $h3.addClass("panel-heading");
      $span.addClass("badge");
      $a.addClass("redirigir");
      $a.attr("id",id)
 };

var agregarTema = function(e){
	e.preventDefault();
	var autor= $("#autor").val();
	var tema = $("#tema").val();
	$.post(api.url,{
         content: tema,
         author_name: autor
     },function(topic){
     	crearTopics(topic);
      $("#myModal").modal("hide");
     });
	};
  var plantillaTopic= '<article class="row">' +
        '<div class=" container ">' +
          '<div class="row panel panel-info">' +
            '<div class="col-lg-9">' +
              '<h4 class=" tema panel-heading">__tema__ </h4> '+
            '</div>' +
            '<div class="col-lg-9">' +
              '<p class="autor">__autor__</hp>' +
              '<span class="contador badge">0</span>'
            '</div>' +
          '</div>' +
        '</div>' +
  '</article>';


 var filtrarResultados = function (e) {
  e.preventDefault();
  var criterioBusqueda = $("#search").val().toLowerCase();
  $.getJSON(api.url, function(topics){
  var topicFiltrado = topics.filter(function (topic) {
    return topic.content.toLowerCase().indexOf(criterioBusqueda) >= 0;
  });
  console.log(topicFiltrado);
  mostrarResultados(topicFiltrado);
});
}

var mostrarResultados = function (topicFiltrado) {
  var plantillaFinal = "";
  topicFiltrado.forEach(function (topic){
    plantillaFinal += plantillaTopic.replace("__tema__", topic.content)
      .replace("__autor__", topic.author_name)
      .replace("__0__", topic.responses_count);
    $("#temas").html(plantillaFinal)
    console.log(topic.content);
});
}
 
 var redirigirP = function(e){
  var $a= $("a").attr("href");
  e.preventDefault();
  var $this= $(this).attr("id");
  var topic_id = $this;
  $a.attr("href","verTopic.html?"+"topic_id");
  console.log($this);
 };

  






$(document).ready(cargarPagina);