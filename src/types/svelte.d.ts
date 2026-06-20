declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:intersecting'?: (event: CustomEvent) => void;
	}
}
