document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm1");
    const formAlunos = document.querySelector("#form1");

    if (!btnSalvar || !formAlunos) return;

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        const dados = {
            pagina: "formulario1",
            motivacao: formAlunos.motivacao?.value,
            frequencia_treino: formAlunos.frequencia_treino?.value,
            horario_preferido: formAlunos.horario_preferido?.value,
            idade: formAlunos.idade?.value,
            regiao: formAlunos.regiao?.value,
            estado_civil: formAlunos.estado_civil?.value,
            pessoas_casa: formAlunos.pessoas_casa?.value,
            profissao: formAlunos.profissao?.value,
            motivacao_primeira: formAlunos.motivacao_primeira?.value,
            importa_academia: formAlunos.importa_academia?.value,
            medo: formAlunos.medo?.value
        };

        console.log("Fui clicado!");
        console.log(dados);

        try {
            const resposta = await fetch("http://127.0.0.1:5000/enviar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                window.location.href = "formulario2.html";
            } else {
                alert("Erro ao enviar os dados");
            }
        } catch (err) {
            console.error("Erro ao conectar com o servidor:", err);
        }
    });
});
