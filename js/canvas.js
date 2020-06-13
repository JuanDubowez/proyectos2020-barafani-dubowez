// Accedemos a componentes html desde el archivo JS
var createMatrixModalBody = document.getElementById("matrix-modal-body");
var createMatrixForm = document.getElementById("createMatrixForm");

var rowTextField = document.getElementById("rowTextField");
var columnTextField = document.getElementById("columnTextField");
var rowGroupDiv = document.getElementById("rowFormGroup");
var columnGroupDiv = document.getElementById("columnFormGroup");

if (document.getElementById("canvas1") != null) {
    var canvas1 = document.getElementById("canvas1");
    var canvas2 = document.getElementById("canvas2");
    var c = canvas1.getContext("2d");
    var c2 = canvas2.getContext("2d");
}
var rowValue;
var columnValue;
var matrix = [];
var initialMatrix = [];
var storedMatrix = [];

// Funcion para obtener las filas y columnas de una matriz

function getMatrixValues() {
    c.clearRect(0, 0, canvas1.width, canvas1.height);
    c2.clearRect(0, 0, canvas2.width, canvas2.height);
    rowValue = rowTextField.value;
    columnValue = columnTextField.value;
    if (formIsValid()) {
        createMatrixInputs(rowValue, columnValue)
        $('#createMatrixModal').modal('show');
        rowTextField.value = "";
        columnTextField.value = "";
        rowTextField.setAttribute('class', 'form-control')
        columnTextField.setAttribute('class', 'form-control')
    }
    else {
        createFormErrorLabels()
    }
}

// Funcion para validar los inputs

function formIsValid() {
    if ((rowValue != 2 && rowValue !=3 && rowValue !=4) || (columnValue != 2 && columnValue != 3 && columnValue != 4)) {
        return false
    }
    return true
}

// Funcion para crear mensajes de error en los textfields

function createFormErrorLabels() {
    if (rowValue != 2 && rowValue != 3 && rowValue != 4) {
        rowTextField.setAttribute('class', 'form-control is-invalid')
        rowTextField.value = "";
    }
    if (columnValue != 2 && columnValue != 3 && columnValue != 4) {
        columnTextField.setAttribute('class', 'form-control is-invalid')
        columnTextField.value = "";
    }
}

// Funcion para crear los inputs segun la cantidad de filas y columnas de la matriz

function createMatrixInputs(row, column) {
    for (var i = 0; i < row; i++) {
        var matrixRow = document.createElement('div');
        matrixRow.classList = 'row m-2 justify-content-center'
        matrixRow.setAttribute('id', 'matrixRow' + (i + 1));
        createMatrixModalBody.appendChild(matrixRow);
        for (var j = 0; j < column; j++) {
            var matrixInput = document.createElement('input');
            matrixInput.setAttribute('id', 'input-' + (i + 1) + '_' + (j + 1));
            var matrix = document.getElementById('matrixRow' + (i + 1));
            matrix.appendChild(matrixInput);
        }
    }
}

// Funcion para obtener los valores de los inputs 
function obtainInputValues() {
    if (initialMatrix.length > 0 || matrix.length > 0) {
        initialMatrix = [];
        matrix = [];
    }
    for (var i = 0; i < rowValue; i++) {
        var row = [];
        var row2 = [];
        for (var j = 0; j < columnValue; j++) {
            row.push(document.getElementById('input-' + (i + 1) + '_' + (j + 1)).value);
            row2.push(document.getElementById('input-' + (i + 1) + '_' + (j + 1)).value);
        }
        initialMatrix.push(row);
        matrix.push(row2);
    }
    drawMatrix(initialMatrix, c);
    reduceMatrix(matrix);

    // Borrar los datos de columna y fila para crear una nueva matriz
    createMatrixModalBody.innerHTML = "";
    /// No deja apretar el boton de guardar matriz si no hay una creada
    document.getElementById("btnsave").removeAttribute("disabled");
    document.getElementById("btnsave").style.cursor="pointer";
}

// Funcion para borrar los componentes del modal creado

function deleteMatrixInputs() {
    createMatrixModalBody.innerHTML = "";
}

// Funcion para dibujar la matriz en el canvas

function drawMatrix(matrix, context) {
    for (var i = 0; i < (matrix.length); i++) {
        for (var j = 0; j < (matrix[i].length); j++) {
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.fillText(matrix[i][j], (150)/matrix.length + (j * 100), 50-(matrix[i].length)*2 + (30 * i));
        }
    }
}

// Funcion para calcular la matriz reducida por filas

function reduceMatrix(matrix) {
    var lead = 0;
    for (var r = 0; r < rowValue; r++) {
        if (columnValue <= lead) {
            return;
        }
        var i = r;
        while (matrix[i][lead] == 0) {
            i++;
            if (rowValue == i) {
                i = r;
                lead++;
                if (columnValue == lead) {
                    return;
                }
            }
        }

        var tmp = matrix[i];
        matrix[i] = matrix[r];
        matrix[r] = tmp;

        var val = matrix[r][lead];
        for (var j = 0; j < columnValue; j++) {
            matrix[r][j] /= val;
        }

        for (var i = 0; i < rowValue; i++) {
            if (i == r) continue;
            val = matrix[i][lead];
            for (var j = 0; j < columnValue; j++) {
                matrix[i][j] -= val * matrix[r][j];
            }
        }
        lead++;
    }
    console.log(matrix)
    drawMatrix(matrix, c2);
}

// Funcion para almacenar en Local Storage las matrices y sus reducidas

function storeMatrix() {
    if (localStorage.getItem("matrix") != null){
        tmpMatrix = JSON.parse(localStorage.getItem("matrix"));
    }else{
    var tmpMatrix = [];
    }

    tmpMatrix.push(initialMatrix);

    tmpMatrix.push(matrix);

    localStorage.setItem("matrix", JSON.stringify(tmpMatrix));
    
    //No permitir que se vuelva a guardar la matriz 
    document.getElementById("btnsave").toggleAttribute("disabled")
    document.getElementById("btnsave").style.cursor="not-allowed";
}

// Funcion para obtener las matrices almacenadas en Local Storage

function getStoredMatrix() {
    var items = JSON.parse(localStorage.getItem("matrix"));
    var storedMatrixRow = document.getElementById("stored-matrix-row");
    
    for (i = 0; i < items.length; i++) {
        var matrixCanvas = document.createElement('canvas');
        
        matrixCanvas.setAttribute('id', 'storedCanvas-' + (i + 1));
        matrixCanvas.style.margin = '10px';
        var ctx = matrixCanvas.getContext('2d');
        ctx.font = "30px Arial";
        drawMatrix(items[i], ctx);
        if (i%2==0){
            var opDiv = document.createElement('div');
            opDiv.classList = 'row';
            opDiv.setAttribute('id','canvasRow-' + (i));
            var opTxt = document.createElement('h5');
            opTxt.style.color = 'white';
            opTxt.innerHTML = 'Operación '+((i+2)/2)+':';
            storedMatrixRow.appendChild(opDiv);
            opDiv.appendChild(opTxt);
        }
        if (i % 2 !=0) {
            var arrowTxt = document.createElement('h1');
            arrowTxt.style.marginTop = '57px';
            arrowTxt.innerHTML = '→';
            storedMatrixRow.appendChild(arrowTxt);
        }
        storedMatrixRow.appendChild(matrixCanvas);
    }
}