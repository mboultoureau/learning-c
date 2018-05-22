//
//  game.c
//  TicTacToe
//
//  Created by Mathis Boultoureau on 21/05/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#include "game.h"

void displayBoard(void);
void displayXAndO(void);
void displayWinner(void);
void checkWinner(void);

int playerTurn = 1, winner = 0;
int board[3][3] = {
    {0, 0, 0},
    {0, 0, 0},
    {0, 0, 0}
};
SDL_Renderer* renderer;

void displayGame(SDL_Renderer* r) {
    renderer = r;
    
    int keepPlaying = 1;
    
    SDL_Event event;
    
    while (keepPlaying)
    {
        // Event Processing
        while (SDL_PollEvent(&event)) {
            if (event.type == SDL_QUIT) {
                keepPlaying = 0;
                break;
            }
            
            if (event.type == SDL_MOUSEBUTTONUP && board[event.button.y / 200][event.button.x / 200] == 0 && winner == 0) {
                board[event.button.y / 200][event.button.x / 200] = playerTurn;
                playerTurn = (playerTurn == 1) ? 2 : 1;
                        
                checkWinner();
            }
            
            if (event.type == SDL_KEYUP && event.key.keysym.sym == SDLK_r) {
                playerTurn = 1;
                winner = 0;
                int i, j;
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        board[i][j] = 0;
                    }
                }
            }
        }

        // Graphic processing
        SDL_RenderClear(renderer);
        SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
        
        displayBoard();
        displayXAndO();
        displayWinner();
                
        SDL_RenderPresent(renderer);
        
        SDL_Delay(16); // 60 FPS
    }
}

void displayBoard() {
    SDL_Texture* boardTexture = IMG_LoadTexture(renderer, "resources/Board.png");
    SDL_RenderCopy(renderer, boardTexture, NULL, NULL);
    SDL_DestroyTexture(boardTexture);
}

void displayXAndO() {
    SDL_Texture* xTexture = IMG_LoadTexture(renderer, "resources/X.png");
    SDL_Texture* oTexture = IMG_LoadTexture(renderer, "resources/O.png");
    SDL_Rect dstrect;
    dstrect.w = 200;
    dstrect.h = 200;
    
    int x, y;
    for (y = 0; y < 3; y++) {
        for (x = 0; x < 3; x++) {
            dstrect.x = x * 200;
            dstrect.y = y * 200;
            
            if (board[y][x] == 1)
                SDL_RenderCopy(renderer, xTexture, NULL, &dstrect);
            else if (board[y][x] == 2)
                SDL_RenderCopy(renderer, oTexture, NULL, &dstrect);
        }
    }
    
    SDL_DestroyTexture(xTexture);
    SDL_DestroyTexture(oTexture);
}

void displayWinner()
{
    SDL_Rect dstrect;
    dstrect.w = 600;
    dstrect.h = 300;
    dstrect.x = 0;
    dstrect.y = 150;
    
    if (winner == 1) {
        SDL_Texture* xWinTexture = IMG_LoadTexture(renderer, "resources/XHasWon.png");
        SDL_RenderCopy(renderer, xWinTexture, NULL, &dstrect);
        SDL_DestroyTexture(xWinTexture);
    }
    
    if (winner == 2) {
        SDL_Texture* oWinTexture = IMG_LoadTexture(renderer, "resources/OHasWon.png");
        SDL_RenderCopy(renderer, oWinTexture, NULL, &dstrect);
        SDL_DestroyTexture(oWinTexture);
    }
}

void checkWinner() {
    int boardCheck[9];
    int x, y;
    for (y = 0; y < 3; y++) {
        for (x = 0; x < 3; x++) {
            boardCheck[y * 3 + x] = board[y][x];
        }
    }
    
    int winningBoards[8][3] = {
        {0, 1, 2},
        {3, 4, 5},
        {6, 7, 8},
        {0, 3, 6},
        {1, 4, 7},
        {2, 5, 8},
        {0, 4, 8},
        {6, 4, 2}
    };
    
    int i, j, player, combo;
    for (i = 0; i < 8; i++) {
        player = 0;
        combo = 0;

        for (j = 0; j < 3; j++) {
            if (boardCheck[winningBoards[i][j]] == 0) {
                break;
            }

            if (j == 0) {
                player = boardCheck[winningBoards[i][j]];
                combo++;
            } else if (boardCheck[winningBoards[i][j]] == player && combo == 2) {
                winner = player;
                return;
            } else if (boardCheck[winningBoards[i][j]] == player) {
                combo++;
            } else {
                break;
            }
        }
    }
}
