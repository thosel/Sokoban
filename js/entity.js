class Entity {
    constructor() {
        this.positionX;
        this.positionY;
        this.directionX;
        this.directionY;
        this.elementType;
    }

    setPosition(x, y) {
        this.positionX = x;
        this.positionY = y;
    }

    setDirection(x, y) {
        this.directionX = x;
        this.directionY = y;
    }

    setElementType(elementType) {
        this.elementType = elementType;
    }

    updateToNewPosition(elementType) {
        this.setPosition(
            this.positionX + this.directionX, 
            this.positionY + this.directionY);

        this.elementType = elementType;
    }
}