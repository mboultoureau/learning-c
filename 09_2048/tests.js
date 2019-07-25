let tests = [
    {
        input: [
            [4, 2, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        actions: ['right'],
        output: [
            [4, 2, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    {
        input: [
            [0, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        actions: ['down'],
        output: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 2, 0, 0]
        ]
    },
    {
        input: [
            [0, 0, 0, 0],
            [0, 4, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        actions: ['left'],
        output: [
            [0, 0, 0, 0],
            [8, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    {
        input: [
            [4, 4, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        actions: ['left'],
        output: [
            [8, 4, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    {
        input: [
            [0, 0, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 4, 0],
            [0, 0, 0, 0]
        ],
        actions: ['up'],
        output: [
            [0, 0, 8, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
]


function executeTests() {
    let board = new Board();

    tests.forEach((test) => {
        if(board.test(test.input, test.actions, test.output).result) {
            console.log('%c Réussite du test ', 'background: #2ecc71; color: #FFF');
        } else {
            console.log('%c Échec du test ', 'background: #e74c3c; color: #FFF');
            console.log('Input :');
            console.table(test.input);
            console.log('Actions :');
            console.info(test.actions);
            console.log('Résultat attendu :');
            console.table(test.output)
            console.log('Résultat obtenu :');
            console.table(board.test(test.input, test.actions, test.ouput).output);
        }
    });
}

//executeTests();