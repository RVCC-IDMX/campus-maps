class Node {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.visted = false;
        this.previousNode = null;

        //Might need these, may remove later
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
    }

    isAccessible(needsToBeAccessible) {
        if (this.color === 'white') {
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