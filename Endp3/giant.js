
class Giant extends livingcreator {
    constructor(x, y) {
        super(x,y)
        this.multiply = 0;
        this.directions = [];
    }
    newDirections() {
        this.directions = [
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3]
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
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords1 = this.getDirections(0);
        var fundCords2 = this.getDirections(1);
        var fundCords = fundCords1.concat(fundCords2);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            var c = matrix[y][x];
            //կատարում է տեղափոխություն հիմնական matrix-ում 
            if (c == 0) {
                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;
            } else if (c == 1) {
                matrix[y][x] = 5;
                matrix[this.y][this.x] = 1;
            }

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;

        }
    }
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords1 = this.getDirections(3);
        var fundCords2 = this.getDirections(2);
        var fundCords4 = this.getDirections(4);
        var fundCords = fundCords1.concat(fundCords2, fundCords4);

        var cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            var c = matrix[y][x];
            if (c == 3) {
                for (const i in preArr) {
                    if (preArr[i].x == x && preArr[i].y == y) {
                        preArr.slice(i, 1)
                    }
                }
            }
            else if (c == 2) {
                for (const i in eatArr) {
                    if (eatArr[i].x == x && eatArr[i].y == y) {
                        eatArr.slice(i, 1)
                    }
                }
            } else if (c == 4) {
                for (const i in holeArr) {
                    if (holeArr[i].x == x && holeArr[i].y == y) {
                        holeArr.slice(i, 1)
                    }
                }
            }

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ grassArr


            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
                this.die();
            }
        }
    }
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            //ստեղծում է նոր օբյեկտ (այստեղ հսկա) 
            //և տեղադրում է այն հսկաների զանգվածի մեջ
            var newGiant = new Giant(x, y);
            giantArr.push(newGiant);

            //հիմնական matrix-ում կատարում է գրառում նոր հսկայի մասին
            matrix[y][x] = 5;
            this.multiply = 0;
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն հսկաների զանգվածից
        for (var i in giantArr) {
            if (this.x == giantArr[i].x && this.y == giantArr[i].y) {
                giantArr.splice(i, 1);
            }
        }
    }

}