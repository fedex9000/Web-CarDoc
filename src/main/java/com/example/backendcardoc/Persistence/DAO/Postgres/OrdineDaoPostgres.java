package com.example.backendcardoc.Persistence.DAO.Postgres;

import com.example.backendcardoc.Persistence.DAO.OrdineDao;
import com.example.backendcardoc.Persistence.Model.DettagliOrdine;
import com.example.backendcardoc.Persistence.Model.Ordine;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrdineDaoPostgres implements OrdineDao {
    Connection connection;

    public OrdineDaoPostgres(Connection connection) { this.connection = connection; }

    public Ordine createNewOrdine(ResultSet rs) throws SQLException {
        Ordine o = new Ordine();
        o.setNumeroOrdine(rs.getInt("numero_ordine"));
        o.setNumeroVenduti(rs.getInt("numero_venduti"));
        o.setPrezzoTotale(rs.getDouble("prezzo_totale"));
        o.setCf(rs.getString("cf"));
        return o;
    }

    public DettagliOrdine createNewDetailOrder(ResultSet rs) throws SQLException {
        DettagliOrdine d = new DettagliOrdine();
        d.setNumeroOrdine(rs.getInt("numero_ordine"));
        d.setCf(rs.getString("cf"));
        d.setIdProdotto(rs.getString("id_prodotto"));
        d.setQuantita(rs.getInt("quantita"));
        d.setPrezzo(rs.getDouble("prezzo"));
        return d;

    }

    @Override
    public List<Ordine> getOrderById(String cf) {
        ArrayList<Ordine> ordini = new ArrayList<>();
        String query = "select * from ordini where cf=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1,cf);
            ResultSet rs = st.executeQuery();
            while(rs.next()) { ordini.add(createNewOrdine(rs)); }
            return ordini;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<DettagliOrdine> getDetailOrderByNumber(DettagliOrdine dettagliOrdine) {
        ArrayList<DettagliOrdine> dettagliOrdines = new ArrayList<>();
        String query = "SELECT * FROM dettagli_ordine WHERE cf = ? AND numero_ordine = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1,dettagliOrdine.getCf());
            st.setInt(2,dettagliOrdine.getNumeroOrdine());
            ResultSet rs = st.executeQuery();
            while(rs.next()) { dettagliOrdines.add(createNewDetailOrder(rs)); }
            return dettagliOrdines;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}