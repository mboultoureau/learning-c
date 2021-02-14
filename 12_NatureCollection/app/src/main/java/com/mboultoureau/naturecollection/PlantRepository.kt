package com.mboultoureau.naturecollection

import android.net.Uri
import com.google.android.gms.tasks.Continuation
import com.google.android.gms.tasks.Task
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.UploadTask
import com.mboultoureau.naturecollection.PlantRepository.Singleton.databaseRef
import com.mboultoureau.naturecollection.PlantRepository.Singleton.downloadUri
import com.mboultoureau.naturecollection.PlantRepository.Singleton.plantList
import com.mboultoureau.naturecollection.PlantRepository.Singleton.storageReference
import java.util.*

class PlantRepository {

    object Singleton {
        private val BUCKET_URL: String = "gs://nature-collection-app.appspot.com"

        // Se connecter au stockage
        val storageReference = FirebaseStorage.getInstance().getReferenceFromUrl(BUCKET_URL)

        // Se connecter
        val databaseRef = FirebaseDatabase.getInstance().getReference("plants")

        // Créer une liste de plantes
        val plantList = arrayListOf<PlantModel>()

        // Lien de l'image courante
        var downloadUri: Uri? = null
    }

    fun updateData(callback: () -> Unit) {
        // Absorber les données --> liste de plantes
        databaseRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                // Retirer les anciennes
                plantList.clear()

                // Récolter la liste
                for (ds in snapshot.children) {
                    // Construction de l'objet plante
                    val plant = ds.getValue(PlantModel::class.java)

                    // Vérifier plante n'est pas nulle
                    if (plant != null) {
                        plantList.add(plant)
                    }
                }

                // Actionner le callback
                callback()
            }

            override fun onCancelled(snapshot: DatabaseError) {}

        })
    }

    // Envoyer des fichiers sur le storage
    fun uploadImage(file: Uri, callback: () -> Unit) {
        // Vérifier fichier
        if (file != null) {
            val fileName = UUID.randomUUID().toString() + ".jpg"
            val ref = storageReference.child(fileName)
            val uploadTask = ref.putFile(file)

            // Démarrer tache d'envoi
            uploadTask.continueWithTask(Continuation<UploadTask.TaskSnapshot, Task<Uri>> { task ->

                // Gestion problème
                if (!task.isSuccessful) {
                    task.exception?.let { throw it }
                }

                return@Continuation ref.downloadUrl

            }).addOnCompleteListener { task ->
                // Vérifier tout a bien fonctionné
                if (task.isSuccessful) {
                    // Récupérer image
                    downloadUri = task.result
                    callback()
                }
            }
        }
    }

    // Mise à jour d'une plante
    fun updatePlant(plant: PlantModel) = databaseRef.child(plant.id).setValue(plant)

    // Insérer une nouvelle plante
    fun insertPlant(plant: PlantModel) = databaseRef.child(plant.id).setValue(plant)

    // Supprimer une plante
    fun deletePlant(plant: PlantModel) = databaseRef.child(plant.id).removeValue()

}