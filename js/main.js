let zonaBody = document.firstElementChild.firstElementChild.nextElementSibling;

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


function getXHR() {
    console.log("Haz elegido el método XHR para realizar la búsqueda de tiendas");
}

async function getFetch() {
    console.log("Haz elegido el método Fetch para realizar la búsqueda de tiendas");
}

async function getJQuery() {
    console.log("Haz elegido el método JQuery para realizar la búsqueda de tiendas");
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


cargadoPagina();