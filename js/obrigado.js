let btnSalvar = document.querySelector("#btnForm1");

btnSalvar.addEventListener("click", function (event) {
    event.preventDefault();

    let formAlunos = document.querySelector("#form1");
    console.log("Fui clicado ahah")
    console.log(form1.motivacao.value);
    console.log(form1.frequencia_treino.value);
    console.log(form1.horario_preferido.value);
    console.log(form1.idade.value);

})

