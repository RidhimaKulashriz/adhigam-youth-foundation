<script lang="ts">
	import { onMount, type ComponentType, createEventDispatcher } from 'svelte';
	import cn from 'clsx';
	import { useRect } from '$lib/lifecycle-functions/useRect';
	import { useWindowSize } from '$lib/lifecycle-functions/useWindowSize';
	import { useScroll } from '$lib/lifecycle-functions/useScroll';
	import { clamp, mapRange } from '$lib/utils/maths';
	import Card from '../Card.svelte';

	const BASE = '/asset';   // ✅ Local static folder

	const cards = [
		{ text: 'Hands on field exposure - Step in and be part of real stories of change.', image: `${BASE}/creative_learn1.webp` },
		{ text: 'Creative confidence - Use art, theatre, and play to help kids express themselves.', image: `${BASE}/creative_learn2.webp` },
		{ text: 'Lead & Learn - Discover your strengths, build new skills, and grow into a leader.', image: `${BASE}/creative_learn3.webp` },
		{ text: 'Be the change you wish to see.', image: `${BASE}/img3.webp` },
		{ text: 'Network of young energy - Be a part of a vibrant, energetic community.', image: `${BASE}/kathak2.webp` },
		{ text: 'Make a difference by volunteering with Adhigam.', image: `${BASE}/theater1.webp` },
		{ text: 'Join our community of changemakers.', image: `${BASE}/img1.webp` },
		{ text: 'Create lasting positive change in society.', image: `${BASE}/img2.webp` },
		{ text: 'Mentorship & Collaboration - Embark on your growth journey with experienced mentors.', image: `${BASE}/kathak1.webp` },

	];

	let AppearTitle: ComponentType;
	let containerRef: HTMLDivElement;
	let elementRef: HTMLDivElement;
	let current: number = -1;

	const emit = createEventDispatcher();
	const [windowSize] = useWindowSize();
	const [setRef, rect] = useRect();

	onMount(async () => {
		AppearTitle = (await import('../AppearTitle.svelte')).default;
		setRef(containerRef);
		emit('mounted');
	});

	useScroll(({ scroll }) => {
		if (!elementRef) return;
		const start = $rect.top - $windowSize.height * 2;
		const end = $rect.top + $rect.height - $windowSize.height;
		const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1);
		elementRef.style.setProperty('--progress', String(clamp(0, mapRange($rect.top, end, scroll, 0, 1), 1)));
		current = Math.floor(progress * 10);
	});
</script>

<div bind:this={containerRef} class="features">
	<div class="layout-block-inner sticky">
		<aside class="title">
			<p class="h3">
				<svelte:component this={AppearTitle}>
					Why Volunteer
					<br />
					<span class="grey">With Us?</span>
				</svelte:component>
			</p>
		</aside>
		<div bind:this={elementRef}>
			{#each cards as card, index (index)}
				<div class={cn('card', index <= current - 1 && 'current')} style="--i: {index}">
					<Card background="rgba(239, 239, 239, 0.8)" number={index + 1} text={card.text} image={card.image} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../styles/_functions';

	.features {
		height: 1600vh;
		@include desktop { min-height: desktop-vw(1310px); }
	}

	.card {
		--d: 100vh;
		position: absolute;
		will-change: transform;
		transition-duration: 1.2s;
		transition-property: opacity, transform;
		transition-timing-function: var(--ease-out-expo);

		@include mobile {
			@for $i from 0 through 8 {
				&:nth-child(#{$i + 1}) {
					top: calc( (((100 * var(--vh, 1vh)) - #{mobile-vw(520px)} - (var(--layout-margin))) / 8) * $i );
				}
			}
		}

		@include desktop {
			@for $i from 0 through 8 {
				&:nth-child(#{$i + 1}) {
					top: calc(((var(--d) - #{desktop-vw(520px)} - (2 * var(--layout-margin))) / 8) * $i);
					left: calc(((100vw - #{desktop-vw(520px)} - (2 * var(--layout-margin))) / 8) * $i);
				}
			}
		}

		&:not(.current) {
			transform: translate3d(100%, 100%, 0);
			opacity: 0;
		}
	}

	.title {
		text-align: end;
		padding-bottom: var(--layout-margin);
		@include desktop {
			padding: 0;
			position: absolute;
			right: var(--layout-margin);
		}
	}

	.sticky {
		overflow: hidden;
		position: sticky;
		top: 0;
		height: 100vh;
		padding: var(--layout-margin);
		> * { position: relative; }
	}
</style>