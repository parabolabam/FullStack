(function() {
    'use strict'

    var player;
    var winner;


    var cells = {
        _00: document.getElementById("_00"),
        _01: document.getElementById("_01"),
        _02: document.getElementById("_02"),
        _10: document.getElementById("_10"),
        _11: document.getElementById("_11"),
        _12: document.getElementById("_12"),
        _20: document.getElementById("_20"),
        _21: document.getElementById("_21"),
        _22: document.getElementById("_22")
    };




    var select = document.getElementById("slct");

    select.addEventListener('click', () => {
        var select = document.getElementById("slct").value;
        if (select === 'Choose a side') {
            return
        }
        player = select;
        document.getElementById("select").style.display = "none";
        alert("You are playing for " + player)
    });

    cells._00.addEventListener('click', () => {

        insertXOrO(player, cells._00);
        AI();
        if (isFieldFull()) {
            alert("Field is full")
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }

    });


    cells._01.addEventListener('click', () => {

        insertXOrO(player, cells._01);
        AI();
        if (isFieldFull()) {
            alert("Field is full")
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }
    });

    cells._02.addEventListener('click', () => {

        insertXOrO(player, cells._02);
        AI();
        if (isFieldFull()) {
            alert("Field is full")
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }

    });
    cells._10.addEventListener('click', () => {

        insertXOrO(player, cells._10);
        AI();
        if (isFieldFull()) {
            alert("Field is full")
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }
    });
    cells._11.addEventListener('click', () => {

        insertXOrO(player, cells._11);
        AI();
        if (isFieldFull()) {
            alert("Field is full")
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }
    });


    cells._12.addEventListener('click', () => {

        insertXOrO(player, cells._12);
        AI();
        if (isFieldFull()) {
            alert("Field is full")
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }


    });
    cells._20.addEventListener('click', () => {

        insertXOrO(player, cells._20);
        AI();
        if (isFieldFull()) {
            alert("Field is full")
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }
    });
    cells._21.addEventListener('click', () => {

        insertXOrO(player, cells._21);
        AI();
        if (isFieldFull()) {
            alert("Field is full")
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }

    });
    cells._22.addEventListener('click', () => {

        insertXOrO(player, cells._22);
        AI();
        if (isFieldFull()) {
            alert("Field is full")
            return;
        }
        if (getWinner()) {
            alert("Winner is " + winner);
            return;
        }
    });



    /**
     * @param  {[type]}
     * @return {[Boolean]} true if cell is busy, false otherwise
     */
    function checkIfCellIsBusy(cell) {

        return document.getElementById('background' + cell.id) !== null ||
            document.getElementById('zero' + cell.id) !== null
    };


    function isFieldFull() {

        var value = 0;
        Object.values(cells).forEach(p => {
            var isBusy = checkIfCellIsBusy(p);
            if (isBusy) {
                value++;
            }
        })
        return Object.values(cells).length === value

    };

    function insertXOrO(player, cell) {
        if (typeof player === 'undefined') {
            alert("You didn't choose the side you wnat to play for")
            return false;
        }
        if (!checkIfCellIsBusy(cell)) {

            switch (player) {
                case 'undefined':
                    alert("You haven't choosen side you want to play for!!!");
                    return false;
                case 'X':
                    var div = document.createElement('div');
                    div.id = 'background' + cell.id;
                    div.classList.add("background");
                    var line1 = document.createElement('div');
                    line1.classList.add("line1");
                    var line2 = document.createElement('div');
                    line2.classList.add("line2");
                    div.appendChild(line1);
                    div.appendChild(line2);
                    cell.appendChild(div);
                    return true;
                case 'O':
                    var div = document.createElement('div');
                    div.id = 'zero' + cell.id
                    div.classList.add('zero')
                    cell.appendChild(div);
                    return true;
                default:
                    return false;

            }
        } else return false;

    };

    function getWinner() {

        var gameField = [

            [document.getElementById("_00"),
                document.getElementById("_01"),
                document.getElementById("_02")
            ],
            [document.getElementById("_10"),
                document.getElementById("_11"),
                document.getElementById("_12")
            ],
            [document.getElementById("_20"),
                document.getElementById("_21"),
                document.getElementById("_22")
            ]
        ]
        var isTicWinner =
            (gameField[0][0].querySelector("#background_00") !== null && gameField[0][1].querySelector("#background_01") !== null && gameField[0][2].querySelector("#background_02") !== null) ||
            (gameField[1][0].querySelector("#background_10") !== null && gameField[1][1].querySelector("#background_10") !== null && gameField[1][2].querySelector("#background_10") !== null) ||
            (gameField[2][0].querySelector("#background_20") !== null && gameField[2][1].querySelector("#background_21") !== null && gameField[2][2].querySelector("#background_22") !== null) ||

            (gameField[0][0].querySelector("#background_00") !== null && gameField[1][0].querySelector("#background_10") !== null && gameField[2][0].querySelector("#background_20") !== null) ||
            (gameField[0][1].querySelector("#background_01") !== null && gameField[1][1].querySelector("#background_11") !== null && gameField[2][1].querySelector("#background_21") !== null) ||
            (gameField[0][2].querySelector("#background_02") !== null && gameField[1][2].querySelector("#background_12") !== null && gameField[2][2].querySelector("#background_22") !== null) ||

            (gameField[0][0].querySelector("#background_00") !== null && gameField[1][1].querySelector("#background_11") !== null && gameField[2][2].querySelector("#background_22") !== null) ||
            (gameField[0][2].querySelector("#background_02") !== null && gameField[1][1].querySelector("#background_11") !== null && gameField[2][0].querySelector("#background_00") !== null)


        winner = isTicWinner ? 'X' : 'O'
        return isTicWinner;


    };

    function getCellByInt(id) {
        switch (id) {
            case 1:
                return cells._00;
            case 2:
                return cells._01;

            case 3:
                return cells._02;

            case 4:
                return cells._10;

            case 5:
                return cells._11;

            case 6:
                return cells._12;

            case 7:
                return cells._20;

            case 8:
                return cells._21;

            case 9:
                return cells._22;
        }
    };

    function AI() {
        if (typeof player === 'undefined') {
            return;
        }
        var AI = player === 'X' ? 'O' : 'X';
        var random_id;
        var cell;

        while (true) {
            random_id = Math.floor(Math.random() * 9 + 1);
            cell = getCellByInt(random_id);
            if (isFieldFull()) {
                break;
            }
            if (!insertXOrO(AI, cell)) {
                continue;
            } else {
                break;
            }
        }


    };





})()