//
//  dictionary.c
//  Hangman
//
//  Created by Mathis Boultoureau on 24/02/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#include "dictionary.h"

void generateRandomWord(char* mysteryWord){

    FILE* dictionary = NULL;
    dictionary = fopen("dictionary/dictionary.txt", "r");
    int wordCount = 0, selectedWord = 0, i = 1;
    
    if(dictionary != NULL) {
        // Count the number of words in the dictionary
        while (fgets(mysteryWord, MAX_LENGTH, dictionary) != NULL)
        {
            wordCount++;
        }
        rewind(dictionary);

        // Chose a random number
        selectedWord = (rand() % (wordCount)) + 1;
        
        // Choose a word with the random number
        for(i = 1;  i <= selectedWord; i++) {
            fgets(mysteryWord, MAX_LENGTH, dictionary);
        }
        
        // If the selected word is not the last word in the dictionary, remove the line break
        if(wordCount != selectedWord) {
            mysteryWord[strlen(mysteryWord) - 1] = 0;
        }
        
        fclose(dictionary);
    } else {
        printf("Can't open the dictionary!\n\n");
        exit(-1);
    }
}
