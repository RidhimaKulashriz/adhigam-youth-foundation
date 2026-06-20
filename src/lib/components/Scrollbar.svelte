<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { useScroll } from '$lib/lifecycle-functions/useScroll';
	import { clamp, mapRange } from '$lib/utils/maths';

	// ✅ Register ScrollTrigger
	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	export let showText = true;
	export let textPosition: 'left' | 'right' = 'right';
	
	let progress = 0;
	let isVisible = false;
	let scrollbarRef: HTMLDivElement;
	let progressRef: HTMLDivElement;
	let textRef: HTMLDivElement;

	// ✅ ONLY CHANGE: "LENIS" → "Adhigam"
	const logoText = 'Adhigam';

	const scrollTexts = {
		start: 'scroll-start',
		end: 'scroll-end',
		year: `© ${new Date().getFullYear()}`
	};

	useScroll(({ scroll, limit }) => {
		if (!progressRef) return;
		progress = clamp(0, scroll / limit, 1);
		progressRef.style.transform = `scaleY(${progress})`;
		
		if (textRef) {
			const textProgress = mapRange(0, 1, progress, 0, 1);
			textRef.style.opacity = String(textProgress);
			textRef.style.transform = `translateX(${mapRange(0, 1, textProgress, 20, 0)}px)`;
		}
	});

	onMount(() => {
		isVisible = true;
		
		gsap.from(scrollbarRef, {
			opacity: 0,
			x: 20,
			duration: 0.8,
			ease: 'power3.out',
			delay: 0.5
		});
	});
</script>

<div class="scrollbar-wrapper" bind:this={scrollbarRef} class:visible={isVisible}>
	<!-- ✅ ONLY CHANGE: "LENIS" → "Adhigam" -->
	<div class="scrollbar-top">
		<span class="top-text">{logoText}</span>
	</div>

	<div class="scrollbar-track">
		<div class="scrollbar-progress" bind:this={progressRef}></div>
	</div>

	<div class="scrollbar-bottom" bind:this={textRef}>
		<span class="bottom-text">{scrollTexts.end}</span>
	</div>

	<div class="scrollbar-year">
		<span>{scrollTexts.year}</span>
	</div>
</div>

<style>
	.scrollbar-wrapper {
		position: fixed;
		right: 2rem;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		z-index: 999;
		opacity: 0;
		transition: opacity 0.8s ease;
		user-select: none;
	}

	.scrollbar-wrapper.visible {
		opacity: 1;
	}

	.scrollbar-top {
		writing-mode: vertical-rl;
		letter-spacing: 0.1em;
		font-size: 0.75rem;
		font-weight: 500;
		color: #1a365d;
		text-transform: uppercase;
		opacity: 0.6;
		transition: opacity 0.3s ease;
		white-space: nowrap;
	}

	.scrollbar-top:hover {
		opacity: 1;
	}

	.scrollbar-track {
		width: 2px;
		height: 120px;
		background: rgba(26, 54, 93, 0.15);
		border-radius: 2px;
		position: relative;
		overflow: hidden;
	}

	.scrollbar-progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, #1a365d, #ed8936);
		border-radius: 2px;
		transform-origin: top;
		transform: scaleY(0);
		transition: transform 0.1s ease;
	}

	.scrollbar-bottom {
		writing-mode: vertical-rl;
		letter-spacing: 0.1em;
		font-size: 0.75rem;
		font-weight: 500;
		color: #ed8936;
		text-transform: uppercase;
		white-space: nowrap;
		opacity: 0;
		transform: translateX(20px);
		transition: opacity 0.5s ease, transform 0.5s ease;
	}

	.scrollbar-year {
		writing-mode: vertical-rl;
		font-size: 0.6rem;
		color: #a0aec0;
		letter-spacing: 0.05em;
		margin-top: 0.5rem;
		opacity: 0.5;
	}

	@media (max-width: 1024px) {
		.scrollbar-wrapper {
			right: 1.5rem;
		}

		.scrollbar-track {
			height: 80px;
		}
	}

	@media (max-width: 768px) {
		.scrollbar-wrapper {
			right: 0.75rem;
			gap: 0.5rem;
		}

		.scrollbar-top,
		.scrollbar-bottom {
			font-size: 0.6rem;
		}

		.scrollbar-track {
			height: 60px;
			width: 1.5px;
		}

		.scrollbar-year {
			font-size: 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.scrollbar-wrapper {
			right: 0.5rem;
		}

		.scrollbar-track {
			height: 40px;
		}

		.scrollbar-top,
		.scrollbar-bottom {
			font-size: 0.5rem;
		}
	}
</style>