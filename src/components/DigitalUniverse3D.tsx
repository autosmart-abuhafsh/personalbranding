import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '../data/profile';

export interface UniverseNodeInfo {
  id: string;
  label: string;
  subtitle: { id: string; en: string };
  angle: number;
  radius: number;
  elevation: number;
  colorHex: number;
}

export const UNIVERSE_NODES: UniverseNodeInfo[] = [
  {
    id: 'websites',
    label: 'Websites',
    subtitle: {
      id: 'Company Profile, Landing Page, Travel & E-Commerce',
      en: 'Company Profiles, Landing Pages, Travel & E-Commerce',
    },
    angle: 0,
    radius: 2.35,
    elevation: 0.45,
    colorHex: 0xd5b47a,
  },
  {
    id: 'business-apps',
    label: 'Business Apps',
    subtitle: {
      id: 'Sistem Manajemen Operasional, CRM, HRIS & Inventaris',
      en: 'Operational Management Systems, CRM, HRIS & Inventory',
    },
    angle: (Math.PI * 2) / 5,
    radius: 2.45,
    elevation: -0.35,
    colorHex: 0x78263f,
  },
  {
    id: 'automation',
    label: 'Automation',
    subtitle: {
      id: 'Google Apps Script, Google Sheets & Otomasi Alur Kerja',
      en: 'Google Apps Script, Google Sheets & Workflow Automation',
    },
    angle: (Math.PI * 4) / 5,
    radius: 2.3,
    elevation: 0.55,
    colorHex: 0xd5b47a,
  },
  {
    id: 'ai-integration',
    label: 'AI Integration',
    subtitle: {
      id: 'Google AI Studio, Gemini AI & Prompt Engineering',
      en: 'Google AI Studio, Gemini AI & Prompt Engineering',
    },
    angle: (Math.PI * 6) / 5,
    radius: 2.4,
    elevation: -0.45,
    colorHex: 0x9e3354,
  },
  {
    id: 'digital-solutions',
    label: 'Digital Solutions',
    subtitle: {
      id: 'Dashboard Keuangan, Visualisasi Data & Edukasi Digital',
      en: 'Financial Dashboards, Data Visualization & Digital Learning',
    },
    angle: (Math.PI * 8) / 5,
    radius: 2.35,
    elevation: 0.2,
    colorHex: 0xd5b47a,
  },
];

interface DigitalUniverse3DProps {
  lang: Language;
}

// Pre-allocated math helpers at module scope to prevent GC in render loop
const _targetCameraPos = new THREE.Vector3();
const _dummyObj = new THREE.Object3D();

export const DigitalUniverse3D: React.FC<DigitalUniverse3DProps> = React.memo(({ lang }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string>('websites');
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [webglAvailable, setWebglAvailable] = useState<boolean>(true);

  const activeNodeRef = useRef<string>(activeNodeId);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    activeNodeRef.current = activeNodeId;
  }, [activeNodeId]);

  useEffect(() => {
    const mountEl = canvasMountRef.current;
    const wrapperEl = containerRef.current;
    if (!mountEl || !wrapperEl) return;

    const isMobileViewport = window.innerWidth < 768;

    // Detect software WebGL (SwiftShader, llvmpipe, etc.) from renderer string
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl && !isMobileViewport,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglAvailable(false);
      return;
    }

    const width = mountEl.clientWidth || 560;
    const height = mountEl.clientHeight || 480;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    // Cap pixel ratio to 1 on mobile or software GL to keep scrolling 100% lag-free
    renderer.setPixelRatio(
      isSoftwareGl || isMobileViewport ? 1 : Math.min(window.devicePixelRatio, 1.5),
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;

    mountEl.innerHTML = '';
    mountEl.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1020, 0.085);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 6.6);
    camera.lookAt(0, 0, 0);

    // Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 3-Point Warm/Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xd5b47a, 0x111a2e, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x78263f, 2.6);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    // Composite 8-Part Procedural Group: "Autosmart Digital Command Core"
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // Part 1: Primary Silhouette — Inner Faceted Burgundy Core
    const coreGeo = new THREE.IcosahedronGeometry(0.92, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x471728,
      roughness: 0.25,
      metalness: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    universeGroup.add(coreMesh);

    // Part 2: Primary Lattice — Champagne Gold Geodesic Exoskeleton
    const cageGeo = new THREE.IcosahedronGeometry(1.12, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0xd5b47a,
      roughness: 0.2,
      metalness: 0.92,
      wireframe: true,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    universeGroup.add(cageMesh);

    // Part 3, 4, 5: Secondary Read — Three Gyroscopic Precision Rings
    const ringSegments = isMobileViewport ? 48 : 64;
    const ring1Geo = new THREE.TorusGeometry(1.58, 0.028, 12, ringSegments);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd5b47a,
      roughness: 0.18,
      metalness: 0.92,
    });
    const ring1 = new THREE.Mesh(ring1Geo, goldMat);
    ring1.rotation.x = Math.PI / 2.6;
    universeGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.92, 0.022, 12, ringSegments);
    const maroonMat = new THREE.MeshStandardMaterial({
      color: 0x78263f,
      roughness: 0.45,
      metalness: 0.65,
    });
    const ring2 = new THREE.Mesh(ring2Geo, maroonMat);
    ring2.rotation.y = Math.PI / 3.2;
    ring2.rotation.x = -Math.PI / 5;
    universeGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.38, 0.015, 10, ringSegments);
    const slateMat = new THREE.MeshStandardMaterial({
      color: 0xa5adbd,
      roughness: 0.5,
      metalness: 0.8,
    });
    const ring3 = new THREE.Mesh(ring3Geo, slateMat);
    ring3.rotation.x = Math.PI / 2.1;
    universeGroup.add(ring3);

    // Part 6: Orbiting Architectural Data Satellites (5 Pillars)
    const satellitesGroup = new THREE.Group();
    universeGroup.add(satellitesGroup);

    const satBodyGeo = new THREE.OctahedronGeometry(0.19, 0);
    const satHaloGeo = new THREE.TorusGeometry(0.3, 0.014, 10, 24);

    const satelliteMeshes: {
      id: string;
      group: THREE.Group;
      baseAngle: number;
      radius: number;
      elevation: number;
      halo: THREE.Mesh;
    }[] = [];

    UNIVERSE_NODES.forEach((node) => {
      const satNodeGroup = new THREE.Group();
      const satMat = new THREE.MeshStandardMaterial({
        color: node.colorHex,
        roughness: 0.22,
        metalness: 0.88,
      });
      const bodyMesh = new THREE.Mesh(satBodyGeo, satMat);
      const haloMesh = new THREE.Mesh(satHaloGeo, goldMat);
      haloMesh.rotation.x = Math.PI / 2;

      satNodeGroup.add(bodyMesh);
      satNodeGroup.add(haloMesh);

      const x = Math.cos(node.angle) * node.radius;
      const z = Math.sin(node.angle) * node.radius;
      satNodeGroup.position.set(x, node.elevation, z);

      satellitesGroup.add(satNodeGroup);
      satelliteMeshes.push({
        id: node.id,
        group: satNodeGroup,
        baseAngle: node.angle,
        radius: node.radius,
        elevation: node.elevation,
        halo: haloMesh,
      });
    });

    // Part 7: Accent Detail — Instanced Constellation Micro-Nodes (36 instances)
    const instanceCount = 36;
    const nodeInstGeo = new THREE.SphereGeometry(0.032, 6, 6);
    const nodeInstMat = new THREE.MeshStandardMaterial({
      color: 0xd5b47a,
      roughness: 0.3,
      metalness: 0.85,
    });
    const instancedStars = new THREE.InstancedMesh(nodeInstGeo, nodeInstMat, instanceCount);
    const tintColor = new THREE.Color();

    for (let i = 0; i < instanceCount; i++) {
      const theta = (i / instanceCount) * Math.PI * 2;
      const r = 2.65 + (i % 3) * 0.35;
      const y = Math.sin(i * 1.7) * 1.25;
      _dummyObj.position.set(Math.cos(theta) * r, y, Math.sin(theta) * r);
      const scale = 0.85 + (i % 4) * 0.1;
      _dummyObj.scale.set(scale, scale, scale);
      _dummyObj.updateMatrix();
      instancedStars.setMatrixAt(i, _dummyObj.matrix);
      tintColor.setHex(i % 2 === 0 ? 0xd5b47a : 0x9e3354);
      instancedStars.setColorAt(i, tintColor);
    }
    instancedStars.instanceMatrix.needsUpdate = true;
    if (instancedStars.instanceColor) instancedStars.instanceColor.needsUpdate = true;
    instancedStars.computeBoundingSphere();
    universeGroup.add(instancedStars);

    // Part 8: Contact Shadow Grounding Disc beneath the core
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 60);
      grad.addColorStop(0, 'rgba(10, 16, 32, 0.75)');
      grad.addColorStop(0.5, 'rgba(120, 38, 63, 0.22)');
      grad.addColorStop(1, 'rgba(10, 16, 32, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowPlaneGeo = new THREE.CircleGeometry(2.6, 24);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowDisc = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -2.15;
    scene.add(shadowDisc);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer Interaction Listener (Throttled to desktop pointers so mobile touch scrolling never stutters)
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = mountEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerRef.current.x = THREE.MathUtils.clamp(nx, -1, 1);
      pointerRef.current.y = THREE.MathUtils.clamp(ny, -1, 1);
    };

    mountEl.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!mountEl) return;
      const newW = mountEl.clientWidth || 560;
      const newH = mountEl.clientHeight || 480;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Pause WebGL rendering automatically when scrolled out of viewport so scrolling on mobile & PC stays 100% smooth
    let frameId = 0;
    let isDisposed = false;
    let lastTimeMs = performance.now();
    let elapsedSec = 0;

    const scheduleNextFrame = () => {
      if (isDisposed || !isVisibleRef.current) return;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible && !isDisposed) {
          lastTimeMs = performance.now();
          scheduleNextFrame();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(wrapperEl);

    function afterDraw(cb: () => void) {
      if (isDisposed || !isVisibleRef.current) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isDisposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function tick() {
      if (isDisposed || !isVisibleRef.current) return;
      const nowMs = performance.now();
      const dt = Math.min((nowMs - lastTimeMs) / 1000, 0.1);
      lastTimeMs = nowMs;
      elapsedSec += dt;

      // Rotate inner core & precision rings smoothly
      coreMesh.rotation.y += dt * 0.28;
      coreMesh.rotation.x += dt * 0.14;
      cageMesh.rotation.y -= dt * 0.18;
      ring1.rotation.z += dt * 0.22;
      ring2.rotation.z -= dt * 0.16;
      ring3.rotation.z += dt * 0.09;
      instancedStars.rotation.y += dt * 0.05;

      // Highlight active satellite node
      const currentActiveId = activeNodeRef.current;
      satelliteMeshes.forEach((sat, idx) => {
        const orbitAngle = sat.baseAngle + elapsedSec * 0.14;
        sat.group.position.x = Math.cos(orbitAngle) * sat.radius;
        sat.group.position.z = Math.sin(orbitAngle) * sat.radius;
        sat.group.position.y = sat.elevation + Math.sin(elapsedSec * 1.4 + idx) * 0.08;
        sat.group.rotation.y += dt * 0.6;

        const targetScale = sat.id === currentActiveId ? 1.42 : 0.92;
        const nextScale = THREE.MathUtils.damp(sat.group.scale.x, targetScale, 6, dt);
        sat.group.scale.setScalar(nextScale);
        sat.halo.rotation.z += dt * (sat.id === currentActiveId ? 1.5 : 0.4);
      });

      // Damped pointer parallax on universeGroup
      const targetRotY = pointerRef.current.x * 0.35;
      const targetRotX = -pointerRef.current.y * 0.22;
      universeGroup.rotation.y = THREE.MathUtils.damp(universeGroup.rotation.y, targetRotY, 4, dt);
      universeGroup.rotation.x = THREE.MathUtils.damp(universeGroup.rotation.x, targetRotX, 4, dt);

      _targetCameraPos.set(pointerRef.current.x * 0.25, 0.55 + pointerRef.current.y * 0.2, 6.6);
      camera.position.lerp(_targetCameraPos, 1 - Math.exp(-4 * dt));
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      scheduleNextFrame();
    }

    tick();

    return () => {
      isDisposed = true;
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      mountEl.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      goldMat.dispose();
      maroonMat.dispose();
      slateMat.dispose();
      satBodyGeo.dispose();
      satHaloGeo.dispose();
      nodeInstGeo.dispose();
      nodeInstMat.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
      shadowTex.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
  }, []);

  const currentNode =
    UNIVERSE_NODES.find((n) => n.id === activeNodeId) || UNIVERSE_NODES[0];

  return (
    <div
      ref={containerRef}
      data-testid="digital-universe-viewport"
      data-active-node={activeNodeId}
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] rounded-2xl border border-white/10 bg-[#111A2E]/90 overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle Top-Left Spec Header (Unobstructed 3D Center) */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-4 pointer-events-none">
        <div>
          <p className="font-mono-tech text-[11px] tracking-wider text-[#D5B47A]">
            AUTOSMART DIGITAL UNIVERSE · 3D CORE
          </p>
          <p className="text-xs text-[#A5ADBD] mt-0.5">
            {currentNode.label} — {currentNode.subtitle[lang]}
          </p>
        </div>
      </div>

      {/* Dedicated WebGL Mount Container with touch-pan-y for effortless mobile vertical scrolling */}
      {webglAvailable ? (
        <div
          ref={canvasMountRef}
          className="absolute inset-0 z-0 w-full h-full touch-pan-y"
          aria-label="Interactive 3D Digital Universe Visualization"
        />
      ) : (
        <div className="absolute inset-0 z-0 flex items-center justify-center p-8 text-center">
          <div className="max-w-xs space-y-2 rounded-xl border border-white/10 bg-[#0A1020]/90 p-5">
            <p className="font-display text-sm font-semibold text-[#D5B47A]">
              Autosmart Digital Command Core
            </p>
            <p className="text-xs text-[#A5ADBD]">
              Websites · Business Apps · Automation · AI Integration · Digital Solutions
            </p>
          </div>
        </div>
      )}

      {/* Ergonomic Collapsible Bottom Control Dock (Zero Side-Panel Clutter, No Backdrop Blur over WebGL) */}
      <div className="relative z-10 mx-auto w-[94%] max-w-[600px] pb-3 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setDockCollapsed((prev) => !prev)}
          aria-expanded={!dockCollapsed}
          className="mb-1.5 inline-flex items-center gap-1.5 rounded-t-lg border border-b-0 border-white/15 bg-[#0A1020] px-3 py-1 text-[11px] font-medium text-[#A5ADBD] hover:text-[#F4F4F5] transition-colors whitespace-nowrap shrink-0"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="h-3.5 w-3.5 text-[#D5B47A]" />
              <span>{lang === 'id' ? 'Tampilkan Node 3D' : 'Show 3D Nodes'}</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5 text-[#D5B47A]" />
              <span>{lang === 'id' ? 'Sembunyikan Kontrol' : 'Hide Controls'}</span>
            </>
          )}
        </button>

        {!dockCollapsed && (
          <div
            role="toolbar"
            aria-label={lang === 'id' ? 'Pilih Fokus Node 3D' : 'Select 3D Node Focus'}
            className="w-full rounded-xl border border-white/15 bg-[#0A1020] p-1.5 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-center gap-1">
              {UNIVERSE_NODES.map((node) => {
                const selected = node.id === activeNodeId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNodeId(node.id)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                      selected
                        ? 'bg-[#78263F] text-[#F4F4F5] border border-[#D5B47A]/40'
                        : 'text-[#A5ADBD] hover:text-[#F4F4F5] hover:bg-[#111A2E]'
                    }`}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
