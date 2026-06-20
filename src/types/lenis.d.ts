declare module '@studio-freight/lenis' {
	export default class Lenis {
		constructor(options?: any);
		raf(time: number): void;
		scrollTo(target: any, options?: any): void;
		start(): void;
		stop(): void;
		destroy(): void;
		limit?: number;
	}
}
