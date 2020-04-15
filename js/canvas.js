// Accedemos a componentes html desde el archivo JS
var createMatrixModalBody = document.getElementById("matrix-modal-body");
var canvas1 = document.getElementById("canvas1");
var c = canvas1.getContext("2d");

var rowValue;
var columnValue;


// Funcion para obtener las filas y columnas de una matriz

function getMatrixValues(){
    rowValue = document.getElementById("rowTextField").value;
    columnValue = document.getElementById("columnTextField").value;
    createMatrixInputs(rowValue,columnValue);
}

// Funcion para crear los inputs segun la cantidad de filas y columnas de la matriz

function createMatrixInputs(row,column){
    for (var i = 0; i< row; i++){
            var matrixRow = document.createElement('div');
            matrixRow.classList = 'row m-2 justify-content-center'
            matrixRow.setAttribute('id','matrixRow'+(i+1))
            createMatrixModalBody.appendChild(matrixRow);
        for (var j = 0; j<column; j++) {
            var matrixInput = document.createElement('input');
            var matrix = document.getElementById('matrixRow'+(i+1));
            matrix.appendChild(matrixInput);
        }
    }
}

// Funcion para borrar los componentes del modal creado

function deleteMatrixInputs(){
    createMatrixModalBody.innerHTML = "";
}

// Creamos la matriz en el canvas
c.fillStyle = "#FF0000";
c.fillRect(0, 0, 20, 25);
c.font = "30px Arial";
c.fillText("1", 10, 50);


// Funcion para dibujar la matriz en el canvas

function drawMatrix(){
    console.log(rowValue);
    for (var i=0; i<rowValue;i++){
        for (var j=0;j<columnValue;j++){
            c.font = "30px Arial";
            c.fillText('1',10+(j*20), 50+(j*20))
        }
    }
}