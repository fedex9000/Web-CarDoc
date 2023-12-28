package com.example.backendcardoc.Persistence.Model;

public class Utente {
    private String cf, nome, cognome, email, tipologia, password;
    private Long telefono;
    public Utente(String cf, String nome, String cognome, String email, Long telefono, String tipologia, String password) {
        this.cf = cf;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.telefono = telefono;
        this.tipologia = tipologia;
        this.password = password;
    }

    public Utente() {
    }

    public String getCf() {
        return cf;
    }

    public void setId(String cf) {
        this.cf = cf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getTelefono() {
        return telefono;
    }

    public void setTelefono(Long telefono) {
        this.telefono = telefono;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
