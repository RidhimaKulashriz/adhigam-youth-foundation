<script lang="ts">
	import cn from 'clsx';

	let className = '';

	export { className as class };
	export let isLoaded = false;
	export let isIntro = false;
	export let fill = '';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 1360 336"
	class={cn('ei', className)}
>
	<g {fill}>
		<!-- ✅ Small subtitle text -->
		<text
			class={cn(isIntro && 'start', isLoaded && 'show')}
			style="--index: 2"
			x="50%"
			y="65%"
			text-anchor="middle"
			dominant-baseline="central"
			fill="#a0aec0"
			font-family="'Montserrat', 'Helvetica Neue', sans-serif"
			font-size="clamp(14px, 1.5vw, 24px)"
			font-weight="300"
			letter-spacing="8"
		>
			Youth Foundation
		</text>
	</g>
</svg>

<style lang="scss">
	$intro-in: 1500ms;

	.start {
		transform: translate3d(0, calc(var(--index) * 5% + 100%), 0);
	}

	.show {
		transition: transform $intro-in var(--ease-out-expo);
		transition-delay: calc(var(--index) * 75ms);
		transform: translate3d(0, 0, 0);
	}
</style>