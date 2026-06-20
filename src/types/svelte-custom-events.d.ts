declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:intersecting'?: (e: Event) => void;
	}
}
