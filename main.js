const vm = new Vue({
  el: "#app",
  data: {
    nomeDoProduto: "Potenciador Africano", // é exibido no perfil
    linkDaPagina: "https://anerosafq.github.io/pv-ton-afrc/", //página de destino após o quiz
    perguntas: [
      //sempre a primeira pergunta deve vir com o ativo: true e as demais false
      {
        texto: "¿Usted es hombre o mujer?",
        respostas: ["Hombre", "Mujer"], //cada nova resposta fica separada por vírgula e entre aspas
        imagem: "",
        ativo: true,
      },
      {
        texto: "¿Tienes más de 25 años?",
        respostas: ["Sí", "No"],
        imagem: "",
        ativo: false,
      },
    ],

    //variáveis de controle --- NUNCA MEXER
    atual: 0,
    loader: false,
    mostrarPerguntas: true,
    porcentagemQueFalta: null,
    porcentagemConsumida: null,
  },
  created() {
    this.porcentagem();
  },
  methods: {
    responder(pergunta, index) {
      pergunta.ativo = !pergunta.ativo;

      if (index < this.perguntas.length - 1) {
        this.perguntas[index + 1].ativo = true;
        this.atual++;
        this.porcentagem();
        this.perguntas[index].ativo = false;
      } else {
        this.porcentagemConsumida = 100;
        this.porcentagemQueFalta = 0;
        this.mostrarPerguntas = false;
        this.loader = true;
        setTimeout(() => {
          window.location.href = this.linkDaPagina;
        }, 500);
      }
    },
    porcentagem() {
      const x = this.atual;
      const y = this.perguntas.length;

      this.porcentagemConsumida = (x / y) * 100;
      this.porcentagemQueFalta = 100 - this.porcentagemConsumida;
    },
  },
});
