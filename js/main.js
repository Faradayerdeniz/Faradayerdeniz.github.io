const zonaMain = document.getElementsByTagName("main")[0];
const zonaBody = document.firstElementChild.firstElementChild.nextElementSibling;
const divTiendas = document.getElementById("Tiendas");
const divFormulario = document.getElementById("formulario");
const peticion = new XMLHttpRequest();

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
};



//Función para crear la estructura ignorando que método "GET" sea elegido
function estructuraDOM(datos) {
    let divNuevaTienda = crearNodo("div", "", [], [{
        name: "id",
        value: "divNuevaTienda"
    }]);
    let fakeBtn = crearNodo("button", "Nueva Tienda", [], [{
        name: "id",
        value: "fakeBtn"
    }]);
    let inputBuscar = crearNodo("input", "", [], [{
        name: "id",
        value: "inputBuscar"
    }, {
        name: "type",
        value: "text"
    }, {
        name: "placeholder",
        value: "ID de Tienda"
    }]);
    let botonBuscar = crearNodo("button", "🔍", [], [{
        name: "id",
        value: "botonBuscar"
    }])
    let divBuscasiao = crearNodo("div", "", [], [{
        name: "id",
        value: "divBuscasiao"
    }]);

    divBuscasiao.appendChild(inputBuscar);
    divBuscasiao.appendChild(botonBuscar);
    divNuevaTienda.appendChild(fakeBtn);
    divNuevaTienda.appendChild(divBuscasiao);
    zonaMain.appendChild(divNuevaTienda);
    let formulario = crearNodo("div", "", ["cerrado"], [{
        name: "id",
        value: "divFormulario"
    }]);

    let divGrid = crearNodo("form", "", [], [{
        name: "id",
        value: "divGrid"
    }, {
        name: "novalidate",
        value: ""
    }]);
    let tituloFormulario = crearNodo("h1", "Nueva Empresa", [], [{}]);
    let labelNombre = crearNodo("label", "Nombre", [], [{
        name: "for",
        value: "inputNombre"
    }]);
    let labelDireccion = crearNodo("label", "Dirección", [], [{
        name: "for",
        value: "inputDireccion"
    }]);
    let labelLocalidad = crearNodo("label", "Localidad", [], [{
        name: "for",
        value: "inputLocalidad"
    }]);
    let labelTelefono = crearNodo("label", "Teléfono", [], [{
        name: "for",
        value: "inputTelefono"
    }]);
    let inputNombre = crearNodo("input", "", [], [{
        name: "id",
        value: "inputNombre"
    }, {
        name: "placeholder",
        value: "Nombre de la empresa"
    }, {
        name: "required",
        value: ""
    }]);
    let inputDireccion = crearNodo("input", "", [], [{
        name: "id",
        value: "inputDireccion"
    }, {
        name: "placeholder",
        value: "Dirección de la empresa"
    }, {
        name: "required",
        value: ""
    }]);
    let inputLocalidad = crearNodo("input", "", [], [{
        name: "id",
        value: "inputLocalidad"
    }, {
        name: "placeholder",
        value: "Localidad de la empresa"
    }, {
        name: "required",
        value: ""
    }]);
    let inputTelefono = crearNodo("input", "", [], [{
        name: "id",
        value: "inputTelefono"
    }, {
        name: "placeholder",
        value: "Teléfono de la empresa"
    }, {
        name: "required",
        value: ""
    }]);
    let addTienda = crearNodo("button", "Añadir Tienda", [], [{
        name: "id",
        value: "addTienda"
    }]);

    divGrid.append(labelNombre, inputNombre, labelDireccion, inputDireccion, labelLocalidad, inputLocalidad, labelTelefono, inputTelefono, addTienda);

    formulario.append(tituloFormulario);
    formulario.appendChild(divGrid);
    zonaMain.appendChild(formulario);

    datos.forEach(tienda => {
        let padentroTiendas = (crearNodo("div", "", ["tienda"], [{}]));
        let nombreTienda = crearNodo("h1", tienda.nombreTienda, [], [{}]);
        let direccionTienda = crearNodo("p", tienda.localidad + " " + tienda.direccion, [], [{}]);
        let telefonoTienda = crearNodo("p", tienda.telefono, [], [{}]);

        padentroTiendas.appendChild(nombreTienda);
        padentroTiendas.appendChild(direccionTienda);
        padentroTiendas.appendChild(telefonoTienda);
        zonaMain.appendChild(padentroTiendas);
    });

};



/* -------------------XHR-------------------- */

//Función para realizar la busqueda por XHR
function getXHR() {
    console.log("Haz elegido el método XHR para realizar la búsqueda de tiendas");

    if (peticion.readyState === 4 && peticion.status === 200) {
        let datos = peticion.responseText;
        datos = JSON.parse(datos);
        console.log(datos);
        borrarNodos(divPrePage);
        estructuraDOM(datos);
    }
    peticion.open("GET", "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/");
    peticion.send();

};

//Función para realizar el método POST de una tienda nueva por XHR
function postXHR() {
    console.log(`Enviada la petición de subir una "Tienda"`);

};

/* -------------------FETCH-------------------- */

//Función para realizar la busqueda por Fetch
async function getFetch() {
    console.log("Haz elegido el método Fetch para realizar la búsqueda de tiendas");
    await fetch('https://webapp-210130211157.azurewebsites.net/webresources/mitienda/')
        .then(function (respuesta) {
            return respuesta.text();
        })
        .then(function (datos) {
            datos = JSON.parse(datos);
            console.log(datos);
            borrarNodos(divPrePage);
            estructuraDOM(datos);
        })
        .catch(error => {
            console.log(error);
        });

}





//Función que recibe el método (GET O POST), la URL de la API a la que accedemos y recibe los Datos que pasa a formato JSON para su uso.


//Función para realizar el método POST de una tienda nueva por Fetch
function postFetch() {
    console.log(`Enviada la petición de subir una "Tienda"`);
    enviarHttpRequestFetch('POST', 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/', {
        /*Aquí dentro iría un objeto tienda que tengo que rellenar con los values de los inputs VALIDADOS*/
    }).then(respuestaDatos => {
        console.log(respuestaDatos);
    }).catch(error => {
        console.log(error, error.respuestaDatos);
    });

};

/* -------------------JQUERY-------------------- */

//Función para realizar la busqueda por JQuery
async function getJQuery() {
    console.log("Haz elegido el método JQuery para realizar la búsqueda de tiendas");
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/',
        success: datos => {
            // en data tenemos lo recibido
            console.log(datos);
            borrarNodos(divPrePage);
            estructuraDOM(datos);
        },
        error: () => {
            alert("error");
        },
        always: () => {
            console.log("complete");
        }
    });
};



//Función para realizar el método POST de una tienda nueva por JQuery
function postJQuery() {
    console.log(`Enviada la petición de subir una "Tienda"`);
    $.ajax({
        type: 'POST',
        url: 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/',
        success: function (respuestaDatos) {
            console.log('Datos correctos', respuestaDatos);
        }

    });

};


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
};

//función para borrar nodos
function borrarNodos(nodo) {
    while (nodo.firstChild) {
        nodo.removeChild(nodo.lastChild);
    }
};

cargadoPagina();

//Botones principales para elegir el método de funcionamiento de la búsqueda de Tiendas (CARGADOS DESPUÉS DE CARGAR LA PÁGINA PRINCIPAL, SINO NO EXISTEN)
document.getElementById("botonXHR").addEventListener("click", getXHR);
document.getElementById("botonFetch").addEventListener("click", getFetch);
document.getElementById("botonJQuery").addEventListener("click", getJQuery);