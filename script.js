let requisicaoURL = "https://www.luizpicolo.com.br/api.json";

let requisicao = new XMLHttpRequest();
requisicao.open("GET", requisicaoURL);
requisicao.responseType = "json";
requisicao.send();

requisicao.onload = function() {
  let noticiasJson = requisicao.response;

  //Classe noticia 
  class Noticia {
    settitulo(titulo) {
      this.titulo = titulo;
    }
    gettitulo() {
      return this.titulo;
    }

    setdataPublicacao(dataPublicacao) {
      this.dataPublicacao = dataPublicacao;
    }
    getdataPublicacao() {
      return this.dataPublicacao;
    }

    setautor(autor) {
      this.autor = autor;
    }
    getautor() {
      return this.autor;
    }

    setresumo(resumo) {
      this.resumo = resumo;
    }
    getresumo() {
      return this.resumo;
    }

    setlink(link) {
      this.link = link;
    }
    getlink() {
      return this.link;
    }

   mostrar_Noticias() {
      if(this.titulo == undefined || this.dataPublicacao == undefined || this.autor == undefined || this.resumo == undefined ){
        throw new ErrorCustomizado("É provavel que os atributos titulo, data de publicacão, autor ou resumo estejam vazios!");
        
      }else{
      return `<div id="Ncards">                            
              <h1 id="Ntitulo">${this.titulo}<h1>                                                             
              <p>Publicado em: ${this.dataPublicacao}<p>                 
              <p>Por: ${this.autor}<p>                                   
              <h5 id="Nresumo">${this.resumo}<h5>                     
              <a href="${this.link}">(Clique aqui, para ir ao site original)<a>                               <div>`;
      }
   }
    
   Noticias(){
      try{ 
        return this.mostrar_Noticias();
      }catch(erro){
        return erro.stack;
      }
   }
  }
  

  //Classe Noticia_Destaque herdando somente os atributos da classe Noticias
  class Noticia_Destaque extends Noticia {
    setimagem(imagem) {
      this.imagem = imagem;
    }
    getimagem() {
      return this.imagem;
    }
    //Criei outro metodo porque nesse é adicionado a Imagem que é pedido somente na Noticia Destaque
   mostrar_Destaque() {
      if(this.titulo == undefined || this.dataPublicacao == undefined || this.autor == undefined || this.resumo == undefined ){
        throw new ErrorCustomizado("É provavel que os atributos titulo, data de publicacão, autor ou resumo estejam vazios!");
      }else{
      return `<div id="destaque">
              <h1 id="Ntitulo">${this.titulo}<h1>
              <img id="imagem" src=${this.imagem}>             
              <p>Publicado em: ${this.dataPublicacao}<p>                             
              <p>Por: ${this.autor}<p>                                                                                 
              <h5 id="Nresumo">${this.resumo}<h5>                                    
              <a href="${this.link}">(Clique aqui, para ir ao site original)<a>                                        
              <div>`;
      }
   }

   Destaque(){
      try{
        return this.mostrar_Destaque();
        
      }catch(erro){
        return erro.stack;

      }
   }

  }

  //Classe ErrorCustomizado hedando do Error
  class ErrorCustomizado extends Error{
    constructor(menssagem){
       super(menssagem)
         this.name = "Atributos Vazios";
    }                                                                                 
  }

  
//Pegando o ID da div no html e adicionando a tag h1 com o Titulo principal do site
  const elemento = document.getElementById("lista");
  let titulo = `<div id="head">
                <h1 id="TituloSite">Noticias De Hoje!</h1>
                <div>`;
  elemento.insertAdjacentHTML('afterbegin', titulo);

//Criando o Objeto com a classe Noticia_Destaque
//Aqui o titulo ou outros é escrito(pego) usando o articles(que seria o Array) no indice 0(para pegar a primeira noticia).
  let noticiaDestaque = new Noticia_Destaque();
  noticiaDestaque.settitulo(noticiasJson.articles[0].title);
  noticiaDestaque.setimagem(noticiasJson.articles[0].urlToImage);
  noticiaDestaque.setdataPublicacao(noticiasJson.articles[0].publishedAt);
  noticiaDestaque.setautor(noticiasJson.articles[0].author);
  noticiaDestaque.setresumo(noticiasJson.articles[0].description);
  noticiaDestaque.setlink(noticiasJson.articles[0].url);  

  elemento.insertAdjacentHTML('beforeend', noticiaDestaque.Destaque());

  
//Aqui o titulo ou outros é escrito(pego) usando o for começando no articles(que seria o Array) no indice 1(para pegar a segunda noticia em diante até a ultima).
  for (let i = 1; i < noticiasJson.articles.length; i++) {
  item = noticiasJson.articles[i];

//Criando o objeto com a classe Noticias
  let noticiaInteira = new Noticia();
  noticiaInteira.settitulo(item.title);
  noticiaInteira.setdataPublicacao(item.publishedAt);
  noticiaInteira.setautor(item.author);
  noticiaInteira.setresumo(item.description);
  noticiaInteira.setlink(item.url);

  elemento.insertAdjacentHTML('beforeend', noticiaInteira.Noticias());

  }
}

