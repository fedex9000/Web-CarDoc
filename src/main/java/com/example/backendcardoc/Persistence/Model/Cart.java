package com.example.backendcardoc.Persistence.Model;

public class Cart {
    private String cf;
    private String idProdotto;

    private String quantity;

    public Cart(String cf, String idProdotto) {
        this.cf = cf;
        this.idProdotto = idProdotto;
    }

    public String getCf() {
        return cf;
    }

    public void setCf(String cf) {
        this.cf = cf;
    }

    public String getIdProdotto() {
        return idProdotto;
    }

    public void setIdProdotto(String idProdotto){
        this.idProdotto = idProdotto;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}