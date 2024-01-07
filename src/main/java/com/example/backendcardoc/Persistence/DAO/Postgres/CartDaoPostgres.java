package com.example.backendcardoc.Persistence.DAO.Postgres;

import com.example.backendcardoc.Persistence.DAO.CartDao;
import com.example.backendcardoc.Persistence.Model.Cart;
import com.example.backendcardoc.Persistence.Model.Prodotto;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class CartDaoPostgres implements CartDao {
    Connection connection;

    public CartDaoPostgres(Connection connection) { this.connection = connection; }

    public Prodotto createNewProduct(ResultSet rs) throws SQLException {
        Prodotto p = new Prodotto();
        p.setId(rs.getString("id"));
        p.setNome(rs.getString("nome"));
        p.setVenditore(rs.getString("venditore"));
        p.setDescrizione(rs.getString("descrizione"));
        p.setCategoria(rs.getString("categoria"));
        p.setPrezzo(rs.getDouble("prezzo"));
        p.setNumeroVenduti(rs.getInt("numeroVenduti"));
        return p;
    }
    @Override
    public List<Prodotto> findByCf(String cf) {
        List<Prodotto> products = new ArrayList<>();
        String query = "select * from carrello where cf=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1,cf);
            ResultSet rs = st.executeQuery();
            while(rs.next()) {
                Prodotto p = findByPrimaryKey(rs.getString("id_prodotto"));
                products.add(p);
            }
            return products;
        }
        catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return null;
    }

    public Prodotto findByPrimaryKey(String id) {
        String query = "select * from prodotti where id=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, id);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                return createNewProduct(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }



}