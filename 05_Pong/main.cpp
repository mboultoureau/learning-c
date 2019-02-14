/**
 *  Pong
 *  Created by Mathis Boultoureau on 13/02/2019
 */

#include <string>
#include <cmath>
#include <SFML/Graphics.hpp>

#include "ResourcePath.hpp"
#include "Ball.hpp"
#include "Constants.hpp"
#include "Paddle.hpp"
#include "Player.hpp"

int main(int, char const**)
{
    sf::RenderWindow window(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), "Pong");
    
    Player player1(sf::Vector2f(50.f, WINDOW_HEIGHT / 2)), player2(sf::Vector2f(WINDOW_WIDTH - 50.f, WINDOW_HEIGHT / 2));
    Ball ball;
    
    sf::Image icon;
    if (!icon.loadFromFile(resourcePath() + "icon.png")) {
        return EXIT_FAILURE;
    }
    window.setIcon(icon.getSize().x, icon.getSize().y, icon.getPixelsPtr());
    
    
    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed) {
                window.close();
            }

            if (event.type == sf::Event::KeyPressed)
            {
                switch (event.key.code)
                {
                    case sf::Keyboard::Escape:
                        window.close();
                        break;
                    
                    case sf::Keyboard::Up:
                        player2.moveUp();
                        break;
                        
                    case sf::Keyboard::Down:
                        player2.moveDown();
                        break;
                        
                    default:
                        break;
                }
            }
        }
        
        sf::Vector2i mousePosition = sf::Mouse::getPosition(window);
        player1.move(mousePosition.y);

        window.clear(sf::Color::Black);
        
        sf::Font font;
        if (!font.loadFromFile(resourcePath() + "bit5x3.ttf")) {
            return EXIT_FAILURE;
        }
        
        player1.displayPaddle(window);
        player2.displayPaddle(window);
        
        player1.displayScore(window, sf::Vector2f(WINDOW_WIDTH / 4, 50), font);
        player2.displayScore(window, sf::Vector2f(WINDOW_WIDTH / 4 * 3, 50), font);
        
        ball.update(player1, player2);
        ball.display(window);

        window.display();
    }

    return EXIT_SUCCESS;
}
