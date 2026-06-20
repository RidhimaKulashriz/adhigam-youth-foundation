// ✅ FIX: Use correct import paths for Three.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';

// ✅ FIX: Proper type definitions
interface LoadingManager {
    totalModels: number;
    loadedModels: number;
    onProgress: ((progress: number) => void) | null;
    onComplete: (() => void) | null;
}

// ✅ FIX: Initialize with proper types
const loadingManager: LoadingManager = {
    totalModels: 0,
    loadedModels: 0,
    onProgress: null,
    onComplete: null
};

// ✅ Create loader instances
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

/**
 * Load a GLB/GLTF model
 * @param path - Path to the model file
 * @param onProgress - Optional progress callback
 * @returns Promise with the loaded model
 */
export function loadGLB(path: string, onProgress?: (progress: number) => void): Promise<GLTF> {
    return new Promise((resolve, reject) => {
        loadingManager.totalModels++;

        loader.load(
            path,
            (gltf: GLTF) => {  // ✅ FIX: Added type
                loadingManager.loadedModels++;
                
                if (onProgress) {
                    const progress = (loadingManager.loadedModels / loadingManager.totalModels) * 100;
                    onProgress(progress);
                }
                
                if (loadingManager.loadedModels === loadingManager.totalModels) {
                    if (loadingManager.onComplete) {
                        loadingManager.onComplete();
                    }
                }
                
                resolve(gltf);
            },
            (xhr: ProgressEvent) => {  // ✅ FIX: Added type
                if (xhr.total > 0 && onProgress) {
                    const progress = (xhr.loaded / xhr.total) * 100;
                    onProgress(progress);
                }
            },
            (error: ErrorEvent) => {  // ✅ FIX: Added type
                console.error('❌ Error loading model:', path, error);
                reject(error);
            }
        );
    });
}

/**
 * Load multiple models
 */
export function loadMultipleGLB(paths: string[], onProgress?: (progress: number) => void): Promise<GLTF[]> {
    const promises = paths.map(path => loadGLB(path, onProgress));
    return Promise.all(promises);
}

/**
 * Preload models
 */
export function preloadModels(paths: string[]): void {
    let loaded = 0;
    const total = paths.length;
    
    paths.forEach(path => {
        loadGLB(path, (progress) => {
            if (progress === 100) {
                loaded++;
                console.log(`📦 Preloaded ${loaded}/${total}: ${path}`);
            }
        }).catch(error => {
            console.warn(`⚠️ Failed to preload ${path}:`, error);
        });
    });
}

/**
 * Set loading callbacks
 */
export function setLoadingCallbacks(
    onProgress: (progress: number) => void,
    onComplete: () => void
): void {
    loadingManager.onProgress = onProgress;
    loadingManager.onComplete = onComplete;
}

/**
 * Reset loading manager
 */
export function resetLoadingManager(): void {
    loadingManager.totalModels = 0;
    loadingManager.loadedModels = 0;
}

/**
 * Create fallback model
 */
export function createFallbackModel(): Mesh {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ 
        color: '#ed8936', // Adhigam Orange
        metalness: 0.8,
        roughness: 0.3
    });
    return new Mesh(geometry, material);
}