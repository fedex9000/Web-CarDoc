package com.example.backendcardoc.Service;

import com.example.backendcardoc.Persistence.DBManager;
import com.example.backendcardoc.Persistence.Model.DettagliOrdine;
import com.example.backendcardoc.Persistence.Model.Ordine;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdineService {

    public ResponseEntity<List<Ordine>> getOrderById(String cf) {
        List<Ordine> ordini = DBManager.getInstance().getOrderDao().getOrderById(cf);
        if (ordini == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(ordini);
    }

    public ResponseEntity<List<DettagliOrdine>> getDetailOrderByNumber(DettagliOrdine dettagliOrdine) {
        List<DettagliOrdine> dettagliOrdines = DBManager.getInstance().getOrderDao().getDetailOrderByNumber(dettagliOrdine);
        if (dettagliOrdines == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dettagliOrdines);
    }
}