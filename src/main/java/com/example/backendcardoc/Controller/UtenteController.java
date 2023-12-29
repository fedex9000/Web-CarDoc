package com.example.backendcardoc.Controller;

import com.example.backendcardoc.Persistence.Model.Utente;
import com.example.backendcardoc.Service.UtenteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
@RestController
@CrossOrigin("http://localhost:4200") // Porta di angular
@RequestMapping("/api/utenti")
@RequiredArgsConstructor // Crea in automatico un'istanza di UtenteService
public class UtenteController {

}
