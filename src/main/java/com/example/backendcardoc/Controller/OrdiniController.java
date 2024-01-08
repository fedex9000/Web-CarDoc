package com.example.backendcardoc.Controller;

import com.example.backendcardoc.Persistence.Model.DettagliOrdine;
import com.example.backendcardoc.Persistence.Model.Ordine;
import com.example.backendcardoc.Service.OrdineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200") //utile per frontend in quanto Angular usa la porta 4200
@RequestMapping("/api/ordini") //tutti i metodi avranno nell'URL questa path come path principale
@RequiredArgsConstructor
public class OrdiniController {
    private final OrdineService o;
    @GetMapping("/getOrderById/{cf}")
    public ResponseEntity<List<Ordine>> getOrderById(@PathVariable String cf){
        System.out.println("dio" + cf);
        return o.getOrderById(cf);

    }

    @PostMapping("getDetailOrderByNumber")
    public ResponseEntity<List<DettagliOrdine>> getDetailOrderByNumber(@RequestBody DettagliOrdine dettagliOrdine) {
        System.out.println();
        return o.getDetailOrderByNumber(dettagliOrdine);
    }
}
