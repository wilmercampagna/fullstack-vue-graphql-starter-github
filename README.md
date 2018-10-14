# Servidor

Hola, este proyecto fue desarrollado con el stack MAVN, Mongo - Apollo - Vue - Node,
Se usó el servicio de mlab.com para el manejo de la base de datos. 
Se utilizó la capa de graphql para el manejo de información entre el backend y el frontend.

Para el manejo de estilos se utilizó el framework Bulma.

Antes de correr el proyecto tendrás que configurar la conexión con tu base de datos, para ello ingresa al archivo variables.env y configura allí tu mongo URI para que establezcas la conexión con tu base de datos, sea en local o remota.

Te recomiendo uses el servicio de mlab para manejar tu base de datos en MongoDB de forma remota, puedes usar el servicio de forma gratuita hasta 500 MB de información. No necesitarás más que eso para esta app.

He usado el manejador de paquetes Yarn, sin embargo puedes usar npm, para ello deberás eliminar el archivo yarn.lock y luego correr npx install.

Usa la versión LTS más reciente de node y de npm.

Y ahora si, puedes darle a correr al proyecto.
Espero sea de utilidad este código para ti.

## Project setup
```
yarn install
```

### para correr el servidor ejecuta el comando
```
yarn server
```

### Para ejecutar el frontend
```
cd cliente

yarn install

yarn build

yarn serve
```

Si tienes alguna duda, envíame un correo a wilmercampagna@gmail.com, si puedo ayudarte, con gusto lo haré.

Saludos.
