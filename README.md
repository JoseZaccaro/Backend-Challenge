### Koibanx Backend Challenge
Para correr el proyecto deberá correr en la consola de comandos el comando `npm install` y luego el comando `npm start`.

Una vez el servidor esté corriendo puede acceder mediante un cliente HTTP a los siguientes endpoints, siempre enviando las credenciales de autenticación de usuario por las cabeceras del pedido.

- `GET` `/api/stores`: Devuelve una lista de tiendas, las cuales pueden ser filtradas mediante una [query de busqueda](https://restdb.io/docs/querying-with-the-api#restdb "query de busqueda"), como tambien definir la la pagina y cantidad de tiendas que quiero (por defecto: pagina 1, tiendas: 100).
**Ejemplos**: 
	 - `/api/stores?q={"active":true}`
	 - `/api/stores?q={"cuit":"01234567890","active":false}&size=10`
	 - `/api/stores?size=5&page=3`
	 - `/api/stores?q={}&size=10&page=5`

- `POST` `/api/stores`: Se deben enviar todos los datos requeridos y en el formato correcto en el cuerpo del pedido para su posterior creacion y guardado. El pedido devuelve la información de la nueva tienda creada.

- `POST` `/api/seeder`: Este ruta permite crear 150 tiendas con información falsa para testear la funcionalidad de los anteriores endpoints. Devuelve un mensaje de creacion exitosa de 150 tiendas . En caso de fallar lo informará en la respuesta.

- `DELETE` `/api/seeder`: Esta ruta permite limpiar la base de datos eliminando todas las tiendas al finalizar los testeos.

