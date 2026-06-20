<script lang="ts" context="module">
	// ✅ UPDATED: Adhigam Brand Colors
	const material: {
		color: string | Color;
		roughness: { min: number; max: number; value: number };
		metalness: { min: number; max: number; value: number };
		wireframe: boolean;
	} = {
		color: '#1a365d', // Adhigam Deep Blue
		roughness: {
			min: 0,
			value: 0.3, // Slightly smoother
			max: 1
		},
		metalness: {
			min: 0,
			value: 0.8, // More metallic for premium feel
			max: 1
		},
		wireframe: false
	};

	// ✅ UPDATED: Adhigam Warm Lighting
	const lights = {
		light1: {
			step: 1,
			value: [-200, 150, 50] as const
		},
		light2: {
			step: 1,
			value: [300, -100, 150] as const
		},
		light1Intensity: {
			min: 0,
			value: 1,
			max: 1
		},
		light2Intensity: {
			min: 0,
			value: 1,
			max: 1
		},
		lightsColor: '#ed8936', // Adhigam Warm Orange
		ambientColor: '#2d3748' // Adhigam Dark Gray
	};

	type MaterialProps<T extends keyof typeof material> = [T, (typeof material)[T]];
	type LightsProps<T extends keyof typeof lights> = [T, (typeof lights)[T]];

	function updateMaterial(props: MaterialProps[]) {
		for (let [key, val] of props) {
			material[key] = val;
		}
	}

	function updateLights(props: LightsProps[]) {
		for (let [key, val] of props) {
			lights[key] = val;
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import {
		AmbientLight,
		Color,
		DirectionalLight,
		Euler,
		Group,
		MathUtils,
		Scene,
		Vector3
	} from 'three';

	import type Renderer from './renderer';

	import { useScroll } from '$lib/lifecycle-functions/useScroll';
	import { mapRange } from '$lib/utils/maths';
	import { thresholdsStore } from '$lib/stores/thresholds';
	import { steps } from './steps';
	import { loadGLB } from './loadGLB';

	export let renderer: Renderer;

	let type = 1;
	let updateML = false;
	const dummyArr = [0, 0, 0];
	const speed = 1;
	const rotationIntensity = 1;
	const floatIntensity = 1;
	const floatingRange = [-0.1, 0.1];

	let parentRef: Group;
	let groupRef: Group;
	let offset = Math.random() * 10000;
	let arm1: Scene, arm2: Scene;
	let currentArm: Scene | null = null;

	const updateArmMaterial = (arm: Scene | null, currentArm: Scene | null) => {
		if (arm && currentArm === arm) {
			const color = new Color(material.color);

			arm.traverse((node) => {
				if ('material' in node) {
					node.material.color = color;
					node.material.roughness = material.roughness.value;
					node.material.metalness = material.metalness.value;
					node.material.wireframe = material.wireframe;
					node.material.needsUpdate = true;
				}
			});
		}
	};

	$: if (updateML) {
		if (arm1 && currentArm === arm1) {
			updateArmMaterial(arm1, currentArm);
		}

		if (arm2 && currentArm === arm2) {
			updateArmMaterial(arm2, currentArm);
		}

		updateML = false;
	}

	$: thresholds = Object.values($thresholdsStore).sort((a, b) => a - b);

	$: if (type === 1 && currentArm !== arm1) {
		currentArm = arm1;

		groupRef?.remove(arm2);
		groupRef?.add(arm1);
	} else if (type === 2 && currentArm !== arm2) {
		currentArm = arm2;

		groupRef?.remove(arm1);
		groupRef?.add(arm2);
	}

	$: if (thresholds?.length) {
		arm1?.scale?.set(1, 1, 1);
		onScroll(0);
	}

	onMount(async () => {
		const a1 = await loadGLB('/models/arm.glb');
		const a2 = await loadGLB('/models/arm2.glb');

		arm1 = a1.scene.children[0];
		arm2 = a2.scene.children[0];

		arm1.scale.set(0, 0, 0);
		arm2.scale.set(1, 1, 1);

		currentArm = arm1;
		updateArmMaterial(arm1, currentArm);

		const ambientLight1 = new AmbientLight(new Color(lights.ambientColor));

		const groupLight1 = new Group();
		groupLight1.position.set(...lights.light1.value);
		const directionalLight1 = new DirectionalLight(
			new Color(lights.lightsColor),
			lights.light1Intensity.value
		);

		const groupLight2 = new Group();
		groupLight2.position.set(...lights.light2.value);
		const directionalLight2 = new DirectionalLight(
			new Color(lights.lightsColor),
			lights.light2Intensity.value
		);

		groupLight1.add(directionalLight1);
		groupLight2.add(directionalLight2);

		parentRef = new Group();
		groupRef = new Group();

		groupRef.add(arm1);
		parentRef.add(groupRef);

		renderer?.scene?.add(ambientLight1);
		renderer?.scene?.add(groupLight1);
		renderer?.scene?.add(groupLight2);
		renderer?.scene?.add(parentRef);

		const unsubscribe = renderer.onFrame((state) => {
			if (!parentRef) return;

			const t = offset + state.clock.getElapsedTime();
			parentRef.rotation.x = (Math.cos((t / 4) * speed) / 8) * rotationIntensity;
			parentRef.rotation.y = (Math.sin((t / 4) * speed) / 8) * rotationIntensity;
			parentRef.rotation.z = (Math.sin((t / 4) * speed) / 20) * rotationIntensity;

			let yPosition = Math.sin((t / 4) * speed) / 10;
			yPosition = MathUtils.mapLinear(
				yPosition,
				-0.1,
				0.1,
				floatingRange?.[0] ?? -0.1,
				floatingRange?.[1] ?? 0.1
			);

			parentRef.position.y = yPosition * floatIntensity;
		});

		return () => {
			unsubscribe && unsubscribe();
		};
	});

	function onScroll(scroll: number) {
		if (!groupRef) return;

		const current = thresholds.findIndex((v) => scroll < v) - 1;

		const start = thresholds[current];
		const end = thresholds[current + 1];
		const progress = mapRange(start, end, scroll, 0, 1);

		const from = steps[current];
		const to = steps[current + 1];

		groupRef.visible = from?.type === to?.type;

		if (!to) return;

		const _scale = mapRange(0, 1, progress, from.scale, to.scale);
		const _position = new Vector3(
			renderer.viewport.width * mapRange(0, 1, progress, from.position[0], to.position[0]),
			renderer.viewport.height * mapRange(0, 1, progress, from.position[1], to.position[1]),
			0
		);
		const _rotation = new Euler().fromArray(
			dummyArr.map((_, i) => mapRange(0, 1, progress, from.rotation[i], to.rotation[i])) as [
				number,
				number,
				number
			]
		);

		groupRef.scale.setScalar(renderer.viewport.height * _scale);
		groupRef.position.copy(_position);
		groupRef.rotation.copy(_rotation);

		type = to.type;
	}

	useScroll(({ scroll }) => {
		onScroll(scroll);

		if (scroll < $thresholdsStore['light-start']) {
			// ✅ UPDATED: Light colors for "light" theme (Adhigam Warm)
			if (lights.lightsColor === '#ed8936') return;

			updateLights([
				['light1Intensity', { min: 0, value: 0.35, max: 1 }],
				['light2Intensity', { min: 0, value: 0.15, max: 1 }],
				['lightsColor', '#ed8936'], // Adhigam Orange
				['ambientColor', '#2d3748'] // Adhigam Dark Gray
			]);

			updateMaterial([
				['color', '#1a365d'], // Adhigam Deep Blue
				[
					'roughness',
					{
						min: 0,
						value: 0.3,
						max: 1
					}
				],
				[
					'metalness',
					{
						min: 0,
						value: 0.8,
						max: 1
					}
				]
			]);

			updateML = true;
		} else {
			// ✅ UPDATED: Light colors for "dark" theme (Adhigam Gold)
			if (lights.lightsColor === '#ecc94b') return;

			updateLights([
				['light1Intensity', { min: 0, value: 1, max: 1 }],
				['light2Intensity', { min: 0, value: 1, max: 1 }],
				['lightsColor', '#ecc94b'], // Adhigam Gold
				['ambientColor', '#1a365d'] // Adhigam Deep Blue
			]);

			updateMaterial([
				['color', '#ecc94b'], // Adhigam Gold
				[
					'roughness',
					{
						min: 0,
						value: 0.2,
						max: 1
					}
				],
				[
					'metalness',
					{
						min: 0,
						value: 0.9,
						max: 1
					}
				]
			]);

			updateML = true;
		}
	});
</script>