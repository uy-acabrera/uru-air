var paises = [{
	nombre: "Uruguay",
	ciudades:[{
			nombre: "Montevideo",
			imagen: "img/ciudades/montevideo.jpg"
		},
		{
			nombre: "Canelones",
			imagen: "img/ciudades/canelones.jpg"
		},
		{
			nombre: "Maldonado",
			imagen: "img/ciudades/maldonado.jpg"
		}]		
	},
	{
	nombre: "Brasil",
	ciudades:[{
			nombre: "Río de Janeiro",
			imagen: "img/ciudades/rio de janeiro.jpg"
		},
		{
			nombre: "San Paulo",
			imagen: "img/ciudades/sao paulo.jpg"
		},
		{
			nombre: "Brazilia",
			imagen: "img/ciudades/brazilia.jpg"
		}]
	},
	{
	nombre: "Argentina",
	ciudades:[{
			nombre: "Buenos Aires",
			imagen: "img/ciudades/buenos aires.jpg"
		},
		{
			nombre: "Mar del Plata",
			imagen: "img/ciudades/mar del plata.jpg"
		},
		{
			nombre: "Bariloche",
			imagen: "img/ciudades/bariloche.jpg"
		}]
	},
	{
	nombre: "Venezuela",
	ciudades:[{
			nombre: "Caracas",
			imagen: "img/ciudades/caracas.jpg"
		},
		{
			nombre: "Isla Margarita",
			imagen: "img/ciudades/isla margarita.jpg"
		}]
	},
	{
	nombre: "Colombia",
	ciudades:[{
			nombre: "Medellín",
			imagen: "img/ciudades/medellin.jpg"
		},
		{
			nombre: "Bogotá",
			imagen: "img/ciudades/bogota.jpg"
		}]
	},
	{
	nombre: "Perú",
	ciudades:[{
			nombre: "Lima",
			imagen: "img/ciudades/lima.jpg"
		},
		{
			nombre: "Cusco",
			imagen: "img/ciudades/cusco.jpg"
		}]
	}
];

var tarjetas = ["Visa", "Master", "Dinners", "OCA"];
var servicios = ["Piscina", "Estacionamiento vigilado", "Wi-fi", "Sauna", "TV Cable", "Aire acondicionado"];

//arrays de clientes, hoteles y paquetes son dinámicos
var clientes = [];
var hoteles = [];
var paquetes = [];
var paquetesFiltrados = [];
var paqueteSeleccionado;
var clienteSeleccionado;
var hotelesFiltrados = [];
var hotelSeleccionado;
var numeroDeCliente = 1;

$(document).ready(inicializar);
function inicializar(){
	irArriba(); //flecha para subir 
	cargarDestinos();
	cargarTarjetas();
	cargarServicios();
	ocultarSecciones();	
	mostrarSeccion();	
	cargarEventos();
};

function ocultarSecciones(){	
	$("section.main").children("section").hide();
	$(".defaultPage").show();
}

function mostrarSeccion(){
	$("nav>ul>li").children("a").click(function(){
		ocultarSecciones();
		$("section[id='"+$(this).attr("value")+"']").show();
		if($(this).attr("value") == "registrarPaquete"){
			$(".defaultPage").hide();
			cargarHoteles();
			$("#nombrePaquete").focus();
			$("#nombrePaquete").css("borderColor", "initial");
		}else if($(this).attr("value") == "busquedaReservaPaquete"){
			$(".defaultPage").hide();
			cargarClientes();
			$("#clientesRegistrados").focus();
			$("#clientesRegistrados").css("borderColor", "initial");
			ocultarDatosPaquete();	
		}else if($(this).attr("value") == "registrarHotel"){
			$(".defaultPage").hide();
			initMap();
			$("#nombreHotel").focus();
			$("#nombreHotel").css("borderColor", "initial");
		}else if($(this).attr("value") == "consultaReservas"){
			$(".defaultPage").hide();
			consultaReservas();
		}else if($(this).attr("value") == "gestionPaquetes"){
			$(".defaultPage").hide();
			gestionPaquetes();
			$("#gestionPaises").focus();
			$("#gestionPaises").css("borderColor", "initial");
		}else if($(this).attr("value") == "distribucionReservas"){
			$(".defaultPage").hide();
			distribucionReservas();
		}else if($(this).attr("value") == "registrarCliente"){
			$(".defaultPage").hide();
			$("#nombreCliente").focus();
			$("#nombreCliente").css("borderColor", "initial");
		}else if($(this).attr("value") == "inicioPagina"){
			$(".defaultPage").show();
		}
	});
}

function cargarEventos(){
	$("form>div>input,form>input").click(function(){
		if($(this).attr("id") == "cancelarCliente"){
			limpiarCamposCliente();
		}else if($(this).attr("id") == "registroCliente"){
			registrarCliente();
		}else if($(this).attr("id") == "cancelarHotel"){
			limpiarCamposHotel();
		}else if($(this).attr("id") == "registroHotel"){
			registrarHotel();
		}else if($(this).attr("id") == "cancelarPaquete"){
			limpiarCamposPaquete();
		}else if($(this).attr("id") == "registroPaquete"){
			registrarPaquete();
		}else if($(this).attr("id") == "busquedaPaquete"){
			buscarPaquete();
		}else if($(this).attr("id") == "cancelarReserva"){
			limpiarCamposReserva();
		}else if($(this).attr("id") == "reservoPaquete"){
			reservarPaquete();
		}
	});
	
	$(".divGrupo>select").on("change", function(){
		if($(this).attr("id") == "paisesHotel"){
			cargarCiudades();
		}else if($(this).attr("id") == "paquetePaises"){
			cargarCiudades();
			cargarHoteles();
		}else if($(this).attr("id") == "paqueteCiudades"){
			cargarHoteles();
		}else if($(this).attr("id") == "paqueteHoteles"){
			seleccionarHotel();
		}else if($(this).attr("id") == "clientesRegistrados"){
			seleccionarClienteReserva();
		}else if($(this).attr("id") == "reservaPaquetesPaises"){
			ocultarDatosPaquete();
		}else if($(this).attr("id") == "reservaPaquetesPaquetes"){
			mostrarDatosDePaquete();
		}else if($(this).attr("id") == "gestionPaises"){
			gestionPaquetes();
		}
	});
}

function ocultarDatosPaquete(){
	$("#listaPaquetes").hide();
	$("#listaPaquetesInfo").hide();	
	$("#busquedaReservaPaquete>article>form>input[type='button'][value='Cancelar'],[value='Reservar']").hide();		
}

function cargarDestinos() {
	var divDestinosCliente = $("#destinosCliente");
	var selectPaisesHotel = $("#paisesHotel");
	var selectPaisReserva = $("#reservaPaquetesPaises");
	var selectPaisPaquete = $("#paquetePaises");
	var selectPaisGestion = $("#gestionPaises");

	for (var i = 0; i < paises.length; i++) {
		// Clientes
		var pais = paises[i].nombre;
		var divGroup = $("<div></div>");
		divGroup.attr("class", "checkboxDivGroupCompund");

		var checkBox = $("<input>");
		var label = $("<label></label>");
		
		checkBox.attr("id",pais);
		label.attr("for", pais);
		checkBox.attr("type","checkbox");
		checkBox.attr("value",pais);
		divGroup.append(checkBox);
		divGroup.append(label);
		divDestinosCliente.append(divGroup);
		label.append(document.createTextNode(pais));//attr value y pasarle el valor

		// Hoteles
		var optionPaises1 = $("<option></option>");
		optionPaises1.text(paises[i].nombre);
		selectPaisesHotel.append(optionPaises1);
		
		var optionPaises2 = $("<option></option>");
		optionPaises2.text(paises[i].nombre);
		selectPaisReserva.append(optionPaises2);
		
		var optionPaises3 = $("<option></option>");
		optionPaises3.text(paises[i].nombre);
		selectPaisPaquete.append(optionPaises3);
		
		var optionPaises4 = $("<option></option>");
		optionPaises4.text(paises[i].nombre);
		selectPaisGestion.append(optionPaises4);
		
		// Ciudades por defecto
		if (i == 0) {
			var selectCiudadesHotel = $("#ciudadesHotel");
			var selectCiudadesPaquete = $("#paqueteCiudades");
			
			for (var j = 0; j < paises[0].ciudades.length; j++) {
				var optionCiudades1 = $("<option></option>");
				optionCiudades1.text(paises[0].ciudades[j].nombre);
				selectCiudadesHotel.append(optionCiudades1);
				
				var optionCiudades2 = $("<option></option>");
				optionCiudades2.text(paises[0].ciudades[j].nombre);
				selectCiudadesPaquete.append(optionCiudades2);
			}
		}
	}
	console.log('Finalizó la carga de destinos.');
}

function cargarTarjetas() {
	var select = $("#tarjetasCliente");

	for (var i = 0; i < tarjetas.length; i++) {
		var option = $("<option></option>");
		option.text(tarjetas[i]);
		select.append(option);
	}
	console.log('Finalizó la carga de tarjetas.');
}

function registrarCliente() {
	var cliente = new Object();	
	cliente.numeroDeCliente = numeroDeCliente;
	cliente.nombre = $("#nombreCliente").val();
	cliente.ci = $("#ciCliente").val();
	cliente.edad = $("#edadCliente").val();
	cliente.telefono = $("#telefonoCliente").val();
	cliente.email = $("#emailCliente").val();
	cliente.reservas = [];
	
	var divDestinosCliente = $("#destinosCliente>div>input");
	var des = [];
	
	for (var i = 0; i < divDestinosCliente.length; i++) {
		if (divDestinosCliente[i].checked) {
			des.push(divDestinosCliente[i].value);
		}
	}
	
	cliente.destinos = des;
	var tarjetasCliente = $("#tarjetasCliente option:selected").text();
	cliente.tarjeta = tarjetasCliente;

	if (validarRegistroCliente(cliente)) {
		clientes.push(cliente);
		mostrarMensaje("Info", "Cliente registrado correctamente!", $("#nombreCliente"), "success");
		limpiarCamposCliente();
		numeroDeCliente++;
		console.log('Finalizó el registro de cliente: Número:' + cliente.numeroDeCliente 
			+ ', Nombre: ' + cliente.nombre + ', Ci: ' + cliente.ci + ', Edad: ' + cliente.edad 
			+ ', Teléfono: ' + cliente.telefono + ', Email: ' + cliente.email + ', Tarjeta: ' + cliente.tarjeta
			+ ', Destinos: ' + cliente.destinos);
	}
	window.scrollTo(0,0);
}

function cargarCiudades() {
	var index1 = $("#paisesHotel")[0].selectedIndex;
	var index2 = $("#paquetePaises")[0].selectedIndex;
	var selectCiudadesHotel = $("#ciudadesHotel");
    var selectCiudadesPaquete = $("#paqueteCiudades");
		
	$(selectCiudadesHotel).children("option").remove();	
	$(selectCiudadesPaquete).children("option").remove();

	for (var i = 0; i < paises[index1].ciudades.length; i++) {
		var option = $("<option></option>");
		option.text(paises[index1].ciudades[i].nombre);
		selectCiudadesHotel.append(option);		
	}
	
	for (var i = 0; i < paises[index2].ciudades.length; i++) {			
		var option = $("<option></option>");
		option.text(paises[index2].ciudades[i].nombre);
		selectCiudadesPaquete.append(option);
	}
		
	console.log('Finalizó la carga de ciudades.');
}

function cargarServicios() {
	var serviciosHotel = $("#serviciosHotel");
	
	for (var i = 0; i < servicios.length; i++) {
		var divGroup = $("<div></div>");
		divGroup.attr("class","checkboxDivGroupCompund" );

		var servicio = servicios[i];
		var checkBox = $("<input>");
		var label = $("<label></label>");
		checkBox.attr("id",servicio);
		label.attr("for",servicio);
		checkBox.attr("type", "checkbox");
		checkBox.attr("value", servicio);
		divGroup.append(checkBox);
		divGroup.append(label);
		serviciosHotel.append(divGroup);
		label.append(document.createTextNode(servicio))
	}
	console.log('Finalizó la carga de servicios.');
}

function cargarHoteles(){	
	var selectHoteles = $("#paqueteHoteles");
	var paisPaquete = $("#paquetePaises option:selected").text();
	var ciudadPaquete = $("#paqueteCiudades option:selected").text();
		
	// Limpio los items
	selectHoteles.children("option").remove();
	
	hotelesFiltrados = [];
	for (var i = 0; i < hoteles.length; i++) {
		var paisHotel = hoteles[i].pais;
		var ciudadHotel = hoteles[i].ciudad;
		
		if(paisPaquete == paisHotel && ciudadPaquete == ciudadHotel){
			var option = $("<option></option>");
			option.text(hoteles[i].nombre);
			selectHoteles.append(option);
			hotelesFiltrados.push(hoteles[i]);
			if(selectHoteles.length == 1) {
				hotelSeleccionado = hoteles[i];
			}
		}		
	}
	console.log('Finalizó la carga de hoteles.');
}

function cargarClientes(){
	var selectClientes = $("#clientesRegistrados");
	selectClientes.empty();
	
	for (var i = 0; i < clientes.length; i++) {
		var option = $("<option></option>");
		option.text(clientes[i].ci + " - " + clientes[i].nombre);
		selectClientes.append(option);
		if(i == 0) {
			clienteSeleccionado = clientes[0];
		}
	}
	console.log('Finalizó la carga de clientes.');
}

function cargarPaquetes(){
	var selectPaquetes = $("#reservaPaquetesPaquetes");
	
	selectPaquetes.children("option").remove();

	for (var i = 0; i < paquetes.length; i++) {
		var option = $("<option></option>");
		option.text(paquetes[i].nombre);
		selectPaquetes.append(option);
	}
	console.log('Finalizó la carga de paquetes.');
}

function registrarHotel() {
	var hotel = new Object();
	hotel.nombre = $("#nombreHotel").val();

	var divServiciosHotel = $("#serviciosHotel");
	var serviciosHotel = $("#serviciosHotel>div>input");
	var ser = [];
	for (var i = 0; i < serviciosHotel.length; i++) {
		if (serviciosHotel[i].checked) {
			ser.push(serviciosHotel[i].value);
		}
	}
	hotel.servicios = ser;
	hotel.costo = $("#costoHotel").val();
	
	var paisesHotel = $("#paisesHotel option:selected").text();
	hotel.pais = paisesHotel;

	var ciudadesHotel = $("#ciudadesHotel option:selected").text();
	hotel.ciudad = ciudadesHotel;

	if (mapaClickeado) {
		hotel.ubicacion = true;
		hotel.latitudeSelected = latitudeSelected;
		hotel.longitudeSelected = longitudeSelected;
	} else {
		hotel.ubicacion = false;
	}

	if (validarRegistroHotel(hotel)) {
		hoteles.push(hotel);
		mostrarMensaje("Info", "Hotel registrado correctamente!", $("#nombreHotel"), "success");
		limpiarCamposHotel();
		console.log('Finalizó el registro de hotel: Nombre: ' + hotel.nombre + ', Costo: ' + hotel.costo + ', País: ' + hotel.pais 
			+ ', Ciudad: ' + hotel.ciudad + ', Servicios: ' + hotel.servicios 
			+ (hotel.ubicacion ? ', Latitud: ' + hotel.latitudeSelected + ', Longitud: ' + hotel.longitudeSelected : ''));
	}
	window.scrollTo(0,0);
}

function registrarPaquete(){
	var paquete = new Object();	
	paquete.nombre = $("#nombrePaquete").val();
	paquete.descripcion = $("#descripcionPaquete").val();
	paquete.cantHabSimples = $("#cantHabSimples").val();
	paquete.cantHabDobles = $("#cantHabDobles").val();
	paquete.mes = $("#mesPaquete").val();
	paquete.cantidadDias = $("#cantDiasPaquete").val();	
	paquete.hotel = hotelSeleccionado;	
	paquete.costoTraslado = $("#paqueteCostoTraslado").val();
	
	for(var i = 0; i < paises.length; i++) {
		if(paises[i].nombre == $("#paquetePaises option:selected").text()) {
			paquete.pais = paises[i];
		}
	}
	for(var i = 0; i < paquete.pais.ciudades.length; i++) {
		if(paquete.pais.ciudades[i].nombre == $("#paqueteCiudades option:selected").text()) {
			paquete.ciudad = paquete.pais.ciudades[i];
		}
	}
	
	if (validarRegistroPaquete(paquete)) {
		paquetes.push(paquete);
		mostrarMensaje("Info", "Paquete registrado correctamente!", $("#nombrePaquete"), "success");
		limpiarCamposPaquete();
		console.log('Finalizó el registro de paquete: Nombre: ' + paquete.nombre + ', Descripción: ' + paquete.descripcion +
		', Cantidad de habitaciones simples: '	+ paquete.cantHabSimples + ', Cantidad de habitaciones dobles: ' + paquete.cantHabDobles
		+ ', Mes: ' + paquete.mes + ', Cantidad de días: ' + paquete.cantidadDias + ', Pais: '+ paquete.pais.nombre + ', Ciudad: ' + paquete.ciudad.nombre
		+ ', Hotel: ' + paquete.hotel.nombre + ', Costo de traslado: ' + paquete.costoTraslado);
	}
	window.scrollTo(0,0);
}

function seleccionarHotel(){
	hotelSeleccionado = hotelesFiltrados[$("#paqueteHoteles")[0].selectedIndex];
}

function reservarPaquete(){
	var reserva = new Object();
	reserva.cantHabitacionesDobles = parseInt($("#cantPersonasHabDobles").val());
	reserva.cantHabitacionesSimples = parseInt($("#cantPersonasHabSimples").val());
	reserva.costoTotal = parseInt($("#costoTotalReserva").val().replace("$", ""));
	reserva.paquete = paqueteSeleccionado;
	
	if (validarRegistroReserva(reserva)) {
		//descontar la cantidad de habitaciones en el paquete
		paqueteSeleccionado.cantHabDobles -= reserva.cantHabitacionesDobles;
		paqueteSeleccionado.cantHabSimples -= reserva.cantHabitacionesSimples;	
	
		//el cliente tiene las reservas
		clienteSeleccionado.reservas.push(reserva);
		mostrarMensaje("Info", "Reserva realizada correctamente!", $("#clientesRegistrados"), "success");
		limpiarCamposReserva();
		console.log('Finalizó el registro de Reserva: Cant Hab Simples: ' + reserva.cantHabitacionesSimples 
		+ ', Cant Hab Dobles: ' + reserva.cantHabitacionesDobles 
		+ ', Costo: ' + reserva.costoTotal + ', Paquete: ' + reserva.paquete
		+ ', Mes: ' + reserva.paquete.mes);
	}
	window.scrollTo(0,0);
}

function seleccionarClienteReserva() {
	clienteSeleccionado = clientes[$("#clientesRegistrados")[0].selectedIndex];
}

function consultaReservas(){
	$("#tablaReservas>table>tbody>tr").children("td").remove();
	
	var datos = $("#tablaReservas>table>tbody");
	$("#tablaReservas").hide();
	$("#tablaReservasInfo").hide();
	
	if(clientesConReservas()){
		$("#tablaReservas").show();
		for(var i = 0;i<clientes.length; i++){
			if(clientes[i].reservas.length > 0){				
				var fila = $("<tr></tr>");
				datos.append(fila);
				var name = $("<td></td>");
				name.text(clientes[i].nombre);
				fila.append(name);
				var age = $("<td></td>");
				age.text(clientes[i].edad);
				fila.append(age);
				var cantReservas = $("<td></td>");
				cantReservas.text(clientes[i].reservas.length);
				fila.append(cantReservas);
				var montoTotalReservas = $("<td></td>");
				montoTotalReservas.text("$ " + sumaTotalDeReservas(clientes[i]));
				fila.append(montoTotalReservas);
			}	
		}	
	}
	else{
		$("#tablaReservasInfo").show();
	}	
}

function sumaTotalDeReservas(cliente){
	var total = 0;	
	for(var i = 0; i<cliente.reservas.length; i++){
		total += cliente.reservas[i].costoTotal;
	}	
	return total;
}

function clientesConReservas(){
	var tiene = false;
	
	for(var i=0; i<clientes.length && !tiene; i++){
		if(clientes[i].reservas.length > 0){
			tiene = true;
		}
	}
	return tiene;
}

function buscarPaquete(){
	$("#listaPaquetes").hide();
	$("#listaPaquetesInfo").hide();
	paquetesFiltrados = [];
	var cantPersonas = $("#cantPersonasViajan").val();
	var mes = $("#mesViaje").val();
	var pais = $("#reservaPaquetesPaises option:selected").text();
	
	for(var i = 0; i < paquetes.length; i++){
		var paisPaquete = paquetes[i].pais.nombre;
		var mesPaquete = paquetes[i].mes;
		var totalPersonas = parseInt((paquetes[i].cantHabDobles * 2)) + parseInt(paquetes[i].cantHabSimples);
	
		if(pais == paisPaquete && mes == mesPaquete && cantPersonas <= totalPersonas){
			paquetesFiltrados.push(paquetes[i]);			
		}
		console.log('Finalizó la carga de paquetes.');		
	}	
	
	if(paquetesFiltrados.length > 0 && cantPersonas > 0){
		$("#listaPaquetes").show();
		$("#busquedaReservaPaquete>article>form>input[type='button'][value='Cancelar'],[value='Reservar']").show();
		var selectPaquetes = $("#reservaPaquetesPaquetes");
			
		selectPaquetes.children("option").remove();
	
		for (var i = 0; i < paquetesFiltrados.length; i++) {
			var option = $("<option></option>");
			option.text(paquetesFiltrados[i].nombre);
			selectPaquetes.append(option);
		}
		mostrarDatosDePaquete();
	}else{
		$("#listaPaquetesInfo").show();		
	}
	window.scrollTo(0,0);
}

function mostrarDatosDePaquete(){
	paqueteSeleccionado = null;
	
	for(var i = 0; i<paquetesFiltrados.length; i++){
		if(paquetesFiltrados[i].nombre == $("#reservaPaquetesPaquetes option:selected").text()){
			paqueteSeleccionado = paquetesFiltrados[i];
		}
	}
	
	$("#listaPaquetes>figure>img").attr("src", paqueteSeleccionado.ciudad.imagen);
	$("#listaPaquetes>figure>figcaption").text(paqueteSeleccionado.hotel.nombre);
	
	var cantPersonas = parseInt($("#cantPersonasViajan").val());
	
	var habDobles = 0;
	var habSimples = 0;

	if(paqueteSeleccionado.cantHabDobles != 0){
		habDobles = (cantPersonas - cantPersonas % 2) / 2;
		if (paqueteSeleccionado.cantHabDobles < habDobles) {
			habDobles = paqueteSeleccionado.cantHabDobles;
		}
	}
	if(paqueteSeleccionado.cantHabSimples != 0){
		habSimples = cantPersonas - (habDobles * 2);
	}
	
	$("#cantPersonasHabDobles").val(habDobles);
	$("#cantPersonasHabSimples").val(habSimples);
		
	var costoTotalReserva = cantPersonas * paqueteSeleccionado.hotel.costo + cantPersonas * paqueteSeleccionado.costoTraslado;
	$("#costoTotalReserva").attr("value", "$ " + costoTotalReserva);
}

function gestionPaquetes(){
	$("#tablaGestionPaquetes>table>tbody").children("tr").remove();
	$("#tablaGestionPaquetes").hide();
	$("#tablaGestionPaquetesInfo").hide();
	
	var datos = $("#tablaGestionPaquetes>table>tbody");
	var pais = $("#gestionPaises option:selected").text();
	
	paquetes.sort(function(a,b){
		var i = 0;
		if (a.nombre > b.nombre) {
			i = 1;
		} else if (a.nombre < b.nombre) {
			i = -1;
		}
		return i;
	});
	
	if(paisConPaquete(pais)){
		$("#tablaGestionPaquetes").show();
		for(var i = 0;i<paquetes.length; i++){
			if(paquetes[i].pais.nombre == pais) {
				var fila = $("<tr></tr>");
				datos.append(fila);
				var name = $("<td></td>");
				name.text(paquetes[i].nombre);
				fila.append(name);
				var hotel = $("<td></td>");
				hotel.text(paquetes[i].hotel.nombre);
				fila.append(hotel);
				var country = $("<td></td>");
				country.text(paquetes[i].pais.nombre);
				fila.append(country);
				var city = $("<td></td>");
				city.text(paquetes[i].hotel.ciudad);
				fila.append(city);
				var disponible = $("<td></td>");
				if(paquetes[i].cantHabDobles > 0 || paquetes[i].cantHabSimples > 0){				
					disponible.text("Disponible");
					fila.append(disponible);
				}else{	
					disponible.text("No Disponible");
					fila.append(disponible);
				}
			}
		}
	}else{
		$("#tablaGestionPaquetesInfo").show();
	}
}

function paisConPaquete(pais){
	var tiene = false;
	
	for(var i=0; i<paquetes.length && !tiene; i++){
		if(paquetes[i].pais.nombre == pais){
			tiene = true;
		}
	}
	return tiene;
}

function distribucionReservas(){
	var datos = [];
	var hayDatos = false;
	$("#containerInfo").hide();		
	$("#container").hide();	
	
	if(clientes.length > 0){
		for(var i = 0; i<12; i++){
			var cantClientes = 0;
			for(var j = 0; j < clientes.length; j++) {
				for(var k = 0; k < clientes[j].reservas.length; k++) {
					if(clientes[j].reservas[k].paquete.mes == i+1) {
						cantClientes += clientes[j].reservas[k].cantHabitacionesDobles * 2 + clientes[j].reservas[k].cantHabitacionesSimples;
						hayDatos = true;
					}
				}				
			}
			datos[i] = cantClientes;
		}
	}
	if(!hayDatos){
		$("#containerInfo").show();		
	}else{
		chartInicializar(datos)
		$("#container").show();
	}	
}

function mostrarMensaje(titulo, mensaje, elemento, img) {
	$("#modalGenerico").on('hidden.bs.modal', function () {
		elemento.css("borderColor", "initial");
		elemento.focus();
	});
	
	if(img == "error") {
		$("#cabeceraModal").html("<div class='imagenModal'><img src='img/icons/error.png'></div><div>" + titulo + "</div>");
	} else if (img == "success") {
		$("#cabeceraModal").html("<div class='imagenModal'><img src='img/icons/success.png'></div><div>" + titulo + "</div>");
	} else {
		$("#cabeceraModal").html("<div class='text-center miclase'>" + titulo + "</div>" + titulo);
	}
	$("#mensajeModal").html(mensaje);
	$("#modalGenerico").modal("show");
}

function irArriba() {
	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
 
	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		}
	});
}