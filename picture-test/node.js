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
        if (color === 'white') {
            return true;
        }
        else {
            if (needsToBeAccessible) {
                if (color === 'green') {
                    return true;
                }
                else if (color === 'red') {
                    return false;
                }
            }
            else {
                if (color === 'green') {
                    return false;
                }
                else if (color === 'red') {
                    return true;
                }
            }
        }

        return false;
    }

}