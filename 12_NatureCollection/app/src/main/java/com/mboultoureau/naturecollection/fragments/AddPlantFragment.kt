package com.mboultoureau.naturecollection.fragments

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Spinner
import androidx.fragment.app.Fragment
import com.mboultoureau.naturecollection.MainActivity
import com.mboultoureau.naturecollection.PlantModel
import com.mboultoureau.naturecollection.PlantRepository
import com.mboultoureau.naturecollection.PlantRepository.Singleton.downloadUri
import com.mboultoureau.naturecollection.R
import java.util.*

class AddPlantFragment(
    private val context: MainActivity
) : Fragment() {

    private var file: Uri? = null
    private var uploadedImage:ImageView? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_add_plant, container, false)

        // UploadedImage
        uploadedImage = view.findViewById(R.id.preview_image)

        // Charger image
        val pickupImageButton = view.findViewById<Button>(R.id.upload_button)

        pickupImageButton.setOnClickListener { pickUpImage() }

        val confirmButton = view.findViewById<Button>(R.id.confirm_button)
        confirmButton.setOnClickListener { sendForm(view) }

        return view
    }

    private fun sendForm(view: View) {
        val repo = PlantRepository()
        repo.uploadImage(file!!) {
            val plantName = view.findViewById<EditText>(R.id.name_input).text.toString()
            val plantDescription = view.findViewById<EditText>(R.id.description_input).text.toString()
            val plantGrow = view.findViewById<Spinner>(R.id.grow_spinner).selectedItem.toString()
            val plantWater = view.findViewById<Spinner>(R.id.water_spinner).selectedItem.toString()
            val downloadImageUrl = downloadUri

            // Créer objet
            val plant = PlantModel (
                UUID.randomUUID().toString(),
                plantName,
                plantDescription,
                downloadImageUrl.toString(),
                plantGrow,
                plantWater
            )

            // Envoyer en BDD
            repo.insertPlant(plant)
        }
    }

    private fun pickUpImage() {
        val intent = Intent()
        intent.type = "image/"
        intent.action = Intent.ACTION_GET_CONTENT
        startActivityForResult(Intent.createChooser(intent, "Select Picture"), 47)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == 47 && resultCode == Activity.RESULT_OK) {
            // Vérifier les données
            if (data == null || data.data == null) return

            // Récupérer image
            file = data.data

            // Mettre à jour l'aperçu
            uploadedImage?.setImageURI(file)
        }
    }

}