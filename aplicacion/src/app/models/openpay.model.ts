import { OPENPAYKEYS } from "../../environments/environment";
import { ElementRef } from "@angular/core";
import { OrdenService } from "../services";
import { Orden } from "./orden.model";
import { Usuario } from "./usuario.model";
import { BehaviorSubject } from "rxjs";

export class OpenPayModel {
    private MERCHANT_ID: string = OPENPAYKEYS.MERCHANT_ID;
    private PUBLIC_API_KEY: string = OPENPAYKEYS.PUBLIC_API_KEY;
	private produccion: boolean;
	private form: ElementRef;
	private orden: Orden;
	private usuario: Usuario;
	private status  = new BehaviorSubject<number | string>(0)
	private tarjeta: Tarjeta = {id: null, aNombreDe: null, marca: null};

    constructor(form: ElementRef, produccion: boolean = true) {
		this.produccion = produccion
		this.form = form;
	}

    crearToken(obj?: Costumer, orden?: Orden, usuario?: Usuario) {
		OpenPay.setId(this.MERCHANT_ID);
        ​OpenPay.setApiKey(this.PUBLIC_API_KEY);
		OpenPay.setSandboxMode(this.produccion);
		OpenPay.token.create(obj, this.SuccessCallback, this.ErrorCallback);
		this.orden = orden;
		this.usuario = usuario;
	}

	obtenerStatus() {
		return this.status;
	}

	validarCarNumber(cardNumber: string) {
		return OpenPay.card.validateCardNumber(cardNumber);
	}

	validarCVC(cvc: string, cardNumber?: string) {
		return cardNumber ? OpenPay.card.validateCVC(cvc) : OpenPay.card.validateCVC(cvc, cardNumber);
	}

	validarEspiriacion(mes: string, anio: string) {
		return OpenPay.card.validateExpiry(mes, mes);
	}

	tipoCard(cardNumber: string) {
		return OpenPay.card.cardType(cardNumber);
	}

	private SuccessCallback = (response) => {
		// alert('Operación exitosa');
		var deviceSessionId = OpenPay.deviceData.setup("payment-form", "divice_id_token");

		let chargeRequest = {
			source_id : response.data.id,
			method : 'card',
			amount :  this.orden.$monto,
			currency : 'MXN',
			description : 'Compra de boleto(s) de Glow run 5k',
			order_id : this.orden.$id,
			device_session_id : deviceSessionId,
			send_email: true,
			redirect_url: 'localhost:5000/user',
			customer : {
				 name : response.data.card.holder_name,
				 last_name : response.data.card.holder_name,
				 email : this.usuario.getCorreo(),
			}	
		}

		OrdenService.pagar(this.orden.$id ,chargeRequest).then(res =>{
			 res.data.error_code ? this.status.next(res.data.error_code) : this.status.next(res.data)
			})
	}

	private ErrorCallback = (response) => {
		// alert('Error en la transaccion');
		this.status.next(response.message)
	}	
}

export interface Costumer {
	"card_number": string,
	"holder_name": string,
	"expiration_year": string,
	"expiration_month": string,
	"cvv2": string,
    "address"?:{
       "city": string,
       "line3": string,
       "postal_code": number,
       "line1": string,
       "line2": string,
       "state": string,
	   "country_code": string
	}
}

export interface Tarjeta {
	id: string,
	aNombreDe: string,
	marca: string
}