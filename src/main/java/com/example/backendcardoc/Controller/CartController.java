package com.example.backendcardoc.Controller;
import com.example.backendcardoc.Persistence.Model.Cart;
import com.example.backendcardoc.Persistence.Model.Prodotto;
import com.example.backendcardoc.Persistence.Model.Utente;
import com.example.backendcardoc.Service.CartService;
import com.example.backendcardoc.Service.ImagesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService i;

    @GetMapping("findByCf/{cf}")
    public ResponseEntity<List<Prodotto>> getCartProduct(@PathVariable String cf) {return i.getByCf(cf);}

    @DeleteMapping("/{cf}/{id_prodotto}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> removeItem(@PathVariable String cf, @PathVariable String id_prodotto) {
        System.out.println(cf + " " + id_prodotto);
        return i.removewithid_prodotto(cf, id_prodotto);
    }

}