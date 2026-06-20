<script lang="ts">
	import type { ComponentType } from 'svelte';
	import cn from 'clsx';

	let className = '';

	export { className as class };
	export let number: number | undefined = undefined;
	export let text: string | ComponentType = '';
	export let image: string = '';
	export let inverted = false;
	export let background = 'rgba(14, 14, 14, 0.15)';
</script>

<div class={cn(className, 'wrapper', inverted && 'inverted')} style={`--background: ${background}`}>
	{#if image}
		<img src={image} alt="" class="card-image" />
	{/if}
	{#if number != undefined}
		<p class="number">{number.toString().padStart(2, '0')}</p>
	{/if}
	{#if text && typeof text === 'string'}
		<p class="text">{text}</p>
	{:else if text}
		<svelte:component this={text} />
	{/if}
</div>

<style lang="scss">
	@import '../styles/_functions';

	.wrapper {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		gap: mobile-vw(12px);
		color: var(--theme-secondary);
		border: 1px solid;
		padding: mobile-vw(24px);
		width: mobile-vw(343px);
		min-height: mobile-vw(440px);
		background-color: var(--background);
		backdrop-filter: blur(5px);

		&.inverted {
			color: var(--theme-primary);
			background-color: var(--theme-secondary);
		}

		@include desktop {
			width: columns(4);
			padding: desktop-vw(24px);
			gap: desktop-vw(12px);
			min-height: desktop-vw(440px);
		}

		.card-image {
			width: 100%;
			height: mobile-vw(180px);
			object-fit: cover;
			border-radius: 4px;

			@include desktop {
				height: desktop-vw(200px);
			}
		}

		.number {
			color: var(--theme-contrast);
			font-stretch: condensed;
			font-weight: 900;
			line-height: 86%;
			letter-spacing: -0.02em;
			font-size: mobile-vw(40px);

			@include desktop {
				font-size: desktop-vw(70px);
			}
		}

		.text {
			text-transform: uppercase;
			font-stretch: expanded;
			line-height: 100%;
			letter-spacing: -0.01em;
			font-size: mobile-vw(16px);

			@include desktop {
				font-size: desktop-vw(22px);
			}

			span {
				font-stretch: normal;
				font-weight: 600;
			}
		}
	}
</style>
