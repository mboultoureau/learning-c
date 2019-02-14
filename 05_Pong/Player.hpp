//
//  Player.hpp
//  Pong
//
//  Created by Mathis Boultoureau on 14/02/2019.
//  Copyright © 2019 Mathis Boultoureau. All rights reserved.
//

#ifndef Player_hpp
#define Player_hpp

#include <stdio.h>
#include <SFML/Graphics.hpp>
#include "Paddle.hpp"

class Player
{
private:
    int score;
    Paddle paddle;
public:
    Player(sf::Vector2f paddlePosition);
    void displayScore(sf::RenderWindow &window, sf::Vector2f position, sf::Font font);
    void increaseScore();
    void displayPaddle(sf::RenderWindow &window);
    void move(int y);
    void moveUp();
    void moveDown();
    sf::FloatRect getPaddleCollision();
    sf::Vector2f getPaddlePosition();
};

#endif /* Player_hpp */
