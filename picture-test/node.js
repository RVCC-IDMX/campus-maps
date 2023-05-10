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
    }

    //Return the F-cost for the node
    calcFCost() {
        return (this.gCost * (color == 'blue' ? 3 : 1)) + this.hCost;
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

}