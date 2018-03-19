//
//  main.c
//  Guess The Number
//
//  Created by Mathis Boultoureau on 24/02/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(int argc, const char * argv[]) {
    // Declaration of variables
    long mysteryNumber = 0, enteredNumber = 0, max = 100, min = 1;
    int attempts = 0, keepPlaying = 1, twoPlayerMode = 2, changeSettings = 1, difficulty = 1;
    srand((int)time(NULL));
    
    printf("Welcome in \"Guess The Number\" !\n\n");
    
    // As long as the player wishes to play
    while(keepPlaying == 1) {
        
        // Changing game parameters
        if(changeSettings == 1) {
            // Ask the player for the desired difficulty level
            do {
                printf("What level of difficulty do you want?\n");
                printf("1. Between 1              and 100\n");
                printf("2. Between 1              and 1 000\n");
                printf("3. Between -1 000         and 1 000\n");
                printf("4. Between -10 000        and 10 000\n");
                printf("5. Between -10 000        and 100\n");
                printf("6. Between -1 000 000 000 and 1 000 000 000\n");
                printf("7. Between -2 000 000 000 and 2 000 000 000\n");
                scanf("%d", &difficulty);
            } while(difficulty < 0 && difficulty > 7);
            
            // Definition of the minimum and maximum according to the selected difficulty level
            switch (difficulty) {
                case 1:
                    min = 1;
                    max = 100;
                    break;
                case 2:
                    min = 1;
                    max = 1000;
                    break;
                case 3:
                    min = 1;
                    max = 10000;
                    break;
                case 4:
                    min = -10000;
                    max = 10000;
                    break;
                case 5:
                    min = -100000;
                    max = 100000;
                    break;
                case 6:
                    min = -1000000000;
                    max = 1000000000;
                    break;
                case 7:
                    min = -2000000000;
                    max = 2000000000;
                    break;
                default:
                    min = 1;
                    max = 100;
                    break;
            }
            
            // Ask the player if he wants to play in single-player or 2-player mode
            do  {
                printf("\nDo you want to play in single-player or 2 player mode?\n");
                printf("0. Play in single player mode\n");
                printf("1. Play in 2-player mode\n");
                scanf("%d", &twoPlayerMode);
            } while(twoPlayerMode != 0 && twoPlayerMode != 1);
        }
        
        
        // Random generation of the mystery number
        if (twoPlayerMode == 0) {
            mysteryNumber = (rand() % (max - min + 1)) + min;
        } else {
            // Ask one player the mystery number that the other player will guess
            do {
                printf("\nOne of the players must enter the mystery number that the other player will guess from %ld to %ld.\n", min, max);
                printf("Enter the mystery number: ");
                scanf("%ld", &mysteryNumber);
            } while(mysteryNumber < min || mysteryNumber > max);
            printf("\n\n\n\n\n\n\n\n\n\n");
        }
        
        attempts = 0;
        changeSettings = 0;
        
        
        // Game Loop
        while (mysteryNumber != enteredNumber) {
            
            // Ask the player for the number and increment the number of attempts
            printf("\nWhat's the mystery number? ");
            scanf("%ld", &enteredNumber);
            attempts++;
            
            // Vérifie si c'est plus ou moins ou le nombre mystère
            if(mysteryNumber > enteredNumber) {
                printf("It's more!\n");
            } else if(mysteryNumber < enteredNumber) {
                printf("It's less!\n");
            } else {
                printf("Congratulations, you've guessed the mystery number in %d attempts!\n\n", attempts);
            }
        }
        
        
        // Ask the player if he wants to play again
        do {
            printf("Would you like to play again?\n");
            printf("0. No\n");
            printf("1. Yes\n");
            printf("2. Yes, but by changing the game parameters\n");
            scanf("%d", &keepPlaying);
            
            if(keepPlaying == 2) {
                keepPlaying = 1;
                changeSettings = 1;
            }
        } while (keepPlaying != 1 && keepPlaying != 0);
        
        printf("\n\n\n\n\n");
    }
    
    printf("Goodbye!\n\n");
    return 0;
}
