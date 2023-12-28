package com.example.backendcardoc.Persistence;

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
                conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", "1234");
            }
            catch (SQLException e) {

            }
        }
        return conn;
    }

}
