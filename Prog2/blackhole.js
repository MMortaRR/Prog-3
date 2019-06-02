class BlackHole extends livingcreator{
    constructor(x, y) {
        super(x,y)
        this.energy = 2;
        this.directions = [];
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords1 = this.getDirections(3);
        var fundCords2 = this.getDirections(2);
        var fundCords = fundCords1.concat(fundCords2);
        var cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            var c = matrix[y][x];

            if (c == 2) {
                for (var i in eatArr) {
                    if (x == eatArr[i].x && y == eatArr[i].y) {
                        eatArr.splice(i, 1);
                    }
                }
            } else if (c == 3) {
                for (var i in preArr) {
                    if (x == preArr[i].x && y == preArr[i].y) {
                        preArr.splice(i, 1);
                    }
                }
            }
            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 4;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ grassArr


            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 5) {
                this.mul()
                this.multiply = 0;
            }


        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            //ստեղծում է նոր օբյեկտ (այստեղ սև անցք) 
            //և տեղադրում է այն սև անցքերի զանգվածի մեջ
            var newHole = new BlackHole(x, y);
            holeArr.push(newHole);

            //հիմնական matrix-ում կատարում է գրառում նոր սև անցքի մասին
            matrix[y][x] = 4;
            this.multiply = 0;
        }
    }
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in holeArr) {
            if (this.x == holeArr[i].x && this.y == holeArr[i].y) {
                holeArr.splice(i, 1);
            }
        }
    }
}