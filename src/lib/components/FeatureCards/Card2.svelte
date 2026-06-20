<script lang="ts">
	export let number: number;
	export let title: string = '';
	export let text: string;
	export let background: string = 'rgba(239, 239, 239, 0.8)';
	export let image: string = '';
</script>

<div class="card" style="background: {background}">
	{#if image}
		<img class="card-img" src={image} alt={text} />
	{/if}
	<div class="card-number">{number.toString().padStart(2, '0')}</div>
	<div class="card-content">
		{#if title}
			<h3 class="card-title">{title}</h3>
		{/if}
		<p class="card-text">{text}</p>
	</div>
</div>

<style>
	.card {
		padding: 2rem;
		border-radius: 20px;
		backdrop-filter: blur(10px);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		width: 100%;
		max-width: 440px;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		overflow: hidden;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 20px 60px rgba(26, 54, 93, 0.2);
	}

	.card-img {
		width: calc(100% + 4rem);
		margin: -2rem -2rem 0;
		height: 220px;
		object-fit: cover;
		display: block;
		flex-shrink: 0;
	}

	.card-number {
		font-size: 3rem;
		font-weight: 800;
		color: #ed8936;
		line-height: 1;
		flex-shrink: 0;
	}

	.card-content {
		flex: 1;
	}

	.card-title {
		font-size: 1.3rem;
		font-weight: 700;
		color: white;
		margin: 0 0 0.5rem 0;
		letter-spacing: -0.02em;
	}

	.card-text {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1.6;
		margin: 0;
	}

	@media (max-width: 768px) {
		.card {
			padding: 1.5rem;
			min-height: 150px;
		}

		.card-img {
			width: calc(100% + 3rem);
			margin: -1.5rem -1.5rem 0;
			height: 160px;
		}

		.card-number { font-size: 2rem; }
		.card-title { font-size: 1.1rem; }
		.card-text { font-size: 0.9rem; }
	}
</style>