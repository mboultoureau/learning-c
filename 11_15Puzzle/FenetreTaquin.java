package taquin;

import javafx.event.ActionEvent;
import javafx.geometry.Insets;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

public class FenetreTaquin extends Stage {

    private VBox root = new VBox();
    private Label nbClicsLabel = new Label("Nombre de clics = 0");
    private GridPane gridpane = new GridPane();
    private Button[] buttons = new Button[16];
    private String nb[] = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "0"};

    private ButtonType rejouerButton = new ButtonType("Rejouer", ButtonBar.ButtonData.OK_DONE);
    private Alert victoireAlert = new Alert(Alert.AlertType.INFORMATION, "Victoire ! ", rejouerButton);

    private int nbClics = 0;

    public FenetreTaquin() {
        this.setTitle("Taquin");
        this.setResizable(false);
        Scene scene = new Scene(creerContenu());
        this.setScene(scene);
        this.setWidth(430);
        this.setHeight(450);

        for (int i = 0; i < buttons.length; i++) {
            buttons[i].setOnAction(e -> deplacer(e));
        }
    }

    /**
     * Tente de déplacer une pièce
     * @param e L'événement
     */
    public void deplacer(ActionEvent e) {
        Button btn = (Button) e.getSource();
        int index = getButtonNumero(btn.getText());
        if (deplacementValide(index)) {
            int ancienZero = getButtonNumero("0");
            buttons[ancienZero].setText(buttons[index].getText());
            buttons[index].setText("0");
            buttons[index].setVisible(false);
            buttons[ancienZero].setVisible(true);

            nbClics++;
            nbClicsLabel.setText("Nombre de clics = " + nbClics);

            if (aGagne()) {
                victoireAlert.setContentText("Vous avez gagné avec " + nbClics + "clics. Rejouez ?");
                Optional<ButtonType> resultat = victoireAlert.showAndWait();

                if (!resultat.isPresent())
                    rejouer();
                else if (resultat.get() == rejouerButton)
                    rejouer();
            }

        }
    }

    private void rejouer() {
        nbClics = 0;
        nbClicsLabel.setText("Nombre de clics = 0");
        melanger();
    }

    /**
     * Permet d'obtenir l'index de la pièce à partir de son numéro
     * @param numero Le numéro indiqué sur la pièce
     * @return L'index de la pièce
     */
    public int getButtonNumero(String numero) {
        boolean trouve = false;
        int index = 0;

        while (!trouve && index < buttons.length) {
            if (buttons[index].getText().equals(numero)) {
                trouve = true;
            } else {
                index++;
            }
        }

        return index;
    }

    /**
     * Vérifie si un déplacement est valide
     * @param index L'index de la pièce à déplacer
     * @return Retourne un booléen indiquant si le déplacement est valide
     */
    public boolean deplacementValide(int index) {
        if (index > 3 && buttons[index - 4].getText().equals("0"))
            return true;

        if (index < 12 && buttons[index + 4].getText().equals("0"))
            return true;

        if (index % 4 != 3 && buttons[index + 1].getText().equals("0"))
            return true;

        if (index % 4 != 0 && buttons[index - 1].getText().equals("0"))
            return true;

        return false;
    }

    /**
     * Mélange toutes les pièces
     */
    private void melanger() {
        ArrayList<String> numeros = new ArrayList<String>(Arrays.asList(nb));
        for (int i = 15; i >= 0; i--) {
            int nbAleatoire = (int) (Math.random() * i);
            buttons[i].setText(numeros.get(nbAleatoire));
            numeros.remove(nbAleatoire);

            if (buttons[i].getText().equals("0"))
                buttons[i].setVisible(false);
            else
                buttons[i].setVisible(true);
        }

        // On réappelle la fonction si le mélange donne le résultat final
        if (aGagne()) {
            melanger();
        }
    }

    public boolean aGagne() {
        boolean victoire = true;
        int index = 0;

        while (victoire && index < buttons.length - 1) {
            if (index + 1 != Integer.valueOf(buttons[index].getText())) {
                victoire = false;
            } else {
                index++;
            }
        }


        return victoire;
    }

    private Parent creerContenu() {

        // Victoire
        victoireAlert.setTitle("Victoire !");
        victoireAlert.setHeaderText("Vous avez gagné !");

        root.setPadding(new Insets(15));

        for (int i = 0; i < buttons.length; i++) {
            buttons[i] = new Button(nb[i]);
            buttons[i].setPrefWidth(100);
            buttons[i].setPrefHeight(100);
            buttons[i].setStyle("-fx-color: orange");
            buttons[i].setFont(new Font(30));

            if (buttons[i].getText().equals("0"))
                buttons[i].setVisible(false);

            gridpane.add(buttons[i], i % 4, i / 4);
        }

        // melanger();

        root.getChildren().addAll(nbClicsLabel, gridpane);

        return root;
    }

}
