class Node {
    constructor(x, y, color, metaData) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.visted = false;
        this.previousNode = null;

        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;

        this.metaData = metaData;

        this.hasTeleport = false;

        this.tryCount = 0;
        this.tryCountValue = this.color == 'blue' ? 3 : 2;
    }

    //Return the F-cost for the node
    calcFCost() {

        let mod = 1;
        if (this.color == 'blue') {
            mod = .33;
            console.log('blue node');
        }

        return (this.gCost + this.hCost) * mod;
    }

    //Returns whether this node is avalible
    isAccessible(needsToBeAccessible) {
        if (this.color === 'white' || this.color === 'orange' || this.color === 'blue') {
            return true;
        }
        else {
            if (needsToBeAccessible) {
                if (this.color === 'green') {
                    return true;
                }
                else if (this.color === 'red') {
                    return false;
                }
            }
            else {
                if (this.color === 'green') {
                    return false;
                }
                else if (this.color === 'red') {
                    return true;
                }
            }
        }

        return false;
    }

    // for Dijkstra's
    isValid() {
        // this.tryCount++;

        // if (this.tryCount >= this.tryCountValue) {
        //     this.tryCount = 0;
        //     return true;
        // }
        // else {
        //     return false;
        // }

        return true;
    }

}