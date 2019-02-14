//
//  Ball.cpp
//  Pong
//
//  Created by Mathis Boultoureau on 14/02/2019.
//  Copyright © 2019 Mathis Boultoureau. All rights reserved.
//

#include "Ball.hpp"

float random(float MIN, float MAX)
{
    float number = 0;
    do {
        number  = (rand() / (float) RAND_MAX) * (MAX - MIN) - MAX;
    } while(number > -0.5 && number < 0.5);
    return number;
}

Ball::Ball() {
    shape.setRadius(BALL_RADIUS);
    position = sf::Vector2f(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    velocity = sf::Vector2f(random(-BALL_SPEED, BALL_SPEED), random(-BALL_SPEED, BALL_SPEED));
}

void Ball::display(sf::RenderWindow &window)
{
    window.draw(shape);
}

void Ball::update(Player &player1, Player &player2)
{
    position = sf::Vector2f(position.x + velocity.x, position.y + velocity.y);
    collision = shape.getGlobalBounds();
    
    if (position.y < 0 || position.y > WINDOW_HEIGHT)
        velocity.y = -velocity.y;
    
    if (position.x < 0)
    {
        player2.increaseScore();
        position = sf::Vector2f(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        velocity = sf::Vector2f(random(-BALL_SPEED, BALL_SPEED), random(-BALL_SPEED, BALL_SPEED));
        velocity = sf::Vector2f(-1, 0);
    }
    
    if (position.x > WINDOW_WIDTH)
    {
        player1.increaseScore();
        position = sf::Vector2f(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        velocity = sf::Vector2f(random(-BALL_SPEED, BALL_SPEED), random(-BALL_SPEED, BALL_SPEED));
        velocity = sf::Vector2f(-1, 0);
    }
    
    if (collision.intersects(player1.getPaddleCollision())) {
        float distanceToCenter = player1.getPaddlePosition().y - position.y;
        float angle = distanceToCenter * (60 * M_PI / 180) / (PADDLE_HEIGHT / 2);
        velocity = sf::Vector2f(cos(angle) * BALL_SPEED, -sin(angle) * BALL_SPEED);
    }
    
    if (collision.intersects(player2.getPaddleCollision())) {
        float distanceToCenter = player2.getPaddlePosition().y - position.y;
        float angle = distanceToCenter * (60 * M_PI / 180) / (PADDLE_HEIGHT / 2);
        velocity = sf::Vector2f(-cos(angle) * BALL_SPEED, -sin(angle) * BALL_SPEED);
    }
    
    shape.setPosition(position.x - BALL_RADIUS, position.y - BALL_RADIUS);
}
