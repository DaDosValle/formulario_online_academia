document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm2");
    const formAlunos = document.querySelector("#form2");

    if (!btnSalvar || !formAlunos) return;

    // Determina a URL do servidor de acordo com o ambiente
    const BASE_URL = "https://formulario-online-academia.onrender.com"; // <--- substitua pela sua URL do Render

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        // Monta o objeto de dados dinamicamente
        const dados = {};
        dados.pagina = formAlunos.dataset.pagina || "formulario2";

        // Adiciona todos os campos do formulário automaticamente
        Array.from(formAlunos.elements).forEach(el => {
            if (el.name) {
                if (el.type === "checkbox") {
                    dados[el.name] = el.checked;
                } else if (el.type === "radio") {
                    if (el.checked) dados[el.name] = el.value;
                } else {
                    dados[el.name] = el.value || "";
                }
            }
        });

        console.log("Fui clicado!");
        console.log(dados);

        try {
            const resposta = await fetch(`${BASE_URL}/enviar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                const proximaPagina = formAlunos.dataset.next || "formulario3.html";
                window.location.href = proximaPagina;
            } else {
                alert("Erro ao enviar os dados.");
            }
        } catch (err) {
            console.error("Erro ao conectar com o servidor:", err);
            alert("Não foi possível conectar com o servidor. Verifique sua conexão ou tente mais tarde.");
        }
    });
});
