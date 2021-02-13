let zonaBody = document.firstElementChild.firstElementChild.nextElementSibling;

//Función cargado de la página principal con los botones
function cargadoPagina() {
    let divPrePage = crearNodo("div", "", [], [{
        name: "id",
        value: "divPrePage"
    }]);
    let prePage = crearNodo("h2", "Elige el método para realizar AJAX: ", [], [{
        name: "id",
        value: "prePage"
    }]);
    let botonXHR = crearNodo("button", "XHR", [], [{
        name: "id",
        value: "botonXHR"
    }]);
    let botonFetch = crearNodo("button", "Fetch", [], [{
        name: "id",
        value: "botonFetch"
    }]);
    let botonJQuery = crearNodo("button", "JQuery", [], [{
        name: "id",
        value: "botonJQuery"
    }]);

    divPrePage.appendChild(prePage);
    divPrePage.appendChild(botonXHR);
    divPrePage.appendChild(botonFetch);
    divPrePage.appendChild(botonJQuery);

    zonaBody.append(divPrePage);

    console.log("página principal cargada correctamente");
}

//Función para crear la estructura ignorando que método "GET" sea elegido
function estructuraDOM() {
    console.log("hola, se supone que me estoy creando.");

}

/* -------------------XHR DUUUUUDE -------------------- */

//Función genérica para hacer peticiones a una API pasando por parámetro el tipo de método y la url de la API.
const enviarHttpRequest = (metodo, url, datos) => {
    //la promesa se queda onhold hasta que tiene el resultado, correcto o incorrecto. 
    const promise = new Promise((resultado, rechazo) => {
        //creo el request, 
        const xhr = new XMLHttpRequest();
        xhr.open(metodo, url);

        xhr.responseType = 'json';

        //Añadir headers 
        if (datos) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            //Si el status suelta un error en la carga de los datos DE LA PROMESA, lo manejo yo.
            //Y rechazo los datos para que no siga más adelante.
            if (xhr.status >= 400) {
                rechazo(xhr.response);
                //Si el resultado es correcto, muestro el resultado satisfactorio DE LA PROMESA.
            } else {
                resultado(xhr.response);
            }
        };

        //Disparo un error cuando algo relacionado con mis peticiones, 
        //pero si la API tiene un código de error para ciertas situaciones, 
        //no se mostrará esto, sino el error predefinido por el servidor API.
        xhr.onerror = () => {
            rechazo("Algo ha salido mal");
        };

        xhr.send(JSON.stringify(datos));
    });
    return promise;
};

//Función para realizar la busqueda por XHR
function getXHR() {
    //maquetación principal
    estructuraDOM();

    console.log("Haz elegido el método XHR para realizar la búsqueda de tiendas");

    enviarHttpRequest('GET', 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/').then(respuestaDatos => {

        console.log(respuestaDatos);

        //en caso de error
    }).catch(problema => {

        console.log(problema);
    });

};

//Función para realizar el método POST de una tienda nueva por XHR
function postXHR() {
    console.log(`Enviada la petición de subir una "Tienda"`);
    
/*     enviarHttpRequest('POST', 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/', {
        //Ejemplo.
        direccion: "Calle Tengo Depresión Severa",
        localidad: "Tengo sueño también",
        nombreTienda: "Nombraso Tiendaso",
        telefono: "922202122"

    }).then(respuestaDatos => {
        console.log(respuestaDatos);
    }); */
    
}

/* -------------------FETCH-------------------- */

//Función para realizar la busqueda por Fetch
async function getFetch() {
    //maquetación principal
    estructuraDOM();
    console.log("Haz elegido el método Fetch para realizar la búsqueda de tiendas");
}
//Función para realizar el método POST de una tienda nueva por XHR
function postFetch() {
    console.log(`Enviada la petición de subir una "Tienda"`);
}

/* -------------------JQUERY-------------------- */

//Función para realizar la busqueda por JQuery
async function getJQuery() {
    //maquetación principal
    estructuraDOM();
    console.log("Haz elegido el método JQuery para realizar la búsqueda de tiendas");

}
//Función para realizar el método POST de una tienda nueva por JQuery
function postJQuery() {
    console.log(`Enviada la petición de subir una "Tienda"`);


}


function crearNodo(tipoNodo, textoNodo, clasesNodo, atributos) {

    let nodo = document.createElement(tipoNodo);

    if (textoNodo != "" && textoNodo != null) {
        nodo.appendChild(document.createTextNode(textoNodo));
    }
    if (clasesNodo.length > 0) {
        clasesNodo.forEach(clase => nodo.classList.add(clase));
    }
    if (atributos.length > 0) {
        atributos.forEach(atributo => nodo.setAttribute(atributo.name, atributo.value));
    }
    return nodo;
}

//función para borrar nodos
function borrarNodos(nodo) {
    while (nodo.firstChild) {
        nodo.removeChild(nodo.lastChild);
    }
}


cargadoPagina();

//Botones principales para elegir el método de funcionamiento de la búsqueda de Tiendas (CARGADOS DESPUÉS DE CARGAR LA PÁGINA PRINCIPAL, SINO NO EXISTEN)
document.getElementById("botonXHR").addEventListener("click", function () {
    borrarNodos(divPrePage);
    getXHR();
});
document.getElementById("botonFetch").addEventListener("click", function () {
    borrarNodos(divPrePage);
    getFetch();
});
document.getElementById("botonJQuery").addEventListener("click", function () {
    borrarNodos(divPrePage);
    getJQuery();
});