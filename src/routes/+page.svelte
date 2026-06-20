<script lang="ts">
	import { onMount, type ComponentType } from 'svelte';
	import cn from 'clsx';

	import { lenisStore as lenis } from '$lib/stores/lenis';
	import { introOutStore } from '$lib/stores/introOut';
	import { addThreshold } from '$lib/stores/thresholds';
	import { setThemeStore, themeStore } from '$lib/stores/theme';
	import {
		homePageLoadedComponentsStore,
		setHomePageLoadedComponentsStore
	} from '$lib/stores/homePageLoadedComponents';

	import { intersection } from '$lib/actions/intersection';
	import { useRect } from '$lib/lifecycle-functions/useRect';
	import { useWindowSize } from '$lib/lifecycle-functions/useWindowSize';
	import { useScroll } from '$lib/lifecycle-functions/useScroll';
	import { clamp, mapRange } from '$lib/utils/maths';
	import { dynamicImport } from '$lib/utils/dynamicImport';

	import { projects } from '$lib/content/projects';

	import Link from '$lib/components/Link.svelte';
	import Button from '$lib/components/Button.svelte';
	import Hand from '$lib/components/Hand/index.svelte';
	import Title from '$lib/components/Title.svelte';
	import HeroTextIn from '$lib/components/HeroTextIn.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Card from '$lib/components/Card.svelte';

	const BASE = '/asset';

	let AppearTitle: ComponentType;
	let SFDR: ComponentType;
	let GitHub: ComponentType;
	let Parallax: ComponentType;
	let HorizontalSlides: ComponentType;
	let FeatureCards: ComponentType;

	let hasScrolled = false;
	let visible = false;

	const [size] = useWindowSize();
	const [setZoomWrapperRectRef, zoomWrapperRect] = useRect();
	const [setWhyRectRef, whyRect] = useRect();
	const [setWhiteRectRef, whiteRect] = useRect();
	const [setFeaturesRectRef, featuresRect] = useRect();
	const [setInuseRectRef, inuseRect] = useRect();

	let zoomWrapperRef: HTMLElement;
	let whyRef: HTMLElement;
	let whiteRectRef: HTMLElement;
	let featuresRectRef: HTMLElement;
	let inuseRectRef: HTMLElement;

	$: if (Object.keys($homePageLoadedComponentsStore).length === 4) {
		setRectRefs();
		setTimeout(() => { updateThresholds(); }, 800);
	}

	onMount(async () => {
		SFDR = (await import('../lib/components/Icons/Sfdr.svelte')).default;
		GitHub = (await import('../lib/components/Icons/Github.svelte')).default;
		AppearTitle = await dynamicImport('AppearTitle', import('../lib/components/AppearTitle.svelte'));
		HorizontalSlides = await dynamicImport('HorizontalSlides', import('../lib/components/HorizontalSlides.svelte'));
		Parallax = await dynamicImport('Parallax', import('../lib/components/Parallax.svelte'));
		FeatureCards = await dynamicImport('Parallax', import('../lib/components/FeatureCards/FeatureCards.svelte'));
	});

	useScroll(({ scroll }) => {
		hasScrolled = scroll > 10;
		if (!zoomWrapperRef) return;

		const start = $zoomWrapperRect.top + $size.height * 0.5;
		const end = $zoomWrapperRect.top + $zoomWrapperRect.height - $size.height;
		const center = 0.6;
		const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1);
		const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1);
		const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1);

		const theme = progress2 === 1 ? 'light' : 'dark';
		if (theme !== $themeStore) setThemeStore(theme);

		zoomWrapperRef.style.setProperty('--progress1', String(progress1));
		zoomWrapperRef.style.setProperty('--progress2', String(progress2));

		if (progress === 1) {
			zoomWrapperRef.style.setProperty('background-color', 'currentColor');
		} else {
			zoomWrapperRef.style.removeProperty('background-color');
		}
	});

	function setRectRefs() {
		setZoomWrapperRectRef(zoomWrapperRef);
		setWhyRectRef(whyRef);
		setWhiteRectRef(whiteRectRef);
		setFeaturesRectRef(featuresRectRef);
		setInuseRectRef(inuseRectRef);
	}

	function updateThresholds() {
		addThreshold({ id: 'top', value: 0 });
		const top1 = $whyRect.top - $size.height / 2;
		addThreshold({ id: 'why-start', value: top1 });
		addThreshold({ id: 'why-end', value: top1 + $whyRect.height });
		const top3 = $whiteRect.top - $size.height;
		addThreshold({ id: 'light-start', value: top3 });
		const top4 = $featuresRect.top;
		addThreshold({ id: 'features', value: top4 });
		const top5 = inuseRectRef.getBoundingClientRect().top;
		addThreshold({ id: 'in-use', value: top5 });
		const top6 = $lenis?.limit;
		addThreshold({ id: 'end', value: top6! });
	}
</script>

<div class="canvas">
	<Hand />
</div>

<!-- HERO -->
<section class="hero">
	<div class="layout-grid-inner">
		<Title class="title" />
		<span class="sub">
			<HeroTextIn>
				<h2 class="h3 subtitle">Empowering Communities</h2>
			</HeroTextIn>
			<HeroTextIn>
				<h2 class="p-xs tm">
					<span>©</span>
					{new Date().getFullYear()} Adhigam Youth Foundation
				</h2>
			</HeroTextIn>
		</span>
	</div>

	<div class="bottom layout-grid">
		<div class={cn('hide-on-mobile', 'scroll-hint', hasScrolled && 'hide', $introOutStore && 'show')}>
			<div class="text">
				<HeroTextIn><p>scroll</p></HeroTextIn>
				<HeroTextIn><p>to explore</p></HeroTextIn>
			</div>
		</div>
		<h1 class="description p-s">
			<HeroTextIn><p class="p-s">Building self-reliant, forward-thinking</p></HeroTextIn>
			<HeroTextIn><p class="p-s">communities through education,</p></HeroTextIn>
			<HeroTextIn><p class="p-s">awareness, and skill development</p></HeroTextIn>
		</h1>
		<Button
			class={cn('cta', $introOutStore && 'in')}
			arrow={true}
			icon={GitHub}
			href="https://adhigam-youth-foundation.vercel.app"
		>
			Learn about us
		</Button>
	</div>
</section>

<!-- ABOUT -->
<section class="why" data-lenis-scroll-snap-align="start">
	<div class="layout-grid">
		<h2 class="sticky h2">
			<svelte:component this={AppearTitle}>About Adhigam</svelte:component>
		</h2>
		<aside class="features" bind:this={whyRef}>
			<div class="feature">
				<p class="p">
					We envision a community that is empowered, self-sustaining, and resilient—thriving through
					its own resources and ingenuity. By nurturing independence and long-term growth, we aim to
					inspire individuals to take ownership of their futures and become catalysts for enduring,
					positive transformation.
				</p>
			</div>
			<div class="feature">
				<h3 class="title h4">Our Mission</h3>
				<p class="p">
					To cultivate a self-reliant, forward-thinking community by equipping individuals with the
					tools, knowledge, and support needed to fuel sustainable growth. We champion resilience,
					spark innovation, and foster collaborative spirit.
				</p>
			</div>
			<div class="feature">
				<h3 class="title h4">Our Values</h3>
				<p class="p">
					Integrity, Transparency, Accountability, Sustainability, Inclusivity, Compassion, Empathy,
					and Trust guide everything we do.
				</p>
			</div>
			<div class="feature">
				<h3 class="title h4">Rooted in Community</h3>
				<p class="p">
					We work alongside families, local leaders, and educators to build programs that reflect the
					needs and strengths of each community we serve — ensuring lasting, grassroots impact.
				</p>
			</div>
		</aside>
	</div>
</section>

<!-- APPROACH -->
<section class="rethink">
	<div class="layout-grid pre">
		<div class="highlight" data-lenis-scroll-snap-align="start">
			<svelte:component
				this={Parallax}
				speed={-0.5}
				on:mounted={() => setHomePageLoadedComponentsStore('Parallax')}
			>
				<p class="h2">
					<AppearTitle>Our Approach</AppearTitle>
				</p>
			</svelte:component>
		</div>
		<div class="comparison">
			<svelte:component this={Parallax} speed={0.5}>
				<p class="p">
					Traditional education often fails to ignite curiosity or build real-world skills. We
					believe in learning that is immersive, joyful, and purposeful. Through creative arts,
					hands-on activities, and community engagement, we nurture confident, capable young minds
					ready to shape their own futures.
				</p>
			</svelte:component>
		</div>
	</div>

</section>

<!-- SOLUTION -->
<section bind:this={zoomWrapperRef} class="solution">
	<div class="inner">
		<div class="zoom">
			<h2 class="first h1 vh">
				so we built <br />
				<span class="contrast">a movement</span>
			</h2>
			<h2 class="enter h3 vh">
				Enter <br /> Adhigam
			</h2>
			<h2 class="second h1 vh">From potential to power</h2>
		</div>
	</div>
</section>

<!-- FEATURING -->
<section class="theme-light featuring" bind:this={whiteRectRef}>
	<div class="inner">

		<div class="feat-label layout-block">
			<span class="feat-tag p-xs">Who We Are</span>
		</div>

		<div class="layout-block intro">
			<p class="p-l">
				Adhigam Youth Foundation is a{' '}
				<Link class="contrast semi-bold" href="https://adhigam-youth-foundation.vercel.app">
					non-profit organisation
				</Link>{' '}
				dedicated to empowering children and young people through creative education, art, and skill
				development — building confidence, capability, and community from the ground up.
			</p>
		</div>

		<div class="pillars layout-block">
			<div class="pillar">
				<span class="pillar-num p-xs">01</span>
				<h3 class="pillar-title h4">Creative Education</h3>
				<p class="p-s pillar-body">Art, theatre, and play as tools for learning — not just subjects.</p>
			</div>
			<div class="pillar">
				<span class="pillar-num p-xs">02</span>
				<h3 class="pillar-title h4">Skill Development</h3>
				<p class="p-s pillar-body">Equipping youth with real-world skills that open doors to opportunity.</p>
			</div>
			<div class="pillar">
				<span class="pillar-num p-xs">03</span>
				<h3 class="pillar-title h4">Community Building</h3>
				<p class="p-s pillar-body">Grassroots programs rooted in trust, empathy, and local leadership.</p>
			</div>
		</div>

	</div>

	<section bind:this={featuresRectRef}>
		<svelte:component
			this={FeatureCards}
			on:mounted={() => setHomePageLoadedComponentsStore('FeatureCards')}
		/>
	</section>
</section>

<!-- PROGRAMS -->
<section
	bind:this={inuseRectRef}
	class={cn('theme-light', 'in-use', visible && 'visible')}
	use:intersection={{ threshold: 0.2 }}
	on:intersecting={() => { visible = true; }}
>
	<div class="layout-grid">
		<aside class="title">
			<p class="h3">
				<svelte:component
					this={AppearTitle}
					on:mounted={() => setHomePageLoadedComponentsStore('AppearTitle')}
				>Our <br /><span class="grey">programs</span></svelte:component>
			</p>
		</aside>
		<ul class="list">
			{#each projects as { title, source, href }, i (title)}
				<li>
					<ListItem {title} {source} {href} index={i} {visible} />
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	@import '../lib/styles/_functions';

	.canvas {
		position: fixed;
		top: 0; left: 0; bottom: 0; right: 0;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 50%;
			height: 100vw;
			width: 200vw;
			background: radial-gradient(var(--pink), var(--pink-transparent) 70%);
			transform: translateX(-50%) translateY(50vh);
			opacity: 0.5;
		}
	}

	$delay-intro-bottom: 150ms;
	$delay-intro-top: 450ms;
	$intro-duration: 2050ms;

	/* ── HERO ── */
	.hero {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: calc(100 * var(--vh));
		margin-bottom: mobile-vw(160px);
		position: relative;

		@include mobile {
			padding-bottom: mobile-vw(16px);
			> div { grid-gap: mobile-vw(11px); }
		}
		@include desktop {
			height: 100vh;
			margin-bottom: desktop-vw(320px);
		}

		:global(.title) {
			grid-column: 1 / -1;
			margin-top: mobile-vw(30px);
			width: var(--layout-width);
			@include mobile { height: mobile-vw(85px); }
			@include desktop {
				margin-top: desktop-vw(30px);
				position: absolute;
				top: 0;
				left: 2.5%;
			}
		}

		:global(.icon-hero) {
			width: mobile-vw(44px);
			height: mobile-vw(39px);
			@include desktop {
				position: relative;
				top: desktop-vw(395px);
				width: desktop-vw(44px);
				height: desktop-vw(39px);
				transform: translate3d(0, 100%, 0);
				opacity: 0;
			}
		}

		:global(.icon-hero.show) {
			@include desktop {
				transition: transform $intro-duration var(--ease-out-expo), opacity $intro-duration var(--ease-out-expo);
				transition-delay: $delay-intro-top;
				opacity: 1;
				transform: translate3d(0, 0, 0);
			}
		}

		.sub {
			display: flex;
			flex-direction: column;
			text-align: end;
			grid-column: 2 / -1;

			@include desktop {
				position: relative;
				top: desktop-vw(395px);
				grid-column: 6 / span 7;
			}

			:global(h2) { color: #ffffff; }
			:global(.subtitle) {
				color: #ed8936;
				margin-bottom: mobile-vw(8px);
				@include desktop { margin-bottom: desktop-vw(12px); }
			}
			:global(.tm) { color: var(--grey); }
		}

		.sub :global(.tm span) { vertical-align: text-top; }

		.bottom {
			width: 100%;
			overflow: hidden;
			@include desktop { padding-bottom: desktop-vw(40px); }

			.scroll-hint {
				position: relative;
				grid-column: 1 / span 2;
				transition: opacity 0.6s var(--ease-in-out-quad), transform 0.6s var(--ease-in-out-quad);

				.text {
					font-family: var(--font-primary);
					font-weight: 900;
					text-transform: uppercase;
					font-stretch: condensed;
					line-height: 100%;
					letter-spacing: -0.01em;
					@include desktop { padding-left: desktop-vw(16px); font-size: desktop-vw(24px); }
				}

				&::before {
					content: '';
					position: absolute;
					left: 0; top: 0;
					height: 100%;
					width: desktop-vw(2px);
					background-color: var(--pink);
					animation: scale 4s infinite;
					animation-play-state: paused;
					transform-origin: 50% 0;
					transform: scale(0);
				}

				@keyframes scale { 50% { transform: scaleY(1.5); } }
				&.show::before { animation-play-state: running; }
				&.hide { opacity: 0; transform: translateY(20%); &::before { animation-play-state: paused; } }
			}

			.description {
				grid-column: 1 / -1;
				:global(p) { color: #ffffff; }
				@include desktop { grid-column: 3 / span 3; }
			}

			:global(.cta) {
				grid-column: 1 / -1;
				text-align: end;
				@include desktop {
					transition: transform calc($intro-duration - 200ms) var(--ease-out-expo), opacity $intro-duration var(--ease-out-expo);
					grid-column: 10 / -1;
					opacity: 0.5;
					transform: translate3d(0, 100%, 0);
				}
			}
			:global(.cta.in) { opacity: 1; transform: translate3d(0, 0, 0); }
		}
	}

	/* ── ABOUT ── */
	.why {
		margin-bottom: mobile-vw(160px);
		position: relative;
		@include desktop { margin-bottom: desktop-vw(640px); }

		.sticky {
			grid-column: 1 / -1;
			@include desktop {
				position: sticky;
				top: 33%;
				align-self: start;
				border-left: 4px solid var(--theme-contrast);
				grid-column: 3 / span 4;
				padding: desktop-vw(24px) desktop-vw(32px);
			}
		}

		.features {
			grid-column: 1 / -1;
			@include desktop { grid-column: 7 / -1; margin-top: desktop-vw(256px); }
		}

		.feature {
			&:not(:first-child) { margin-top: mobile-vw(120px); }
			@include desktop {
				width: columns(4);
				&:not(:first-child) { margin-top: desktop-vw(400px); }
			}

			.title {
				color: var(--theme-contrast);
				margin-bottom: mobile-vw(16px);
				@include desktop { margin-bottom: desktop-vw(24px); }
			}
		}
	}

	/* ── APPROACH ── */
	.rethink {
		position: relative;

		.pre {
			margin-bottom: mobile-vw(160px);
			@include desktop { margin-bottom: desktop-vw(240px); }

			.highlight {
				@include desktop {
					border-left: 4px solid var(--theme-contrast);
					grid-column: 3 / span 4;
					top: desktop-vw(64px);
					padding: desktop-vw(24px) 0 desktop-vw(24px) desktop-vw(32px);
				}
			}

			.comparison {
				grid-column: 1 / -1;
				@include desktop { grid-column: 7 / span 4; margin-top: desktop-vw(256px); }
			}
		}
	}

	/* ── SOLUTION ── */
	.solution {
		color: var(--white);
		height: 500vh;
		position: relative;
		@include desktop { height: 1000vh; }

		.inner {
			position: sticky;
			top: 0;
			margin: 0 auto;
			overflow: hidden;
			height: calc(100 * var(--vh, 1vh));
			@include desktop { height: 100vh; }

			&::after {
				content: '';
				background-color: currentColor;
				position: absolute;
				height: 100%; width: 100%;
				left: 50%;
				transform: translateX(-50%) scaleX(var(--progress2));
				top: 0;
			}

			.zoom {
				align-self: start;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
				transform: scale(calc(1 + (var(--progress1)) * 3));
				padding: mobile-vh(16px);
				@include desktop { padding: desktop-vh(40px) var(--layout-margin); }
			}
		}

		.first { transform: translateY(calc(var(--progress1) * -100%)); }
		.second { text-align: end; }

		.enter {
			position: absolute;
			top: 50%; left: 50%;
			transform: translate(-54.2%, -50%) scale(calc((var(--progress1) * 18.2)));
			transform-origin: 50% calc(50% - (var(--progress1) * 27%));
			opacity: calc(var(--progress1) * 2);
			text-align: center;
			@include desktop {
				transform: translate(-50%, -50%) scale(calc((var(--progress1) * 8.5)));
				transform-origin: 50% calc(50% - (var(--progress1) * 25%));
			}
		}
	}

	/* ── FEATURING ── */
	.featuring {
		position: relative;
		padding-bottom: mobile-vw(160px);
		color: var(--theme-secondary);

		&::before {
			content: '';
			top: 0; left: 0;
			width: 100%;
			height: mobile-vw(150px);
			position: absolute;
			background: linear-gradient(to bottom, var(--theme-primary), var(--theme-primary-transparent));
			@include desktop { height: desktop-vw(150px); }
		}

		@include desktop {
			padding: desktop-vw(40px) 0;
			padding-bottom: desktop-vw(320px);
		}

		.inner { position: relative; }

		.feat-label {
			padding-top: mobile-vw(80px);
			padding-bottom: mobile-vw(24px);
			@include desktop {
				padding-top: desktop-vw(120px);
				padding-bottom: desktop-vw(24px);
			}
		}

		.feat-tag {
			display: inline-block;
			border: 1px solid var(--theme-contrast);
			color: var(--theme-contrast);
			padding: mobile-vw(6px) mobile-vw(14px);
			text-transform: uppercase;
			letter-spacing: 0.1em;
			@include desktop { padding: desktop-vw(6px) desktop-vw(14px); }
		}

		.intro {
			padding-bottom: mobile-vw(60px);
			@include desktop { padding-bottom: desktop-vw(80px); }
		}

		.pillars {
			display: grid;
			grid-template-columns: 1fr;
			gap: mobile-vw(1px);
			background: var(--theme-secondary);
			border: 1px solid var(--theme-secondary);
			margin-bottom: mobile-vw(80px);

			@include desktop {
				grid-template-columns: repeat(3, 1fr);
				margin-bottom: desktop-vw(120px);
			}
		}

		.pillar {
			background: var(--theme-primary);
			padding: mobile-vw(28px) mobile-vw(24px);
			display: flex;
			flex-direction: column;
			gap: mobile-vw(12px);
			@include desktop {
				padding: desktop-vw(40px) desktop-vw(32px);
				gap: desktop-vw(12px);
			}
		}

		.pillar-num {
			color: var(--theme-contrast);
			font-weight: 700;
			letter-spacing: 0.05em;
		}

		.pillar-title { color: var(--theme-secondary); }

		.pillar-body {
			opacity: 0.6;
			line-height: 1.5;
		}
	}

	/* ── PROGRAMS ── */
	.in-use {
		color: var(--theme-secondary);
		padding-bottom: mobile-vw(160px);
		position: relative;
		@include desktop { padding-bottom: desktop-vw(400px); }

		.title {
			grid-column: 1 / -1;
			@include desktop { grid-column: 1 / span 5; }
		}

		.list {
			grid-column: 1 / -1;
			@include desktop { grid-column: 6 / span 7; }
		}
	}
</style>