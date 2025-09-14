document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm1");
    const formAlunos = document.querySelector("#form1");

    if (!btnSalvar || !formAlunos) return;

    // Determina a URL do servidor de acordo com o ambiente
    const BASE_URL = "https://formulario-online-academia.onrender.com"; // <--- substitua pela sua URL do Render

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        // Monta o objeto de dados dinamicamente
        const dados = {};
        dados.pagina = formAlunos.dataset.pagina || "formulario4";

        Array.from(formAlunos.elements).forEach(el => {
            if (el.name) {
                if (el.type === "checkbox") {
                    if (!dados[el.name]) dados[el.name] = [];
                    if (el.checked) dados[el.name].push(el.value);
                } else if (el.type === "radio") {
                    if (el.checked) dados[el.name] = el.value;
                } else {
                    dados[el.name] = el.value || "";
                }
            }
        });

        console.log("Fui clicado ahah");
        console.log(dados);

        try {
            const resposta = await fetch(`${BASE_URL}/enviar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                console.log("Dados enviados com sucesso!");
                const proximaPagina = formAlunos.dataset.next || "obrigado.html";
                window.location.href = proximaPagina;
            } else {
                const erro = await resposta.json().catch(() => ({}));
                alert("Erro ao enviar: " + (erro.erro || "Erro desconhecido"));
            }
        } catch (err) {
            console.error("Erro ao conectar com o servidor:", err);
            alert("Não foi possível conectar com o servidor. Tente novamente mais tarde.");
        }
    });
});
