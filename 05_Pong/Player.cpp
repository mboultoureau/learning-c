//
//  Player.cpp
//  Pong
//
//  Created by Mathis Boultoureau on 14/02/2019.
//  Copyright © 2019 Mathis Boultoureau. All rights reserved.
//

#include "Player.hpp"

Player::Player(sf::Vector2f paddlePosition) : paddle(), score(0) {
    paddle.setPosition(paddlePosition);
}

void Player::displayScore(sf::RenderWindow &window, sf::Vector2f position, sf::Font font)
{
    std::string scoreString = std::to_string(score);
    sf::Text scoreText(scoreString, font, 50);
        
    int width = scoreText.getGlobalBounds().width;
    int height = scoreText.getGlobalBounds().height;
        
    scoreText.setFillColor(sf::Color::White);
    scoreText.setPosition(position.x - width / 2, position.y - height / 2);
    window.draw(scoreText);
}

void Player::increaseScore()
{
    score++;
}

void Player::displayPaddle(sf::RenderWindow &window)
{
    paddle.update();
    paddle.display(window);
}

sf::FloatRect Player::getPaddleCollision()
{
    return paddle.getCollision();
}

void Player::move(int y)
{
    paddle.move(y);
}

void Player::moveUp()
{
    paddle.move(paddle.getPosition().y - PADDLE_INCREMENT);
}

void Player::moveDown()
{
    paddle.move(paddle.getPosition().y + PADDLE_INCREMENT);
}

sf::Vector2f Player::getPaddlePosition()
{
    return paddle.getPosition();
}
