/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
let dadosUsuario;
import produtosPage from '../support/page_objects/produtos.page'


describe('Funcionalidade: Efetuar compra no site ebac', () => {

    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosUsuario = perfil
        })
    });

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    it('Deve fazer login no site ebac, selecionar 4 productos e fazer o checkout finalizando a compra', () => {
        // login no site ebac
        cy.login(dadosUsuario.login, dadosUsuario.password)
        cy.get('.page-title').should('contain', 'Minha conta')


        // Adicionar produtos ao carrinho
        cy.get('#primary-menu > .menu-item-629 > a').click();
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[0].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dados[0].tamanho,
                dados[0].cor,
                dados[1].quantidade
            );

            produtosPage.buscarProduto(dados[1].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dados[1].tamanho,
                dados[1].cor,
                dados[1].quantidade
            );

            produtosPage.buscarProduto(dados[2].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dados[2].tamanho,
                dados[2].cor,
                dados[1].quantidade
            );

            produtosPage.buscarProduto(dados[3].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dados[3].tamanho,
                dados[3].cor,
                dados[1].quantidade
            );
        });

        // Checkout
        cy.get('.woocommerce-message > .button').click();
        cy.get('.checkout-button').click();
        cy.get('#billing_first_name').clear().type(dadosUsuario.name);
        cy.get('#billing_last_name').clear().type(dadosUsuario.lastName);
        cy.get('#billing_address_1').clear().type(dadosUsuario.address);
        cy.get('#billing_city').clear().type(dadosUsuario.city);
        cy.get('#billing_postcode').clear().type(dadosUsuario.postCode);
        cy.get('#billing_phone').clear().type(dadosUsuario.phone);
        cy.get('#billing_email').clear().type(dadosUsuario.email);
        cy.get('#terms').check();
        cy.get('#place_order').click();
        cy.get('.page-title').should('contain', 'Pedido recebido')

    });
}); 