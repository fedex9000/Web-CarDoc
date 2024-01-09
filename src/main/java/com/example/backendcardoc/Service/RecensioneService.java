package com.example.backendcardoc.Service;

import com.example.backendcardoc.Persistence.DBManager;
import com.example.backendcardoc.Persistence.Model.Recensione;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RecensioneService {
    public void saveOrUpdateRecensione(Recensione recensione){
        DBManager.getInstance().getRecensioneDAO().saveOrUpdate(recensione);
    }

    public ResponseEntity<Recensione> getByID(int id){
        Recensione recensione = DBManager.getInstance().getRecensioneDAO().findByPrimaryKey(id);
        if(recensione == null)
            return ResponseEntity.notFound().build(); //se non esiste restituisce il '404:file not found'
        return ResponseEntity.ok(recensione); //genera un entità di risposta positiva
    }

    public ResponseEntity<List<Recensione>> getByProductID(String id) {
        List<Recensione> recensioni = DBManager.getInstance().getRecensioneDAO().findByProduct(id);
        if(recensioni == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(recensioni);
    }

    public ResponseEntity<Object> deleteByID(Integer id){
        Recensione recensione = DBManager.getInstance().getRecensioneDAO().findByPrimaryKey(id);
        if (recensione == null)
            return ResponseEntity.notFound().build();
        DBManager.getInstance().getRecensioneDAO().delete(recensione);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Recensione> updateRecensione(int id, Recensione recensione){
        Recensione recensione1 = DBManager.getInstance().getRecensioneDAO().findByPrimaryKey(id);
        if(recensione == null)
            return ResponseEntity.notFound().build();
        else {
            recensione1.setContenuto(recensione.getContenuto());
            recensione1.setRating(recensione.getRating());
            recensione1.setUtente(recensione.getUtente());
            recensione1.setProdotto(recensione.getProdotto());
            if (DBManager.getInstance().getRecensioneDAO().saveOrUpdate(recensione1))
                return ResponseEntity.ok(recensione1);
            else return ResponseEntity.internalServerError().build();
        }
    }
}
