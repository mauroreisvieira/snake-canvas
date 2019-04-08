class Snake {
    constructor() {
        this.px = this.py = 10;
        this.gs = this.tc = 20;
        this.ax = this.ay = 15;
        this.xv = this.yv = 0;
        this.trail = [];
        this.tail = 5;
        this.time = 1000/15;

        this.canvas = document.getElementById("snake");
        this.ctx = this.canvas.getContext('2d');

        this.game = this.game.bind(this);
        this.keyPush = this.keyPush.bind(this);
        this.start();
    }

    start() {
        setInterval(this.game, this.time);
        document.addEventListener("keydown", this.keyPush);
    }

    game() {
        this.px+= this.xv;
        this.py+= this.yv;

        if (this.px<0) {
            this.px = this.tc - 1;
        }

        if (this.px > this.tc - 1) {
            this.px = 0;
        }
        if (this.py <0) {
            this.py = this.tc - 1;
        }
        if (this.py > this.tc - 1) {
            this.py = 0;
        }

        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "lime";

        for(var i=0;i < this.trail.length;i++) {
            this.ctx.fillRect(this.trail[i].x * this.gs, this.trail[i].y * this.gs, this.gs - 2, this.gs - 2);
            if (this.trail[i].x == this.px && this.trail[i].y == this.py) {
                this.tail = 5;
            }
        }
        this.trail.push(
            {
                x: this.px,
                y: this.py
            }
        );

        while(this.trail.length > this.tail) {
            this.trail.shift();
        }

        if (this.ax == this.px && this.ay == this.py) {
            this.tail++;
            this.ax = Math.floor(Math.random() * this.tc);
            this.ay = Math.floor(Math.random() * this.tc);
        }
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.ax * this.gs, this.ay * this.gs, this.gs - 2, this.gs - 2);
        requestAnimationFrame(this.game);
    }

    keyPush(evt) {
        switch(evt.keyCode) {
            case 37:
                this.xv= -1;
                this.yv = 0;
            break;
            case 38:
                this.xv = 0;
                this.yv = -1;
            break;
            case 39:
                this.xv = 1;
                this.yv = 0;
            break;
            case 40:
                this.xv= 0 ;
                this.yv= 1 ;
            break;
        }
    }
}

new Snake();
