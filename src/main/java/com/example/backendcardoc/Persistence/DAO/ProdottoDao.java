package com.example.backendcardoc.Persistence.DAO;

import com.example.backendcardoc.Persistence.Model.Prodotto;
import com.example.backendcardoc.Persistence.Model.Recensione;

import java.util.List;

public interface ProdottoDao {
    List<Prodotto> findAll(); //restituisce una lista di tutti i prodotti

    Prodotto findByPrimaryKey(String id); //restituisce un prodotto dato id

    List<Prodotto> findCategoryProduct(String category);

    List<Prodotto> findSearchedProduct(String searchedWord);

    boolean saveOrUpdate(Prodotto prodotto); //salva se non esiste o aggiorna se esiste

}
