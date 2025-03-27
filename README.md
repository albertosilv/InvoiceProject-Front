# 📄 InvoiceProject - Sistema de Gerenciamento de Notas Fiscais

![GitHub repo size](https://img.shields.io/github/repo-size/albertosilv/InvoiceProject-front)
![GitHub](https://img.shields.io/github/license/albertosilv/InvoiceProject-front)

O InvoiceProject é uma aplicação web moderna para gerenciamento de notas fiscais, desenvolvida com Angular e PrimeNG no frontend, integrando-se com um backend Java Spring Boot.

## ✨ Funcionalidades Principais

- ✅ Cadastro e gestão de notas fiscais
- ✅ Cadastro e gestão de Produtos
- ✅ Cadastro e gestão de Fornecedores 
- ✅ Adição/edição/remoção de itens de nota fiscal
- ✅ Visualização detalhada com cálculo automático de totais
- ✅ Interface intuitiva com PrimeNG
- ✅ Integração com backend RESTful em Java com Quarkus

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - Angular 19
  - PrimeNG
  - TypeScript
  - RxJS
  - HTML5/CSS3

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 23
- npm 10.9.0
- Angular CLI 19
- Backend InvoiceProject em execução (disponível em [repositório do backend](https://github.com/albertosilv/InvoiceProject-back))

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/albertosilv/InvoiceProject-Front.git
   cd InvoiceProject-Front
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o ambiente**
   - Crie um arquivo `src/environments/environment.ts` baseado no `environment.example.ts`
   - Configure a URL do seu backend:
     ```typescript
     export const environment = {
       production: false,
       apiUrl: 'http://localhost:8080/api' // URL do seu backend
     };
     ```

4. **Execute a aplicação**
   ```bash
   ng serve
   # ou
   npm start
   ```

5. **Acesse no navegador**
   ```
   http://localhost:4200
   ```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── module/            # Paginas do sistema
         ├── invoice/      # Modulo de nota fiscal
         ├── product/      # Modulo de produto
         ├── supplier/     # Modulo de fornecedores
    └── core/              # Utilitários compartilhados
         ├── interceptors/ # Interceptor de error
         ├── services/     #  Serviços de requisições
         ├── model/        # Modelos de dados
└── environments/          # Configurações de ambiente
```

## 📦 Scripts Úteis

| Comando               | Descrição                            |
|-----------------------|--------------------------------------|
| `npm start`           | Inicia o servidor de desenvolvimento |
| `npm run build`       | Gera versão de produção              |


## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ✉️ Contato

Albert Silva - [GitHub](https://github.com/albertosilv) - albertosilv@email.com

---

**Nota**: Certifique-se de ter o backend em execução antes de iniciar o frontend para que todas as funcionalidades estejam disponíveis.
