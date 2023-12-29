package com.example.backendcardoc;

import com.example.backendcardoc.Persistence.DAO.UtenteDao;
import com.example.backendcardoc.Persistence.DBManager;
import com.example.backendcardoc.Persistence.Model.Utente;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@ServletComponentScan
public class BackEndCarDocApplication {

	public static void main(String[] args) {

		SpringApplication.run(BackEndCarDocApplication.class, args);
	}

}
