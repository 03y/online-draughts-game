class Move {
    constructor(old_pos, new_pos, hops) {
        this.old_pos = old_pos; // original piece position (array of two integers x and y)
        this.new_pos = new_pos; // new piece position (array of two integers x and y)
        this.hops = hops; // position of the pieces that are hopped (array of arrays containg x & y), if any
    }

    get getOldPos() {
        return this.old_pos;
    }

    get getNewPos() {
        return this.new_pos;
    }

    get getHops() {
        return this.hops;
    }

    toJSON() {
        return {
            old_pos: this.old_pos,
            new_pos: this.new_pos,
            hop: this.hops
        };
    }

    toString() {
        let str = '';
        if (this.hops) {
            str += 'Piece (' + this.old_pos[0] + ', ' + this.old_pos[1] + ') can move to (' + this.new_pos[0] + ', ' + this.new_pos[1] + ')';
            str += ' by hopping over ';
            if (this.hops.length === 1) {
                str += 'piece (' + this.hops[0][0] + ', ' + this.hops[0][1] + ')';
            } else {
                for (let i = 0; i < this.hops.length; i++) {
                    str += 'piece (' + this.hops[i][0] + ', ' + this.hops[i][1] + ')';
                    if (i < this.hops.length - 1) {
                        str += ' and ';
                    }
                }
            }
        } else {
            str += 'Piece (' + this.old_pos[0] + ', ' + this.old_pos[1] + ') can move to (' + this.new_pos[0] + ', ' + this.new_pos[1] + ')';
        }
        return str;
    }

    equals(move) {
        return JSON.stringify(this.toJSON()) === JSON.stringify(move.toJSON());
    }
}

export default Move;
