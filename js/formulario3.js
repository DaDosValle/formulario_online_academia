document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm3");
    const formAlunos = document.querySelector("#form33");

    if (!btnSalvar || !formAlunos) return;

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        const dados = {
            pagina: "formulario3",
            indicaria: formAlunos.indicaria?.value,
            fidelidade: formAlunos.fidelidade?.value,
            contribuicao: formAlunos.contribuicao?.value,  // Corrigido para lowercase
            medicao_mensal: formAlunos.medicao_mensal?.value,
            motivo_troca: Array.from(
                document.querySelectorAll('input[name="motivo_troca"]:checked')
            ).map(el => el.value),
            humor_academia: formAlunos.humor_academia?.value
        };

        console.log("Enviando dados do formulário 3:", dados);

        try {
            const resposta = await fetch("http://127.0.0.1:5000/enviar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                console.log("Dados enviados com sucesso!");
                window.location.href = "obrigado.html";
            } else {
                const erro = await resposta.json();
                alert("Erro ao enviar: " + (erro.erro || "Erro desconhecido"));
            }
        } catch (e) {
            console.error("Erro na requisição:", e);
            alert("Erro ao conectar com o servidor.");
        }
    });
});
