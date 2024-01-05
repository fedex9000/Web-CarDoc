package com.example.backendcardoc.Persistence.DAO;

import com.example.backendcardoc.Persistence.Model.Recensione;

import java.util.List;

public interface RecensioneDao {
    //List<Recensione> findAll(); //restituisce una lista di tutti gli annunci

    Recensione findByPrimaryKey(int id); //restituisce un annuncio data la chiave primaria

    List<Recensione> findByProduct(String idProdotto); // Restituisce tutte le recensioni dato l'ID dell'immobile

    boolean saveOrUpdate(Recensione recensione); //salva se non esiste o aggiorna se esiste

    void delete(Recensione recensione);//cancella un immobile

}
