document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm2");
    const formAlunos = document.querySelector("#form2");

    if (!btnSalvar || !formAlunos) return;

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        const dados = {
            pagina: "formulario2",
            maisGosta: formAlunos.maisGosta?.value || "",
            menosGosta: formAlunos.menosGosta?.value || "",
            notaAtendimento: formAlunos.notaAtendimento?.value || "",
            comoIngressou: formAlunos.comoIngressou?.value || "",
            treinouAnte: formAlunos.treinouAnte?.value || "",
            redesSociais: formAlunos.redesSociais?.value || "",
            acompanhamento: formAlunos.acompanhamento?.value || "",
            modalidades: formAlunos.modalidades?.value || "",
            localizacaoImporta: formAlunos.localizacaoImporta?.value || ""
        };

        console.log("Fui clicado!");
        console.log(dados);

        // Detecta se está rodando local ou online
        const BASE_URL = window.location.hostname.includes("localhost")
            ? "http://127.0.0.1:5000"
            : "https://SEU_APP_RENDER.onrender.com"; // <--- substitua pela sua URL do Render

        try {
            const resposta = await fetch(`${BASE_URL}/enviar`, {
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
            alert("Não foi possível conectar com o servidor. Verifique sua conexão ou tente mais tarde.");
        }
    });
});
