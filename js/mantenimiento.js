$(document).ready(inicializar);

function inicializar(){
	cargarValidadores();
};

function cargarValidadores() {	
	$("input[type='text'],[type='email'], [type='number'],[type='tel']").blur(function() {
		if(this.value.trim() == ""){
			$(this).css("borderColor", "red");
		}
	});
	
	$("input").keypress(function() {
		$(this).css("borderColor", "initial");
	});
	
	$("input").click(function() {
		if(this.value == -1 || this.value==150){
			this.value = 0;
		}
		$(this).css("borderColor", "initial");
	});
};

//validador y limpiador de clientes
function validarRegistroCliente(cliente) {
	var msg = "";
	var error = false;
	if (!cliente.nombre || !cliente.nombre.trim()) {
		msg += "<li> El nombre del cliente está vacío. </li>";
		error = true;
	}
	if (!cliente.ci) {
		msg += "<li> La ci del cliente está vacía. </li>";
		error = true;
	}
	if (!cliente.edad) {
		msg += "<li> La edad del cliente está vacía. </li>";
		error = true;
	}
	if (cliente.destinos.length == 0) {
		msg += "<li> No se han seleccionado destinos. </li>";
		error = true;
	}

	for(var i = 0; i<clientes.length; i++){
		var ciClienteSeleccionado = clientes[i].ci;
		if(ciClienteSeleccionado == cliente.ci){
			msg += "<li>La cédula del cliente que intenta registrar ya existe.</li>";
			error = true;
		}
	}
	
	if (error) {
		mostrarMensaje("Error", "Faltan datos obligatorios: <br>" + msg, $("#nombreCliente"), "error");
	}
	return !error;
};

function limpiarCamposCliente() {
	$("#nombreCliente").val("");
	$("#ciCliente").val("");
	$("#edadCliente").val("");
	$("#telefonoCliente").val("");
	$("#emailCliente").val("");
	$("#tarjetasCliente")[0].selectedIndex = 0;	
	
	var destinosCliente = $(".checkboxDivGroupCompund").children("input");	
	for (var i = 0; i < destinosCliente.length; i++) {
		destinosCliente[i].checked = false;
	}
	window.scrollTo(0,0);
	$("#nombreCliente").focus();	
};

//validador y limpiador de hoteles
function validarRegistroHotel(hotel) {
	var msg = "";
	var error = false;
	if (!hotel.nombre || !hotel.nombre.trim()) {
		msg += "<li> El nombre del hotel está vacío. </li>";
		error = true;
	}
	if (hotel.servicios.length == 0) {
		msg += "<li> No se han seleccionado servicios. </li>";
		error = true;
	}
	if (!hotel.costo) {
		msg += "<li> El costo del hotel está vacío. </li>";
		error = true;
	}
	if (error) {
		mostrarMensaje("Error", "Faltan datos obligatorios: <br>" + msg, $("#nombreHotel"), "error");
	}
	return !error;
};

function limpiarCamposHotel(){
	$("#nombreHotel").val("");
	$("#costoHotel").val("");
	$("#costoHotel").val("");
	$("#hotelcantHabSimples").val("");
	$("#hotelcantHabDobles").val("");

	$("#paisesHotel")[0].selectedIndex = 0;
	
	var selectCiudadesHotel = $("#ciudadesHotel");
	// Limpio los items
	selectCiudadesHotel.each(function(){
		$(this).empty();
	});	
	
	for(var i = 0; i<paises[0].ciudades.length; i++){
		var optionCiudades = $("<option></option>");
		optionCiudades.text(paises[0].ciudades[i].nombre);
		selectCiudadesHotel.append(optionCiudades);
	}
	
	mapaClickeado = false;
	
	var serviciosHotel = $(".checkboxDivGroupCompund").children("input");
	for (var i = 0; i < serviciosHotel.length; i++) {
		serviciosHotel[i].checked = false;
	}
	window.scrollTo(0,0);
	$("#nombreHotel").focus();
};

//validador y limpiador de paquetes
function validarRegistroPaquete(paquete){
	var msg = "";
	var error = false;
	if (!paquete.nombre || !paquete.nombre.trim()) {
		msg += "<li> El nombre del paquete está vacío. </li>";
		error = true;
	}
	if (!paquete.cantHabSimples) {
		msg += "<li> No se han ingresado cant. de habitaciones simples. </li>";
		error = true;
	}
	if (!paquete.cantHabDobles) {
		msg += "<li> No se han ingresado cant. de habitaciones dobles. </li>";
		error = true;
	}
	if (!paquete.mes) {
		msg += "<li> No se ha ingresado el mes. </li>";
		error = true;
	}if (paquete.mes < 1 || paquete.mes > 12) {
		msg += "<li> El mes no está entre 1 y 12. </li>";
		error = true;
	}
	if (!paquete.cantidadDias) {
		msg += "<li> No se ha ingresado cantidad de días. </li>";
		error = true;
	}
	if (!paquete.costoTraslado) {
		msg += "<li> El costo de traslado del paquete está vacío. </li>";
		error = true;
	}
	if(paquete.cantHabDobles <= 0 && paquete.cantHabSimples <= 0){
		msg += "<li> Al menos una de las habitaciones debe ser mayor a cero. </li>";
		error = true;
	}
	if(paquete.costoTraslado < 0) {
		msg += "<li> El costo de traslado no puede ser menor a cero. </li>";
		error = true;
	}
	if (error) {
		mostrarMensaje("Error", "Faltan datos obligatorios: <br>" + msg, $("#nombreHotel"), "error");
	}
	return !error;
};

function limpiarCamposPaquete(){
	$("#nombrePaquete").val("");
	$("#descripcionPaquete").val("");
	$("#cantHabSimples").val("");
	$("#cantHabDobles").val("");
	$("#mesPaquete").val("");
	$("#cantDiasPaquete").val("");
	$("#nombrePaquete").val("");
	$("#paqueteCostoTraslado").val("");
	window.scrollTo(0,0);
	$("#nombrePaquete").focus();
};

//validador y limpiador de reservas
function validarRegistroReserva(reserva){
	var msg = "";
	var error = false;
	var cantPersonas = $("#cantPersonasViajan").val();
	
	if (reserva.cantHabitacionesDobles < 0 && reserva.cantHabitacionesSimples < 0) {
		msg += "<li> Al menos una de las habitaciones debe ser mayor a cero. </li>";
		error = true;
	}
	if (reserva.paquete.cantHabDobles < reserva.cantHabitacionesDobles) {
		msg += "<li> Cantidad de habitaciones dobles seleccionadas no disponibles. </li>";
		error = true;
	}
	if (reserva.paquete.cantHabSimples < reserva.cantHabitacionesSimples) {
		msg += "<li> Cantidad de habitaciones simples seleccionadas no disponibles. </li>";
		error = true;
	}
	if (error) {
		mostrarMensaje("Error", "Faltan datos obligatorios: <br>" + msg, $("#nombreHotel"), "error");
	}
	return !error;
}

function limpiarCamposReserva(){
	$("#clientesRegistrados")[0].selectedIndex = 0;
	$("#cantPersonasViajan").val("");
	$("#mesViaje").val("");
	$("#reservaPaquetesPaises")[0].selectedIndex = 0;	
	$("#cantPersonasHabDobles").val("");
	$("#cantPersonasHabSimples").val("");
	$("#costoTotalReserva").attr("value","0");
	$("#busquedaReservaPaquete>article>form>input[type='button'][value='Cancelar'],[value='Reservar']").hide();
	$("#listaPaquetes").hide();
	$("#listaPaquetesInfo").hide();
	window.scrollTo(0,0);
	$("#clientesRegistrados").focus();
}