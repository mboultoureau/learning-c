//
//  interface.h
//  Hangman
//
//  Created by Mathis Boultoureau on 25/02/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#ifndef interface_h
#define interface_h

#include <stdio.h>
#include <string.h>
#include "constants.h"

void displayWelcome(void);
void generateRevealedWord(char* revealedWord, const char* mysteredWord);
void displayHangman(const int attempts, const char letterEntered);
void displayVictory(const int attempts);
void displayDefeat(const char* mysteryWord);
void askPlayAgain(int* keepPlaying);
void askPlay2Players(int* twoPlayerMode);
void askMysteryWord(char* mysteryWord);
void displayGoodbye(void);

#endif /* interface_h */
