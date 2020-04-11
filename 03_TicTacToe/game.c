//
//  game.c
//  TicTacToe
//
//  Created by Mathis Boultoureau on 21/05/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#include "game.h"

void render(void);
void displayBoard(void);
void displayXAndO(void);
void displayWinner(void);
void checkWinner(void);

int playerTurn = 1, winner = 0;
int board[9] = {0, 0, 0, 0, 0, 0, 0, 0, 0};
SDL_Renderer* renderer;

void displayGame(SDL_Renderer* r) {
    renderer = r;
    render();
    
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
            
            if (event.type == SDL_MOUSEBUTTONUP && board[3 * ((event.button.y - 56) / 200) + event.button.x / 200] == 0 && winner == 0 && event.button.y > 56) {
                board[3 * ((event.button.y - 56) / 200) + event.button.x / 200] = playerTurn;
                playerTurn = (playerTurn == 1) ? 2 : 1;
                    
                checkWinner();
                render();
            }

            if (event.type == SDL_KEYUP && event.key.keysym.sym == SDLK_r) {
                playerTurn = 1;
                winner = 0;
                int i;
                for (i = 0; i < 9; i++) {
                    board[i] = 0;
                }
                
                render();
            }
        }
        
        SDL_Delay(16);
    }
}

void render() {
    SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
    SDL_RenderClear(renderer);
    
    displayBoard();
    displayXAndO();
    displayWinner();
    renderToolbar(renderer);
    
    SDL_RenderPresent(renderer);
    SDL_Delay(16);
}

void displayBoard() {
    SDL_Texture* boardTexture = IMG_LoadTexture(renderer, "resources/Board.png");
    SDL_Rect rect;
    rect.x = 0;
    rect.y = 56;
    rect.w = 600;
    rect.h = 600;
    SDL_RenderCopy(renderer, boardTexture, NULL, &rect);
    SDL_DestroyTexture(boardTexture);
}

void displayXAndO() {
    SDL_Texture* xTexture = IMG_LoadTexture(renderer, "resources/X.png");
    SDL_Texture* oTexture = IMG_LoadTexture(renderer, "resources/O.png");
    SDL_Rect dstrect;
    dstrect.w = 200;
    dstrect.h = 200;
    
    int i;
    for (i = 0; i < 9; i++) {
        dstrect.x = i % 3 * 200;
        dstrect.y = (i - (i % 3)) / 3 * 200 + 56;

        if (board[i] == 1)
            SDL_RenderCopy(renderer, xTexture, NULL, &dstrect);
        else if (board[i] == 2)
            SDL_RenderCopy(renderer, oTexture, NULL, &dstrect);
    }
    
    SDL_DestroyTexture(xTexture);
    SDL_DestroyTexture(oTexture);
}

void displayWinner() {
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
    
    int i;
    for(i = 0; i < 8; i++) {
        if (
            board[winningBoards[i][0]] == board[winningBoards[i][1]] &&
            board[winningBoards[i][1]] == board[winningBoards[i][2]] &&
            (board[winningBoards[i][0]] == 1 || board[winningBoards[i][0]] == 2)
        ) {
            winner = board[winningBoards[i][0]];
            return;
        }
    }
}
