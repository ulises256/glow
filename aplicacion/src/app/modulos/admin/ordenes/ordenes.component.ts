import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Orden } from '../../../models';
import { OrdenService} from '../../../services';
import { DetallesUsuarioComponent } from '../fragments/detalles-usuario/detalles-usuario.component';


interface Cargos {
	id: string,
	holder_name: string,
	amount: number,
	method: string,
	transaction_type: string,
	status: string,
	operation_date: Date,
	description: string,
	order_id: string,
	customer_id: string
}	


@Component({
	selector: 'app-ordenes',
	templateUrl: './ordenes.component.pug',
	styleUrls: ['./ordenes.component.styl']
})



export class OrdenesComponent implements OnInit {

	columns_openpay = [];
	columns_ordenes = [];

	dataSourceOpenpay: MatTableDataSource<Cargos>;
	cargos: Cargos[] = [];

	dataSourceOrdenes: MatTableDataSource<Orden>;
	ordenes: Orden[] = [];	

	@ViewChild(MatPaginator) paginator: MatPaginator;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatSort) sortOrdenes: MatSort;

	columnsOpen = [
		{
			id: "id",
			value: "id"
		},
		{
			id: "holder_name",
			value: "Nombre"
		},
		{
			id: "amount",
			value: "Monto"
		},
		{
			id: "method",
			value: "Metodo"
		},
		{
			id: "transaction_type",
			value: "Tipo de trans."
		},
		{
			id: "status",
			value: "Estatus"
		},
		{
			id: "operation_date",
			value: "Fecha operación"
		},	
		{
			id: "description",
			value: "Descripción"
		},
		{
			id: "order_id",
			value: "Id Orden"
		},
		{
			id: "customer_id",
			value: "Id Cliente"
		},				
	];

	columnsOrdenes = [
		{
			id: "id",
			value: "id"
		},
		{
			id: "nombre",
			value: "Nombre"
		},
		{
			id: "monto",
			value: "Monto"
		},
		{
			id: "fechaCompra",
			value: "Fecha compra"
		},
		{
			id: "cantidad",
			value: "Cantidad de boletos"
		},
		{
			id: "status",
			value: "Estatus"
		},
		{
			id: "descuento",
			value: "Descuento"
		},					
	];	

	constructor(private dialog: MatDialog) {


		this.columns_openpay = this.columnsOpen.map(n => n.id);
		this.columns_ordenes = this.columnsOrdenes.map(n => n.id);

		this.dataSourceOpenpay = new MatTableDataSource(this.cargos);
		this.dataSourceOrdenes = new MatTableDataSource(this.ordenes);

		OrdenService.obtenerCargos({offset: 25, limit: 25})
		.then(r => {

			if(r && r.data)
				this.dataSourceOpenpay = new MatTableDataSource(r.data.lista.map(c => {
					 let cargo: Cargos = {
						id: c.id,
						holder_name: c.card.holder_name,
						amount: c.amount,
						method: c.method,
						transaction_type: c.transaction_type,
						status: c.status,
						operation_date: c.operation_date,
						description: c.description,
						order_id: c.order_id,
						customer_id: c.customer_id
					}

					return cargo;
				}))
		});

		OrdenService.obtenerOrdenes()
		.then(r => {
			if(r && r.data)
				this.dataSourceOrdenes = new MatTableDataSource(r.data.map(o => {
					return new Orden(o);
				}))
		})

	}

	ver(id) {
		// const dialogRef = this.dialog.open(DetallesUsuarioComponent, {
		// 	width: '90%',
		// 	height: '90%',
		// 	data: id
		// });

		// dialogRef.afterClosed().subscribe(result => {
		// });
	}

	applyFilter(filterValue: string) {
		// this.dataSource.filter = filterValue.trim().toLowerCase();

		// if (this.dataSource.paginator) {
		//   this.dataSource.paginator.firstPage();
		// }
	  }

	ngOnInit() {
		this.dataSourceOrdenes.paginator = this.paginator;

		this.dataSourceOpenpay.sort = this.sort;
		this.dataSourceOrdenes.sort = this.sortOrdenes;
	}

}
