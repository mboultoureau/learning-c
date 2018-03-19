//
//  interface.c
//  Hangman
//
//  Created by Mathis Boultoureau on 25/02/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#include "interface.h"

// Displays the welcome message
void displayWelcome(){
    printf("\nWelcome in \"Hangman\" game!\n\n");
}

// Displays the hidden letters as stars
void generateRevealedWord(char* revealedWord, const char* mysteredWord){
    int i = 1;
    for(i = 1; i <= strlen(mysteredWord); i++) {
        strcat(revealedWord, "*");
    }
}

// Ask the player if he wants to play alone or with 2 players
void askPlay2Players(int* twoPlayerMode) {
    do {
        *twoPlayerMode = 2;
        printf("Would you like to play with 2 players?\n");
        printf("0. NO\n");
        printf("1. YES\n");
        scanf("%d", twoPlayerMode);
    } while(*twoPlayerMode != 0 && *twoPlayerMode != 1);
    while (getchar() != '\n');
}

// Ask one player what mystery word the other player will have to guess
void askMysteryWord(char* mysteryWord) {
    printf("Enter the mystery word that the other player will have to guess: ");
    scanf("%s", mysteryWord);
    while (getchar() != '\n');
}

// Displays the hanged man
void displayHangman(const int attempts, const char letterEntered){
    if(NUMBER_ATTEMPS - attempts == 1) {
        printf("Sorry, the letter %c is not in the word. You have one more try.", letterEntered);
    } else {
        printf("Sorry, the letter %c is not in the word. You have %d more tries.", letterEntered, NUMBER_ATTEMPS - attempts);
    }
    
    if(attempts > 0 && attempts < 11) {
        FILE* hangmanFile = NULL;
        char filePath[30]; // Increase this value if you change the file path
        char string[LENGHT_LINE] = "";
        
        sprintf(filePath, "state_hangman/hangman_%d.txt", attempts);
        hangmanFile = fopen(filePath, "r");
        
        if (hangmanFile != NULL) {
            while (fgets(string, LENGHT_LINE, hangmanFile) != NULL)
            {
                printf("%s", string);
            }
            fclose(hangmanFile);
        } else {
            printf("An error occurred when opening the hangman file...\n\n");
        }
    }
}

// Displays the victory message with the number of attempts
void displayVictory(const int attempts) {
    if(attempts == 0) {
        printf("😱 Congratulations, you found the word directly!\n");
    } else if(attempts == 1) {
        printf("🎉 Congratulations, you discovered the word in one try!\n");
    } else {
        printf("👏 Well done, you found the word with %d tries!\n", attempts);
    }
}

// Displays the defeat message
void displayDefeat(const char* mysteryWord){
    printf("Sorry, you lost. The word was cat %s.\n", mysteryWord);
}

// Ask if the player wishes to play again
void askPlayAgain(int* keepPlaying){
    do {
        *keepPlaying = 2;
        printf("Would you like to play again?\n");
        printf("0. NO\n");
        printf("1. YES\n");
        scanf("%d", keepPlaying);
    } while(*keepPlaying != 0 && *keepPlaying != 1);
    while (getchar() != '\n');
}

// Displays "Goodbye!"
void displayGoodbye(){
    printf("Goodbye!\n\n");
}
