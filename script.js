//Pegar informação do google sheet
const sheetId = "1556LNAQ_QYCusknoVKsOS-rKKmwh_W5kh9HPYyLXt0g";
const sheetName = encodeURIComponent("engenharia_de_software");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL)
    .then((response) => response.text())
    .then((csvText) => handleResponse(csvText));

function handleResponse(csvText) {
    console.log(csvText);
    let sheetObjects = csvToObjects(csvText);
    console.log(sheetObjects);
    calcularSituaçãoAluno(sheetObjects);
}

function csvToObjects(csv) {
    const csvRows = csv.split("\n");
    const propertyNames = csvSplit(csvRows[0]);
    let objects = [];
    for (let i = 1, max = csvRows.length; i < max; i++) {
        let thisObject = {};
        let row = csvSplit(csvRows[i]);
        for (let j = 0, max = row.length; j < max; j++) {
            thisObject[propertyNames[j]] = row[j];
        }
        objects.push(thisObject);
    }
    return objects;
}

function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
}

//Calcular
function calcularSituaçãoAluno(alunos) {
    var tabela = document.createElement("table");
    tabela.className = "table table-custom";

    var cabeçalho = tabela.createTHead();
    cabeçalho.className = "";
    var cabeçalhoLinha = cabeçalho.insertRow();
    var colunas = [
        "Nome",
        "P1",
        "P2",
        "P3",
        "Média",
        "Faltas",
        "Situação",
        "Nota para Aprovação Final",
    ];
    colunas.forEach((coluna) => {
        var th = document.createElement("th");
        th.innerHTML = coluna;
        cabeçalhoLinha.appendChild(th);
    });

    alunos.forEach((aluno) => {
        const total =
            parseInt(aluno.P1) + parseInt(aluno.P2) + parseInt(aluno.P3);
        // Calcula a média
        const media = total / 3;
        let faltas = aluno.Faltas;
        const totalAulas = 60;
        let situação = "";
        let naf;
        const nome = String(aluno.Aluno);

        if (faltas > totalAulas * 0.25) {
            situação = "Reprovado por Falta";
            naf = 0;
        } else if (media < 50) {
            situação = "Reprovado por Nota";
            naf = 0;
        } else if (media >= 70) {
            situação = "Aprovado";
            naf = 0;
        } else {
            situação = "Exame Final";
            naf = Math.ceil(100 - media);
            console.log(naf);
        }
        aluno.Aluno = nome;
        aluno.Situação = situação;
        aluno["Nota para Aprovação Final"] = naf;
        aluno.Média = media;
        aluno.Média = Math.round(aluno.Média);

        var linha = tabela.insertRow();
        colunas.forEach((coluna) => {
            var celula = linha.insertCell();
            celula.innerHTML =
                coluna === "Nome"
                    ? aluno.Aluno
                    : coluna === "Média"
                    ? aluno.Média
                    : aluno[coluna] !== undefined
                    ? aluno[coluna]
                    : "";
        });
    });
    document.body.appendChild(tabela);
}
