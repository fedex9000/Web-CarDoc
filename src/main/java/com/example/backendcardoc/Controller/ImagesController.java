package com.example.backendcardoc.Controller;

import com.example.backendcardoc.Persistence.Model.Immagine;
import com.example.backendcardoc.Service.ImagesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200") //utile per frontend in quanto Angular usa la porta 4200
@RequestMapping("/api/images") //tutti i metodi avranno nell'URL questa path come path principale
@RequiredArgsConstructor //crea in automatico un'istanza di ImmobileService
public class ImagesController {
    private final ImagesService i;


    @GetMapping("findByProductID/{id}")
    public ResponseEntity<Immagine> findByProductID(@PathVariable String id) {
        return i.getById_prodotto(id);
    }

    @GetMapping("findImageByCategory/{category}")
    public ResponseEntity<Immagine> findImageByCategory(@PathVariable String id) {
        return i.getById_prodotto(id);
    }
}
