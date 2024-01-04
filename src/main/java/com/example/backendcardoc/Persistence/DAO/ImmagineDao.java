package com.example.backendcardoc.Persistence.DAO;

import com.example.backendcardoc.Persistence.Model.Immagine;

import java.util.List;

public interface ImmagineDao {
    List<Immagine> findAll();

    Immagine findByPrimaryKey(Integer id);
    Immagine findById_prodotto(String id_prodotto);
}