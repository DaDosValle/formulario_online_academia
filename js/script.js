async function enviarFormularioFinal() {
    const BASE_URL = "https://formulario-online-academia.onrender.com";
    const dadosParaEnviar = JSON.parse(localStorage.getItem("formulario_dados")) || {};

    try {
        const resposta = await fetch(`${BASE_URL}/enviar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosParaEnviar)
        });

        if (resposta.ok) {
            alert("Formulário enviado com sucesso!");
            localStorage.removeItem("formulario_dados"); // limpa o storage
            window.location.href = "pagina_final.html"; // redireciona para página de sucesso
        } else {
            alert("Erro ao enviar dados.");
        }
    } catch (err) {
        console.error("Erro ao conectar com o servidor:", err);
        alert("Não foi possível conectar com o servidor. Verifique sua conexão ou tente mais tarde.");
    }
}
