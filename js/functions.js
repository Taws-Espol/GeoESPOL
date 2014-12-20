
	var ge, la, latitude, longitude, heading, buildings, turning, frameendEL, kmzs, nls;
	var administracion = document.querySelector(".administracion"),
		aulas		   = document.querySelector(".aulas"),
		investigacion  = document.querySelector(".investigacion"),
		deportes       = document.querySelector(".deportes"),
		bibliotecas    = document.querySelector(".bibliotecas"),
		otros          = document.querySelector(".otros"),
		showAdministracion = document.querySelector("#administracion"),
		showAulas		   = document.querySelector("#aulas"),
		showInvestigacion  = document.querySelector("#investigacion"),
		showDeportes       = document.querySelector("#deportes"),
		showBibliotecas    = document.querySelector("#bibliotecas"),
		showOtros          = document.querySelector("#otros"),
		backs			   = document.querySelectorAll(".back"),
		body 		   = document.body;
    google.load("earth", "1");

	showAdministracion.onclick = function() {
		$(document.querySelector(".administracion")).css('visibility','visible');
		$(document.querySelector(".administracion")).css('z-index','1000');
	};
	backs[0].onclick = function() {
		$(document.querySelector(".administracion")).css('visibility','hidden');
		$(document.querySelector(".administracion")).css('z-index','-1');
	};
	
	showAulas.onclick = function() {
		$(document.querySelector(".aulas")).css('visibility','visible');
		$(document.querySelector(".aulas")).css('z-index','1000');
	};
	backs[1].onclick = function() {
		$(document.querySelector(".aulas")).css('visibility','hidden');
		$(document.querySelector(".aulas")).css('z-index','-1');
	};
	
	showInvestigacion.onclick = function() {
		$(document.querySelector(".investigacion")).css('visibility','visible');
		$(document.querySelector(".investigacion")).css('z-index','1000');
	};
	backs[2].onclick = function() {
		$(document.querySelector(".investigacion")).css('visibility','hidden');
		$(document.querySelector(".investigacion")).css('z-index','-1');
	};
	
	showDeportes.onclick = function() {
		$(document.querySelector(".deportes")).css('visibility','visible');
		$(document.querySelector(".deportes")).css('z-index','1000');
	};
	backs[3].onclick = function() {
		$(document.querySelector(".deportes")).css('visibility','hidden');
		$(document.querySelector(".deportes")).css('z-index','-1');
	};
	
	showBibliotecas.onclick = function() {
		$(document.querySelector(".bibliotecas")).css('visibility','visible');
		$(document.querySelector(".bibliotecas")).css('z-index','1000');
	};
	backs[4].onclick = function() {
		$(document.querySelector(".bibliotecas")).css('visibility','hidden');
		$(document.querySelector(".bibliotecas")).css('z-index','-1');
	};
	
	showOtros.onclick = function() {
		$(document.querySelector(".otros")).css('visibility','visible');
		$(document.querySelector(".otros")).css('z-index','1000');
	};
	backs[5].onclick = function() {
		$(document.querySelector(".otros")).css('visibility','hidden');
		$(document.querySelector(".otros")).css('z-index','-1');
	};
	
    function initCB(instance) {
		ge = instance;
      	//Coordenadas ESPOl
      	turning   = false;
	    latitude  = -2.1473388888888887;
	    longitude = -79.96378611111112;
	    heading   = 6.000000;
	    tilt      = 65.000000;
	    range     = 970;
		
		addKmzFromUrl("https://3dwarehouse.sketchup.com/3dw/getpubliccontent?contentId=ff9c992c-5238-460b-a181-3ea27641861e&fn=ESPOL_Obelisco.kmz");
		addKmzFromUrl("https://3dwarehouse.sketchup.com/3dw/getpubliccontent?contentId=2fa23d97-1c9e-480f-bbf1-5816c28ba4db&fn=edificio_Bienestar_Estudiantil_sala_de_profesores_activos_fijos_LDP.kmz");
		
	    ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
    	ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);
    	ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN,true);
    	ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
		ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);
		ge.getNavigationControl().getScreenXY().setXUnits(ge.UNITS_PIXELS);
		ge.getNavigationControl().getScreenXY().setYUnits(ge.UNITS_INSET_PIXELS);
	    //Ubicacion inicial (Mundo)
	    la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
	    //Estableciendo nueva ubicacion
	    la.set(latitude,longitude,0,ge.ALTITUDE_RELATIVE_TO_GROUND,heading,tilt,range);
	    //Velocidad de animacion
	    ge.getOptions().setFlyToSpeed(.25);
    	ge.getView().setAbstractView(la);
      	ge.getWindow().setVisibility(true);
    }

	function addKmzFromUrl(kmzUrl) {
		var link = ge.createLink("");
		link.setHref(kmzUrl);

		var networkLink = ge.createNetworkLink("");
		networkLink.setLink(link);
		networkLink.setFlyToView(true);

		ge.getFeatures().appendChild(networkLink);
	}
	
    function failureCB(errorCode) {}
	
	function moveTo(lat,lng,head,range,altitude,tilt){
		latitude  = lat;
		longitude = lng;
		heading   = head;
		la.set(lat,lng,0,ge.ALTITUDE_RELATIVE_TO_GROUND,heading,tilt,range);
		ge.getOptions().setFlyToSpeed(.25);
		ge.getView().setAbstractView(la);
    }
	
	function stopFly() {
		ge.getOptions().setFlyToSpeed(1);
	}
	
	function scrollTo(pos,velocidad){
		$('html, body').animate({scrollTop: pos}, velocidad);
	}
	function position(elem){
		var offset = $('#'+elem).offset();
		return(offset.top);
	}
	
	function animate(elem,style,unit,from,to,time) {
		if(!elem) return;
		var start = new Date().getTime(),
        timer = setInterval(function(){
			var step = Math.min(1,(new Date().getTime()-start)/time);
            elem.style[style] = (from+step*(to-from))+unit;
            if(step == 1){
				clearInterval(timer);
			}
        },25);
		elem.style[style] = from+unit;
		
	}
	
	function init(){
		var height = $( window ).height();
		$('#map3d').css('height',height);
		$('header span').click(function(){
			animate(document.querySelector('header'),'bottom','%',0,100,800,null);
			google.earth.createInstance('map3d', initCB, failureCB);
		});
	}

	window.load = init();