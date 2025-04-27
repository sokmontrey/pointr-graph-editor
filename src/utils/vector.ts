export const createVec2 = (x: number, y: number): Vec2 => new Vec2(x, y);

export class Vec2 {
    constructor(public x: number, public y: number) {}

    add(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    multiply(scalar: number): Vec2 {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number): Vec2 {
        if (scalar === 0) throw new Error("Cannot divide by zero");
        return new Vec2(this.x / scalar, this.y / scalar);
    }

    distance(other: Vec2): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    absolute(): Vec2 {
        return new Vec2(Math.abs(this.x), Math.abs(this.y));
    }

    static from(p: { x: number, y: number }): Vec2 {
        return new Vec2(p.x, p.y);
    }

    round(gap: number) {
        return new Vec2(
            Math.round(this.x / gap) * gap,
            Math.round(this.y / gap) * gap,
        );
    }

    static fromNumber(number: number) {
        return new Vec2(number, number);
    }
}