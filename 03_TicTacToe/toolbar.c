//
//  toolbar.c
//  TicTacToe
//
//  Created by Mathis Boultoureau on 29/06/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#include "toolbar.h"

void renderToolbar(SDL_Renderer* renderer) {
    TTF_Init();
    
    TTF_Font* font = TTF_OpenFont("resources/Font.ttf", 40);
    SDL_Color color = {0, 0, 0};
    
    SDL_Surface* textSurface = TTF_RenderUTF8_Blended(font, "Tic Tac Toe", color);
    SDL_Texture* textTexure = SDL_CreateTextureFromSurface(renderer, textSurface);
    
    SDL_Rect dstrect;
    dstrect.x = 300 - textSurface->w / 2;
    dstrect.y = 28 - textSurface->h / 2;
    dstrect.w = textSurface->w;
    dstrect.h = textSurface->h;
    
    SDL_RenderCopy(renderer, textTexure, NULL, &dstrect);
    TTF_Quit();
}
