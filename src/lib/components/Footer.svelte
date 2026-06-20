<script lang="ts">
	let showVolunteerForm = false;
	let formData = { name: '', email: '', phone: '', message: '' };
	let submitted = false;

	function handleSubmit() {
		submitted = true;
		setTimeout(() => {
			showVolunteerForm = false;
			submitted = false;
			formData = { name: '', email: '', phone: '', message: '' };
		}, 3000);
	}

	function handleDonate() {
		const isMobile = /android|iphone|ipad/i.test(navigator.userAgent);
		if (isMobile) {
			window.location.href = 'upi://pay?pa=demo@upi&pn=Adhigam%20Youth%20Foundation&am=&cu=INR';
		} else {
			window.open('https://www.instagram.com/adhigam_india', '_blank');
		}
	}
</script>

<footer class="theme-light footer">

	<!-- TOP: Big headline -->
	<div class="footer-top">
		<div class="footer-headline">
			<p class="h1 headline-text">
				Adhigam is <br />
				<span class="contrast">Empowering<br />Communities</span>
			</p>
			<p class="tagline p-s">
				Building self-reliant, forward-thinking communities<br />
				through education, awareness & skill development
			</p>
		</div>

		<!-- STAT PILLS -->
		<div class="stats">
			<div class="stat">
				<span class="stat-num">500+</span>
				<span class="stat-label p-xs">Children Reached</span>
			</div>
			<div class="stat">
				<span class="stat-num">3+</span>
				<span class="stat-label p-xs">Years Active</span>
			</div>
			<div class="stat">
				<span class="stat-num">10+</span>
				<span class="stat-label p-xs">Programs</span>
			</div>
			<div class="stat">
				<span class="stat-num">50+</span>
				<span class="stat-label p-xs">Volunteers</span>
			</div>
		</div>
	</div>

	<!-- MIDDLE: CTA strip -->
	<div class="cta-strip">
		<div class="cta-strip-inner">
			<div class="cta-left">
				<p class="h3 cta-heading">Ready to make a difference?</p>
				<p class="p-s cta-sub">Join our community of changemakers or support our mission.</p>
			</div>
			<div class="cta-buttons">
				<button class="btn-volunteer" on:click={() => showVolunteerForm = true}>
					✦ Apply as Volunteer
				</button>
				<button class="btn-donate" on:click={handleDonate}>
					♥ Donate via UPI
				</button>
			</div>
		</div>
	</div>

	<!-- VOLUNTEER MODAL -->
	{#if showVolunteerForm}
		<div class="modal-overlay" on:click|self={() => showVolunteerForm = false} role="dialog" aria-modal="true">
			<div class="modal">
				{#if submitted}
					<div class="success">
						<div class="success-icon">✓</div>
						<p class="h4">Thank you!</p>
						<p class="p-s">We'll reach out to you soon.</p>
					</div>
				{:else}
					<button class="modal-close" on:click={() => showVolunteerForm = false} aria-label="Close">✕</button>
					<div class="modal-header">
						<p class="modal-badge p-xs">Join Adhigam</p>
						<p class="h4 modal-title">Volunteer Application</p>
						<p class="p-s modal-sub">Fill in your details and we'll reach out to you within 48 hours.</p>
					</div>
					<div class="form">
						<div class="input-group">
							<label class="label p-xs">Full Name</label>
							<input class="input" type="text" placeholder="Your full name" bind:value={formData.name} />
						</div>
						<div class="input-group">
							<label class="label p-xs">Email</label>
							<input class="input" type="email" placeholder="your@email.com" bind:value={formData.email} />
						</div>
						<div class="input-group">
							<label class="label p-xs">Phone</label>
							<input class="input" type="tel" placeholder="+91 XXXXX XXXXX" bind:value={formData.phone} />
						</div>
						<div class="input-group">
							<label class="label p-xs">Why do you want to volunteer?</label>
							<textarea class="input textarea" placeholder="Tell us about yourself and your motivation..." bind:value={formData.message} rows="4"></textarea>
						</div>
						<button class="btn-submit" on:click={handleSubmit}>Submit Application →</button>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<!-- BOTTOM: Links + copyright -->
	<div class="footer-bottom">
		<div class="footer-bottom-inner">
			<div class="brand">
				<p class="h4 brand-name">Adhigam</p>
				<p class="p-xs brand-sub">Youth Foundation</p>
			</div>
			<nav class="links">
				<a class="link p-xs" href="https://www.instagram.com/adhigam_india" target="_blank" rel="noopener">Instagram</a>
				<a class="link p-xs" href="https://www.linkedin.com/company/adhigamyouthfoundation" target="_blank" rel="noopener">LinkedIn</a>
				<a class="link p-xs" href="#">YouTube</a>
				<a class="link p-xs" href="/">Website</a>
				<a class="link p-xs" href="mailto:adhigam@gmail.com">Contact</a>
			</nav>
			<p class="p-xs tm">
				<span>©</span>{new Date().getFullYear()} Adhigam Youth Foundation
			</p>
		</div>
	</div>

</footer>

<style lang="scss">
	@import '../styles/_functions';

	.footer {
		color: var(--theme-secondary);
		display: flex;
		flex-direction: column;
		min-height: calc(100 * var(--vh, 1vh));
		position: relative;

		@include desktop { min-height: 100vh; }
	}

	/* ── TOP ── */
	.footer-top {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: mobile-vw(40px);
		padding: mobile-vw(60px) mobile-vw(24px) mobile-vw(40px);

		@include desktop {
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
			padding: desktop-vw(80px) var(--layout-margin) desktop-vw(60px);
			gap: desktop-vw(40px);
		}
	}

	.footer-headline {
		display: flex;
		flex-direction: column;
		gap: mobile-vw(16px);

		@include desktop { gap: desktop-vw(20px); }
	}

	.headline-text {
		line-height: 0.92;
		font-size: mobile-vw(48px);

		@include desktop { font-size: desktop-vw(72px); }
	}

	.tagline {
		opacity: 0.6;
		max-width: mobile-vw(300px);

		@include desktop { max-width: desktop-vw(360px); }
	}

	/* ── STATS ── */
	.stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: mobile-vw(1px);
		background: currentColor;
		border: 1px solid currentColor;
		flex-shrink: 0;

		@include desktop {
			grid-template-columns: repeat(4, 1fr);
			align-self: flex-end;
			width: desktop-vw(560px);
		}
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: mobile-vw(4px);
		padding: mobile-vw(20px) mobile-vw(16px);
		background: var(--theme-primary);

		@include desktop {
			padding: desktop-vw(24px) desktop-vw(20px);
			gap: desktop-vw(4px);
		}
	}

	.stat-num {
		font-size: mobile-vw(28px);
		font-weight: 900;
		font-stretch: condensed;
		color: var(--theme-contrast);
		line-height: 1;

		@include desktop { font-size: desktop-vw(36px); }
	}

	.stat-label {
		opacity: 0.6;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* ── CTA STRIP ── */
	.cta-strip {
		border-top: 1px solid currentColor;
		border-bottom: 1px solid currentColor;
		padding: mobile-vw(32px) mobile-vw(24px);

		@include desktop { padding: desktop-vw(40px) var(--layout-margin); }
	}

	.cta-strip-inner {
		display: flex;
		flex-direction: column;
		gap: mobile-vw(24px);

		@include desktop {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: desktop-vw(40px);
		}
	}

	.cta-heading {
		margin-bottom: mobile-vw(6px);
		@include desktop { margin-bottom: desktop-vw(6px); }
	}

	.cta-sub { opacity: 0.6; }

	.cta-buttons {
		display: flex;
		flex-direction: column;
		gap: mobile-vw(12px);
		flex-shrink: 0;

		@include desktop {
			flex-direction: row;
			gap: desktop-vw(12px);
		}
	}

	.btn-volunteer {
		font-family: inherit;
		font-size: mobile-vw(13px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: mobile-vw(14px) mobile-vw(28px);
		border: 2px solid currentColor;
		background: transparent;
		color: var(--theme-secondary);
		cursor: pointer;
		transition: background 0.25s ease, color 0.25s ease;
		white-space: nowrap;

		&:hover {
			background: var(--theme-secondary);
			color: var(--theme-primary);
		}

		@include desktop {
			font-size: desktop-vw(13px);
			padding: desktop-vw(14px) desktop-vw(32px);
		}
	}

	.btn-donate {
		font-family: inherit;
		font-size: mobile-vw(13px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: mobile-vw(14px) mobile-vw(28px);
		border: 2px solid var(--theme-contrast);
		background: var(--theme-contrast);
		color: var(--theme-primary);
		cursor: pointer;
		transition: opacity 0.25s ease, transform 0.25s ease;
		white-space: nowrap;

		&:hover {
			opacity: 0.85;
			transform: translateY(-1px);
		}

		@include desktop {
			font-size: desktop-vw(13px);
			padding: desktop-vw(14px) desktop-vw(32px);
		}
	}

	/* ── MODAL ── */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.75);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: mobile-vw(20px);

		@include desktop { padding: desktop-vw(40px); }
	}

	.modal {
		background: var(--theme-primary);
		color: var(--theme-secondary);
		padding: mobile-vw(36px) mobile-vw(28px);
		width: 100%;
		max-width: mobile-vw(500px);
		position: relative;

		@include desktop {
			padding: desktop-vw(52px) desktop-vw(48px);
			max-width: desktop-vw(540px);
		}
	}

	.modal-close {
		position: absolute;
		top: mobile-vw(20px);
		right: mobile-vw(20px);
		background: none;
		border: none;
		font-size: mobile-vw(16px);
		cursor: pointer;
		color: var(--theme-secondary);
		font-family: inherit;
		opacity: 0.5;
		transition: opacity 0.2s ease;

		&:hover { opacity: 1; }

		@include desktop {
			top: desktop-vw(20px);
			right: desktop-vw(20px);
			font-size: desktop-vw(16px);
		}
	}

	.modal-header { margin-bottom: mobile-vw(28px); @include desktop { margin-bottom: desktop-vw(32px); } }

	.modal-badge {
		display: inline-block;
		border: 1px solid var(--theme-contrast);
		color: var(--theme-contrast);
		padding: mobile-vw(4px) mobile-vw(12px);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: mobile-vw(12px);

		@include desktop {
			padding: desktop-vw(4px) desktop-vw(12px);
			margin-bottom: desktop-vw(12px);
		}
	}

	.modal-title { margin-bottom: mobile-vw(8px); @include desktop { margin-bottom: desktop-vw(8px); } }
	.modal-sub { opacity: 0.6; }

	.form {
		display: flex;
		flex-direction: column;
		gap: mobile-vw(16px);
		@include desktop { gap: desktop-vw(16px); }
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: mobile-vw(6px);
		@include desktop { gap: desktop-vw(6px); }
	}

	.label {
		opacity: 0.6;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.input {
		font-family: inherit;
		font-size: mobile-vw(14px);
		padding: mobile-vw(12px) mobile-vw(16px);
		border: 1px solid currentColor;
		background: transparent;
		color: var(--theme-secondary);
		width: 100%;
		outline: none;
		transition: border-color 0.2s ease;

		&::placeholder { opacity: 0.35; }
		&:focus { border-color: var(--theme-contrast); }

		@include desktop {
			font-size: desktop-vw(14px);
			padding: desktop-vw(12px) desktop-vw(16px);
		}
	}

	.textarea { resize: vertical; min-height: mobile-vw(100px); @include desktop { min-height: desktop-vw(100px); } }

	.btn-submit {
		font-family: inherit;
		font-size: mobile-vw(13px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: mobile-vw(16px);
		background: var(--theme-contrast);
		color: var(--theme-primary);
		border: none;
		cursor: pointer;
		transition: opacity 0.2s ease, transform 0.2s ease;
		margin-top: mobile-vw(4px);

		&:hover { opacity: 0.85; transform: translateY(-1px); }

		@include desktop {
			font-size: desktop-vw(13px);
			padding: desktop-vw(16px);
			margin-top: desktop-vw(4px);
		}
	}

	.success {
		text-align: center;
		padding: mobile-vw(48px) 0;
		@include desktop { padding: desktop-vw(48px) 0; }
	}

	.success-icon {
		font-size: mobile-vw(32px);
		color: var(--theme-contrast);
		margin-bottom: mobile-vw(16px);
		@include desktop { font-size: desktop-vw(32px); margin-bottom: desktop-vw(16px); }
	}

	.success .h4 { margin-bottom: mobile-vw(8px); @include desktop { margin-bottom: desktop-vw(8px); } }

	/* ── BOTTOM BAR ── */
	.footer-bottom {
		border-top: 1px solid currentColor;
		padding: mobile-vw(20px) mobile-vw(24px);

		@include desktop { padding: desktop-vw(24px) var(--layout-margin); }
	}

	.footer-bottom-inner {
		display: flex;
		flex-direction: column;
		gap: mobile-vw(16px);

		@include desktop {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 0;
		}
	}

	.brand { display: flex; align-items: baseline; gap: mobile-vw(8px); @include desktop { gap: desktop-vw(8px); } }
	.brand-name { line-height: 1; }
	.brand-sub { opacity: 0.4; }

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: mobile-vw(16px);

		@include desktop {
			gap: desktop-vw(28px);
		}

		.link {
			opacity: 0.6;
			text-decoration: none;
			transition: opacity 0.2s ease;
			color: currentColor;
			&:hover { opacity: 1; }
		}
	}

	.tm {
		opacity: 0.4;
		span { vertical-align: text-top; }
	}
</style>