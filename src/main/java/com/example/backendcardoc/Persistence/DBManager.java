package com.example.backendcardoc.Persistence;

import com.example.backendcardoc.Persistence.DAO.Postgres.ProdottoDaoPostgres;
import com.example.backendcardoc.Persistence.DAO.Postgres.UtenteDaoPostgres;
import com.example.backendcardoc.Persistence.DAO.ProdottoDao;
import com.example.backendcardoc.Persistence.DAO.UtenteDao;
import com.example.backendcardoc.Persistence.Model.Prodotto;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBManager {
    private static DBManager instance = null;

    public static DBManager getInstance() {
        if (instance == null) {
            instance = new DBManager();
        }
        return instance;
    }

    private DBManager() {
    }

    Connection conn = null;

    public Connection getConnection() {
        if (conn == null) {
            try {
                conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", "0905");
                System.out.println("connection");
            }
            catch (SQLException e) {
                System.out.println("errore");
            }
        }
        return conn;
    }

    public UtenteDao getUtenteDAO() {
        return new UtenteDaoPostgres(getConnection());
    }
    public ProdottoDao getProdottoDAO(){
        return new ProdottoDaoPostgres(getConnection());
    }

}
