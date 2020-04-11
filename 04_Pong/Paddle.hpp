//
//  Paddle.hpp
//  Pong
//
//  Created by Mathis Boultoureau on 14/02/2019.
//  Copyright © 2019 Mathis Boultoureau. All rights reserved.
//

#ifndef Paddle_hpp
#define Paddle_hpp

#include <stdio.h>
#include <SFML/Graphics.hpp>
#include "Constants.hpp"

class Paddle
{
private:
    sf::Vector2f position;
    sf::RectangleShape shape;
    sf::FloatRect collision;
    
public:
    Paddle();
    void display(sf::RenderWindow &window);
    void update();
    void setPosition(sf::Vector2f paddlePosition);
    void move(int y);
    sf::FloatRect getCollision();
    sf::Vector2f getPosition();
};

#endif /* Paddle_hpp */
