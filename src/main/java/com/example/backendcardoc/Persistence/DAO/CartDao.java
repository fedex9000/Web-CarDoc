package com.example.backendcardoc.Persistence.DAO;

import com.example.backendcardoc.Persistence.Model.Cart;
import com.example.backendcardoc.Persistence.Model.Prodotto;

import java.util.ArrayList;
import java.util.List;

public interface CartDao {
    List<Prodotto> findByCf(String cf);

    void removewithid_prodotto(String cf, String id_prodotto);

    void removeAll(String cf);
}