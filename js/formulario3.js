document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm3");
    const formAlunos = document.querySelector("#form33");

    if (!btnSalvar || !formAlunos) return;

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        const dados = {
            pagina: "formulario3",
            indicaria: formAlunos.indicaria?.value || "",
            fidelidade: formAlunos.fidelidade?.value || "",
            contribuicao: formAlunos.contribuicao?.value || "",
            medicao_mensal: formAlunos.medicao_mensal?.value || "",
            motivo_troca: Array.from(
                document.querySelectorAll('input[name="motivo_troca"]:checked')
            ).map(el => el.value),
            humor_academia: formAlunos.humor_academia?.value || ""
        };

        console.log("Enviando dados do formulário 3:", dados);

        // Detecta se está rodando local ou online
        const BASE_URL = window.location.hostname.includes("localhost")
            ? "http://127.0.0.1:5000"
            : "https://SEU_APP_RENDER.onrender.com"; // <--- substitua pela sua URL do Render

        try {
            const resposta = await fetch(`${BASE_URL}/enviar`, {
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
