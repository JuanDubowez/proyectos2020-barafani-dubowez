// Accedemos a componentes html desde el archivo JS
var createMatrixModalBody = document.getElementById("matrix-modal-body");
// Creamos la matriz en el canvas

var canvas1 = document.getElementById("canvas1");
var c = canvas1.getContext("2d");
c.fillStyle = "#FF0000";
c.fillRect(0, 0, 20, 25);
c.font = "30px Arial";
c.fillText("1", 10, 50);

for (var i=0;i<5;i++){
    c.fillText("1",10+(i*20),50);
}

// Funcion para obtener las filas y columnas de una matriz

function getMatrixValues(){
    var rowValue = document.getElementById("rowTextField").value;
    var columnValue = document.getElementById("columnTextField").value;
    createMatrixInputs(rowValue,columnValue);
}

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