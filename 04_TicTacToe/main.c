//
//  main.c
//  TicTacToe
//
//  Created by Mathis Boultoureau on 20/05/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#include <stdio.h>
#include <SDL2/SDL.h>
#include <SDL2_image/SDL_image.h>
#include "game.h"

int main(int argc, const char * argv[]) {
    
    if (SDL_Init(SDL_INIT_VIDEO) != 0) {
        fprintf(stdout, "SDL2 cannot be initialized: %s\n", SDL_GetError());
        return EXIT_FAILURE;
    }
    
    SDL_Window* window = NULL;
    window = SDL_CreateWindow("Tic Tac Toe", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, 600, 600, SDL_WINDOW_SHOWN);
    
    if (window) {
        SDL_Surface* icon = IMG_Load("resources/Icon.png");
        SDL_SetWindowIcon(window, icon);
        
        SDL_Renderer* renderer = NULL;
        renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);
        
        if (renderer) {
            displayGame(renderer);
        } else {
            fprintf(stdout, "Cannot create renderer: %s\n", SDL_GetError());
        }
        
        SDL_DestroyWindow(window);
    } else {
        fprintf(stdout, "Cannot create window: %s\n", SDL_GetError());
    }
    
    SDL_Quit();
    
    return EXIT_SUCCESS;
}
