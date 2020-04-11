//
//  Ball.hpp
//  Pong
//
//  Created by Mathis Boultoureau on 14/02/2019.
//  Copyright © 2019 Mathis Boultoureau. All rights reserved.
//

#ifndef Ball_hpp
#define Ball_hpp

#include <stdio.h>
#include <math.h>
#include <SFML/Graphics.hpp>
#include "Constants.hpp"
#include "Player.hpp"

class Ball
{
private:
    sf::Vector2f position;
    sf::Vector2f velocity;
    sf::CircleShape shape;
    sf::FloatRect collision;
    
public:
    Ball();
    void display(sf::RenderWindow &window);
    void setPosition(sf::Vector2f ballPosition);
    void update(Player &player1, Player &player2);
};


#endif /* Ball_hpp */
