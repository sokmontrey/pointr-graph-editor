import {Vec2} from "./vector.ts";

export class Segment {
    constructor(
        public from: Vec2,
        public to: Vec2,
    ) {}

    isHovered(mousePos: Vec2, radius: number): boolean {
        const line = this.to.subtract(this.from);
        const mouseVector = mousePos.subtract(this.from);
        const lineLength = line.distance(Vec2.fromNumber(0));
        const dotProduct = mouseVector.x * line.x + mouseVector.y * line.y;
        const projection = dotProduct / (lineLength * lineLength);
        if (projection < 0) {
            return mousePos.distance(this.from) <= radius;
        } else if (projection > 1) {
            return mousePos.distance(this.to) <= radius;
        }
        const closestPoint = this.from.add(line.multiply(projection));
        return mousePos.distance(closestPoint) <= radius;
    }
}