package com.example.backendcardoc.Persistence.DAO.Postgres;

import com.example.backendcardoc.Persistence.DAO.OrdineDao;
import com.example.backendcardoc.Persistence.Model.DettagliOrdine;
import com.example.backendcardoc.Persistence.Model.Ordine;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class OrdineDaoPostgres implements OrdineDao {
    Connection connection;

    public OrdineDaoPostgres(Connection connection) { this.connection = connection; }

    public Ordine createNewOrdine(ResultSet rs) throws SQLException {
        Ordine o = new Ordine();
        o.setNumeroOrdine(rs.getInt("numero_ordine"));
        o.setNumeroVenduti(rs.getInt("numero_venduti"));

        Double prezzoTotale = rs.getDouble("prezzo_totale");
        DecimalFormat decimalFormat = new DecimalFormat("#.00");
        String prezzoTotaleFormattato = decimalFormat.format(prezzoTotale);
        prezzoTotaleFormattato = prezzoTotaleFormattato.replace(",", ".");
        o.setPrezzoTotale(Double.parseDouble(prezzoTotaleFormattato));
        o.setCf(rs.getString("cf"));
        return o;
    }

    public DettagliOrdine createNewDetailOrder(ResultSet rs) throws SQLException {
        DettagliOrdine d = new DettagliOrdine();
        d.setNumeroOrdine(rs.getInt("numero_ordine"));
        d.setCf(rs.getString("cf"));
        d.setIdProdotto(rs.getString("id_prodotto"));
        d.setQuantita(rs.getInt("quantita"));

        Double prezzoTotale = rs.getDouble("prezzo");
        DecimalFormat decimalFormat = new DecimalFormat("#.00");
        String prezzoTotaleFormattato = decimalFormat.format(prezzoTotale);
        prezzoTotaleFormattato = prezzoTotaleFormattato.replace(",", ".");
        d.setPrezzo(Double.parseDouble(prezzoTotaleFormattato));
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

    @Override
    public int findLastNumberOrder(String cf) {
        int ultimoNumeroOrdine = 0;
        String query = "SELECT MAX(numero_ordine) AS max_numero_ordine FROM ordini WHERE cf = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1,cf);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                ultimoNumeroOrdine = rs.getInt("max_numero_ordine");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ultimoNumeroOrdine + 1;
    }

    @Override
    public boolean insertDettagliOrdine(DettagliOrdine dettagliOrdine){
        String insertQuery = "INSERT INTO dettagli_ordine(cf, id_prodotto, numero_ordine, quantita, prezzo) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(insertQuery)) {
            preparedStatement.setString(1, dettagliOrdine.getCf());
            preparedStatement.setString(2, dettagliOrdine.getIdProdotto());
            preparedStatement.setInt(3, dettagliOrdine.getNumeroOrdine());
            preparedStatement.setInt(4, dettagliOrdine.getQuantita());
            preparedStatement.setDouble(5, dettagliOrdine.getPrezzo());
            preparedStatement.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }



    @Override
    public void insertOrdine(Ordine ordine){
        String insertQuery = "INSERT INTO ordini(numero_ordine, numero_venduti, prezzo_totale, cf) VALUES (?, ?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(insertQuery)) {
            preparedStatement.setInt(1, ordine.getNumeroOrdine());
            preparedStatement.setInt(2, ordine.getNumeroVenduti());
            preparedStatement.setDouble(3, ordine.getPrezzoTotale());
            preparedStatement.setString(4, ordine.getCf());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}