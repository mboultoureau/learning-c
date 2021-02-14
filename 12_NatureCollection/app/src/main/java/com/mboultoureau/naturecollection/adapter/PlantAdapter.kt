package com.mboultoureau.naturecollection.adapter

import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.mboultoureau.naturecollection.*

class PlantAdapter(
        val context: MainActivity,
        private val plantList: List<PlantModel>,
        private val layoutId: Int
) : RecyclerView.Adapter<PlantAdapter.ViewHolder>() {

    // Boite à composants
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val plantImage = view.findViewById<ImageView>(R.id.image_item)
        val plantName:TextView? = view.findViewById(R.id.name_item)
        val plantDescription:TextView? = view.findViewById(R.id.description_item)
        val starIcon = view.findViewById<ImageView>(R.id.star_icon)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater
            .from(parent.context)
            .inflate(layoutId, parent, false)

        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        // Récupérer les informations de la plante
        val currentPlant = plantList[position]

        // Récupérer repository
        val repo = PlantRepository()

        // Glide : récupérer image à partir du lien
        Glide.with(context).load(Uri.parse(currentPlant.imageUrl)).into(holder.plantImage)

        // Mise à jour nom & description
        holder.plantName?.text = currentPlant.name
        holder.plantDescription?.text = currentPlant.description

        // Like
        if (currentPlant.liked) {
            holder.starIcon.setImageResource(R.drawable.ic_star)
        } else {
            holder.starIcon.setImageResource(R.drawable.ic_unstar)
        }

        // Interaction du like
        holder.starIcon.setOnClickListener {
            // Inverser le button
            currentPlant.liked = !currentPlant.liked

            // Mise à jour de la plante
            repo.updatePlant(currentPlant)
        }

        // Interaction clic sur une plante
        holder.itemView.setOnClickListener {
            // Afficher la popup
            PlantPopup(this, currentPlant).show()
        }
    }

    override fun getItemCount(): Int = plantList.size

}