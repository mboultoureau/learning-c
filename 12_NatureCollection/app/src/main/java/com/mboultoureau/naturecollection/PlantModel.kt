package com.mboultoureau.naturecollection

class PlantModel(
        val id: String = "plant0",
        val name: String = "Tulipe",
        val description: String = "Petite description",
        val imageUrl: String = "https://cdn.pixabay.com/photo/2017/04/23/20/36/pink-2254970_960_720.jpg",
        val grow: String = "Faible",
        val water: String = "Moyenne",
        var liked: Boolean = false
)