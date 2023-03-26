export namespace Shapes {
    export namespace Polygons {
      export class Triangle {}
      export class Square {}
    }
}


declare namespace D3 {
    export interface Selectors {
      select: {
        (selector: string): void;
        (element: Event): void;
      };
    }
    export interface Event {
      x: number;
      y: number;
    }
    export interface Base extends Selectors {
      event: Event;
    }
}
declare var d3: D3.Base;

export { d3 };
