
//
//  Paddle.cpp
//  Pong
//
//  Created by Mathis Boultoureau on 14/02/2019.
//  Copyright © 2019 Mathis Boultoureau. All rights reserved.
//

#include "Paddle.hpp"

Paddle::Paddle()
{
    shape.setSize(sf::Vector2f(PADDLE_WIDTH, PADDLE_HEIGHT));
}

void Paddle::display(sf::RenderWindow &window)
{
    window.draw(shape);
}

void Paddle::update()
{
    shape.setPosition(position.x - PADDLE_WIDTH / 2, position.y - PADDLE_HEIGHT / 2);
    collision = shape.getGlobalBounds();
}

void Paddle::setPosition(sf::Vector2f paddlePosition)
{
    position = paddlePosition;
    
    if (position.y < PADDLE_HEIGHT / 2)
        position.y = PADDLE_HEIGHT / 2;
    
    if (position.y > WINDOW_HEIGHT - PADDLE_HEIGHT / 2)
        position.y = WINDOW_HEIGHT - PADDLE_HEIGHT / 2;
}

void Paddle::move(int y)
{
    setPosition(sf::Vector2f(position.x, y));
}

sf::FloatRect Paddle::getCollision()
{
    return collision;
}

sf::Vector2f Paddle::getPosition()
{
    return position;
}
