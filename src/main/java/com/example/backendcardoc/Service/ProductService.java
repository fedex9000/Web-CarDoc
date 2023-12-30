package com.example.backendcardoc.Service;

import com.example.backendcardoc.Persistence.DBManager;
import com.example.backendcardoc.Persistence.Model.Prodotto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductService {

    public ResponseEntity<List<Prodotto>> getAllEntries() {
        List<Prodotto> prodotti = DBManager.getInstance().getProdottoDAO().findAll();
        if(prodotti == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(prodotti);
    }
}
