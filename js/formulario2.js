document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm2");
    const formAlunos = document.querySelector("#form2");

    if (!btnSalvar || !formAlunos) return;

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        const dados = {
            pagina: "formulario2",
            maisGosta: formAlunos.maisGosta?.value,
            menosGosta: formAlunos.menosGosta?.value,
            notaAtendimento: formAlunos.notaAtendimento?.value,
            comoIngressou: formAlunos.comoIngressou?.value,
            treinouAnte: formAlunos.treinouAnte?.value,
            redesSociais: formAlunos.redesSociais?.value,
            acompanhamento: formAlunos.acompanhamento?.value,
            modalidades: formAlunos.modalidades?.value,
            localizacaoImporta: formAlunos.localizacaoImporta?.value
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
                window.location.href = "formulario3.html";
            } else {
                alert("Erro ao enviar os dados.");
            }
        } catch (err) {
            console.error("Erro ao conectar com o servidor:", err);
        }
    });
});
