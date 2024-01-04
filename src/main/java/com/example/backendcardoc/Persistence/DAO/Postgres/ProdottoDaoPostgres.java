package com.example.backendcardoc.Persistence.DAO.Postgres;

import com.example.backendcardoc.Persistence.DAO.ProdottoDao;
import com.example.backendcardoc.Persistence.Model.Prodotto;
import com.example.backendcardoc.Persistence.Model.Utente;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProdottoDaoPostgres implements ProdottoDao {

    Connection connection;

    public ProdottoDaoPostgres(Connection connection) { this.connection = connection; }

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
    public List<Prodotto> findAll() {
        ArrayList<Prodotto> prodotti = new ArrayList<>();
        String query = "select * from prodotti";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            while(rs.next()) { prodotti.add(createNewProduct(rs)); }
            return prodotti;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
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

    @Override
    public List<Prodotto> findCategoryProduct(String category) {
        ArrayList<Prodotto> prodotti = new ArrayList<>();
        String query = "select * from prodotti where categoria=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1,category);
            ResultSet rs = st.executeQuery();
            while(rs.next()) { prodotti.add(createNewProduct(rs)); }
            return prodotti;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Prodotto> findSearchedProduct(String searchedWord) {
        ArrayList<Prodotto> prodotti = new ArrayList<>();
        String query = "select * from prodotti where lower(nome) like lower(?) or lower(venditore) like lower(?) or lower(descrizione) like lower(?) or lower(categoria) like lower(?)";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, "%" + searchedWord.toLowerCase() + "%");
            st.setString(2, "%" + searchedWord.toLowerCase() + "%");
            st.setString(3, "%" + searchedWord.toLowerCase() + "%");
            st.setString(4, "%" + searchedWord.toLowerCase() + "%");

            ResultSet rs = st.executeQuery();
            while(rs.next()) { prodotti.add(createNewProduct(rs)); }
            return prodotti;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }


}
