function chartInicializar(datos){
	// Create the chart
	Highcharts.chart('container', {
		chart: {
			type: 'column'
		},
		title: {
			text: 'Distribución de reservas.'
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: 'Cantidad de personas'
			}
	
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y:.0f}'
				}
			}
		},
	
		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> Cant. Personas<br/>'
		},
	
		series: [{
			name: 'Mes',
			colorByPoint: true,
			data: [{
				name: 'Enero',
				y: datos[0]
			}, {
				name: 'Febrero',
				y: datos[1]				
			}, {
				name: 'Marzo',
				y: datos[2]
			}, {
				name: 'Abril',
				y: datos[3]
			}, {
				name: 'Mayo',
				y: datos[4]
			}, {
				name: 'Junio',
				y: datos[5]
			}, {
				name: 'Julio',
				y: datos[6]
			}, {
				name: 'Agosto',
				y: datos[7]
			}, {
				name: 'Septiembre',
				y: datos[8]
			}, {
				name: 'Octubre',
				y: datos[9]
			}, {
				name: 'Noviembre',
				y: datos[10]
			}, {
				name: 'Diciembre',
				y: datos[11]
			}]
		}]
	});
}
