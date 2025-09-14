document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm1");
    const formAlunos = document.querySelector("#form1");

    if (!btnSalvar || !formAlunos) return;

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        const dados = {
            pagina: "formulario1",
            motivacao: formAlunos.motivacao?.value || "",
            frequencia_treino: formAlunos.frequencia_treino?.value || "",
            horario_preferido: formAlunos.horario_preferido?.value || "",
            idade: formAlunos.idade?.value || "",
            regiao: formAlunos.regiao?.value || "",
            estado_civil: formAlunos.estado_civil?.value || "",
            pessoas_casa: formAlunos.pessoas_casa?.value || "",
            profissao: formAlunos.profissao?.value || "",
            motivacao_primeira: formAlunos.motivacao_primeira?.value || "",
            importa_academia: formAlunos.importa_academia?.value || "",
            medo: formAlunos.medo?.value || ""
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
                window.location.href = "formulario2.html";
            } else {
                alert("Erro ao enviar os dados");
            }
        } catch (err) {
            console.error("Erro ao conectar com o servidor:", err);
            alert("Não foi possível conectar com o servidor. Verifique sua conexão ou tente mais tarde.");
        }
    });
});
