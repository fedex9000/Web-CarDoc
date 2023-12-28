package com.example.backendcardoc.Persistence.DAO;

import com.example.backendcardoc.Persistence.Model.Prodotto;

import java.util.List;

public interface ProdottoDao {
    List<Prodotto> findAll(); //restituisce una lista di tutti i prodotti

    Prodotto findByPrimaryKey(String id); //restituisce un prodotto dato id
}
