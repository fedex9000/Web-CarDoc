package com.example.backendcardoc;

import com.example.backendcardoc.Persistence.DAO.UtenteDao;
import com.example.backendcardoc.Persistence.DBManager;
import com.example.backendcardoc.Persistence.Model.Utente;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class BackEndCarDocApplication {

	public static void main(String[] args) {

		//SpringApplication.run(BackEndCarDocApplication.class, args);

		UtenteDao utenteDao =  DBManager.getInstance().getUtenteDAO();
		Utente utente = utenteDao.findByEmail("fedex46@outlook.it");
		System.out.println(utente.getCf());



	}

}
