// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};


/*
  Api de la base de datos en modo desarrolo

*/
export const APILOCAL = {
  url: 'http://localhost:5000'
};

export const OPENPAYKEYS = {
  MERCHANT_ID: 'm6guc0dqh2k6d0vvqdgx',
  PUBLIC_API_KEY: 'pk_11bf6d524af74be78e156937c4dd4065',
  URL : 'https://sandbox-api.openpay.mx/v1/'
}



