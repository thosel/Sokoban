class Sokoban {
    constructor(containerElement, tileMap) {
        this.containerElement = containerElement;

        this.player = new Entity();

        this.drawTileMap(tileMap);
    }

    drawTileMap(tileMap) {
        for (let row = 0; row < tileMap.height; row++) {
            let rowDivElement = document.createElement('div');
            rowDivElement.classList.add('tile-row');

            for (let column = 0; column < tileMap.width; column++) {
                let columnDivElement = document.createElement('div');

                columnDivElement.appendChild(document.createTextNode(tileMap.mapGrid[row][column]));
                columnDivElement.classList.add('tile');

                switch (tileMap.mapGrid[row][column].toString()) {
                    case 'W':
                        columnDivElement.classList.add(Tiles.wall);
                        break;
                    case 'B':
                        columnDivElement.classList.add(Entities.block);
                        break;
                    case 'P':
                        this.player.setPosition(column, row);
                        this.player.setElementType(Entities.player);
                        columnDivElement.classList.add(Entities.player);
                        break;
                    case 'G':
                        columnDivElement.classList.add(Tiles.goal);
                        break;
                    default:
                        columnDivElement.classList.add(Tiles.space);
                        break;
                }

                columnDivElement.setAttribute('id', `x${column}y${row}`);
                rowDivElement.appendChild(columnDivElement);
            }
            this.containerElement.appendChild(rowDivElement);
        }
    }

    moveBlock() {
        let block = new Entity();
        block.setDirection(this.player.directionX, this.player.directionY);
        block.setPosition(
            this.player.positionX + block.directionX,
            this.player.positionY + block.directionY);
        block.setElementType(this.getElementTypeAtPosition(block.positionX, block.positionY));

        this.setElementTypeAtPosition(
            block.positionX,
            block.positionY,
            block.elementType === Entities.block ? Tiles.space : Tiles.goal);

        switch (this.getElementTypeAtPosition(
            block.positionX + block.directionX,
            block.positionY + block.directionY)) {
            case Tiles.space:
                block.updateToNewPosition(Entities.block);
                break;
            case Tiles.goal:
                block.updateToNewPosition(Entities.blockMatch);
                break;
            default:
                break;
        }

        this.setElementTypeAtPosition(
            block.positionX,
            block.positionY,
            block.elementType);
    }

    movePlayer(x, y) {
        this.player.setDirection(x, y);

        if (this.isPlayerMovableToPosition(
            this.player.positionX + this.player.directionX,
            this.player.positionY + this.player.directionY)) {

            this.setElementTypeAtPosition(
                this.player.positionX,
                this.player.positionY,
                this.player.elementType === Entities.player ? Tiles.space : Tiles.goal);

            switch (this.getElementTypeAtPosition(
                this.player.positionX + this.player.directionX,
                this.player.positionY + this.player.directionY)) {
                case Entities.block:
                    this.moveBlock();
                    this.player.updateToNewPosition(Entities.player);
                    break;
                case Entities.blockMatch:
                    this.moveBlock();
                    this.player.updateToNewPosition(Entities.playerGoalPosition);
                    break;
                case Tiles.space:
                    this.player.updateToNewPosition(Entities.player);
                    break;
                case Tiles.goal:
                    this.player.updateToNewPosition(Entities.playerGoalPosition);
                    break;
                default:
                    break;
            }

            this.setElementTypeAtPosition(
                this.player.positionX,
                this.player.positionY,
                this.player.elementType);
        }
    }

    setElementTypeAtPosition(x, y, elementType) {
        let element = document.querySelector(`#x${x}y${y}`);

        element.setAttribute('class', `tile ${elementType}`);
    }

    isPlayerMovableToPosition() {
        let isPlayerMovable;

        switch (this.getElementTypeAtPosition(this.player.positionX + this.player.directionX, this.player.positionY + this.player.directionY)) {
            case Entities.block:
            case Entities.blockMatch:
                if (this.isBlockMovableToPosition(this.player.positionX + this.player.directionX + this.player.directionX, this.player.positionY + this.player.directionY + this.player.directionY)) {
                    isPlayerMovable = true;
                }
                break;
            case Tiles.space:
            case Tiles.goal:
                isPlayerMovable = true;
                break;
            default:
                isPlayerMovable = false;
                break;
        }

        return isPlayerMovable;
    }

    isBlockMovableToPosition(x, y) {
        let isBlockMovable;

        switch (this.getElementTypeAtPosition(x, y)) {
            case Tiles.space:
            case Tiles.goal:
                isBlockMovable = true;
                break;
            default:
                isBlockMovable = false;
                break;
        }

        return isBlockMovable;
    }

    getElementTypeAtPosition(x, y) {
        let elementType;

        for (var property in Tiles) {
            if (Tiles.hasOwnProperty(property)) {
                if (document.querySelector(`#x${x}y${y}`).classList.contains(Tiles[property])) {
                    elementType = Tiles[property];
                }
            }
        }

        for (var property in Entities) {
            if (Entities.hasOwnProperty(property)) {
                if (document.querySelector(`#x${x}y${y}`).classList.contains(Entities[property])) {
                    elementType = Entities[property];
                }
            }
        }

        return elementType;
    }
}