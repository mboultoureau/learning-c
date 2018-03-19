//
//  main.c
//  Hangman
//
//  Created by Mathis Boultoureau on 24/02/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "interface.h"
#include "dictionary.h"
#include "constants.h"

char readCharacter(void);
int hasWon(const char* motMystere, const char* motDevoile);

int main(int argc, const char * argv[]) {
    srand((int)time(NULL));
    int attempts = 0, i = 0, win = 0, keepPlaying = 1, twoPlayerMode = 0;
    char mysteryWord[MAX_LENGTH] = "", revealedWord[MAX_LENGTH] = "", letterEntered = 0;

    displayWelcome();
    
    while(keepPlaying == 1) {
        attempts = 0;
        i = 0;
        letterEntered = 0;
        strcpy(mysteryWord, "");
        strcpy(revealedWord, "");
        
        askPlay2Players(&twoPlayerMode);
        
        if(!twoPlayerMode) {
            generateRandomWord(mysteryWord);
        } else {
            askMysteryWord(mysteryWord);
        }

        generateRevealedWord(revealedWord, mysteryWord);

        // As long as the word is not discovered and the hangman is not complete
        while(attempts < 10 && !hasWon(mysteryWord, revealedWord)) {
            printf("%s\n", revealedWord);
            letterEntered = readCharacter();
            win = 0;
            
            for(i = 0; i < strlen(mysteryWord); i++) {
                if (mysteryWord[i] == letterEntered) {
                    revealedWord[i] = letterEntered;
                    win = 1;
                }
            }
            
            if(win == 0) {
                attempts++;
                displayHangman(attempts, letterEntered);
            }
            
            printf("\n\n");
        }
        
        // Displays victory or defeat
        if(attempts < 10) {
            displayVictory(attempts);
        } else {
            displayDefeat(mysteryWord);
        }
        
        askPlayAgain(&keepPlaying);
    }

    displayGoodbye();
    return 0;
}

int hasWon(const char* mysteryWord, const char* revealedWord) {
    if(strcmp(mysteryWord, revealedWord) == 0) {
        return 1;
    } else {
        return 0;
    }
}

char readCharacter()
{
    char character = 0;
    
    character = getchar();
    character = toupper(character);
    
    while (getchar() != '\n');
    
    return character;
}
