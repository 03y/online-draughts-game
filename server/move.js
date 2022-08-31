class Move {
    constructor(old_pos, new_pos, hop) {
        this.old_pos = old_pos; // original piece position (array of two integers x and y)
        this.new_pos = new_pos; // new piece position (array of two integers x and y)
        this.hop = hop; // position of the piece that is hopped (array of two integers x and y), if any
    }

    get getOldPos() {
        return this.old_pos;
    }

    get getNewPos() {
        return this.new_pos;
    }

    get getHop() {
        return this.hop;
    }

    toJSON() {
        return {
            old_pos: this.old_pos,
            new_pos: this.new_pos,
            hop: this.hop
        };
    }

    toString() {
        let str = '';
        str += this.old_pos[0] + ',' + this.old_pos[1] + ', -> ' + this.new_pos[0] + ',' + this.new_pos[1];
        if (this.hop) {
            str += ' and hop ' + this.hop[0] + ',' + this.hop[1];
        }
        return str;
    }

    toPrettyString() {
        let str = '';
        if (this.hop) {
            str += 'Piece (' + this.old_pos + ') can move to (' + this.new_pos + ') and hop (' + this.hop + ').';
        } else {
            str += 'Piece (' + this.old_pos + ') can move to (' + this.new_pos + ').';
        }
        return str;
    }
}

export default Move;
