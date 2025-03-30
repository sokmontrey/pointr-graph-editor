export class Point {
    constructor(public x: number, public y: number) {}

    add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    subtract(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }

    multiply(scalar: number): Point {
        return new Point(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number): Point {
        if (scalar === 0) throw new Error("Cannot divide by zero");
        return new Point(this.x / scalar, this.y / scalar);
    }

    distance(other: Point): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    absolute(): Point {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }

    static from(p: { x: number, y: number }): Point {
        return new Point(p.x, p.y);
    }
}

export const createPoint = (x: number, y: number): Point => new Point(x, y);

