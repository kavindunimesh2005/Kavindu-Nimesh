import React, { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX - width / 2) * 0.0005;
      mouse.targetY = (clientY - height / 2) * 0.0005;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Polyhedron Geodesic Geometry for the right side
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const baseVertices = [
      [-1,  phi, 0],
      [ 1,  phi, 0],
      [-1, -phi, 0],
      [ 1, -phi, 0],
      [ 0, -1,  phi],
      [ 0,  1,  phi],
      [ 0, -1, -phi],
      [ 0,  1, -phi],
      [ phi, 0, -1],
      [ phi, 0,  1],
      [-phi, 0, -1],
      [-phi, 0,  1],
      // Intermediate decorative vertices
      [0, phi * 0.7, phi * 0.7],
      [phi * 0.7, 0, phi * 0.7],
      [-phi * 0.7, 0, phi * 0.7],
      [0, -phi * 0.7, phi * 0.7],
      [phi * 0.7, phi * 0.7, 0],
      [-phi * 0.7, phi * 0.7, 0]
    ];

    // Normalize & scale
    const radius = Math.min(width, height) * 0.38;
    const vertices = baseVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [(x / len) * radius, (y / len) * radius, (z / len) * radius];
    });

    // Compute edges between close vertices
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 1.3) {
          edges.push([i, j]);
        }
      }
    }

    let rotX = 0.2;
    let rotY = 0.4;
    let rotZ = 0.1;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Ambient rotation
      rotX += 0.003 + mouse.y * 0.2;
      rotY += 0.004 + mouse.x * 0.2;
      rotZ += 0.001;

      // Center position of 3D wireframe (placed on the right side)
      const isMobile = width < 768;
      const centerX = isMobile ? width * 0.5 : width * 0.82;
      const centerY = isMobile ? height * 0.65 : height * 0.48;
      const fov = 700;

      // Rotate and project vertices
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      const projected = vertices.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;
        // Rotate X
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;
        // Rotate Z
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = x1 * sinZ + y2 * cosZ;

        const scale = fov / (fov + z2 + 400);
        return {
          x: centerX + x3 * scale,
          y: centerY + y3 * scale,
          z: z2,
          scale
        };
      });

      // Draw red wireframe edges
      for (const [i, j] of edges) {
        const p1 = projected[i];
        const p2 = projected[j];

        // Depth-based alpha
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.08, Math.min(0.65, (avgZ + radius) / (radius * 2)));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(229, 9, 20, ${alpha})`;
        ctx.lineWidth = alpha > 0.35 ? 1.1 : 0.7;
        ctx.stroke();
      }

      // Draw glowing red vertices
      for (const p of projected) {
        const alpha = Math.max(0.2, Math.min(0.9, (p.z + radius) / (radius * 2)));
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 9, 20, ${alpha})`;
        ctx.shadowColor = '#e50914';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
