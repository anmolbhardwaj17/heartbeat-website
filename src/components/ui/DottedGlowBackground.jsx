import { useEffect, useRef } from "react"

export function DottedGlowBackground({
  gap = 10,
  radius = 1.6,
  opacity = 1,
  glowColor = "rgba(230, 57, 70, 0.6)",
  dotColor = "rgba(150, 150, 150, 0.3)",
  speedMin = 0.3,
  speedMax = 1.6,
  speedScale = 1,
  className = "",
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let animFrame
    let dots = []
    let width = 0
    let height = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.ceil(width / gap)
      const rows = Math.ceil(height / gap)
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * gap + gap / 2,
            y: r * gap + gap / 2,
            phase: Math.random() * Math.PI * 2,
            speed: (speedMin + Math.random() * (speedMax - speedMin)) * speedScale,
          })
        }
      }
    }

    resize()
    window.addEventListener("resize", resize)

    const cx = () => width / 2
    const cy = () => height * 0.45

    const draw = (timestamp) => {
      const time = timestamp / 1000
      ctx.clearRect(0, 0, width, height)

      const centerX = cx()
      const centerY = cy()
      // Radius of the clear zone in the middle (where hero text is)
      const clearRadius = Math.min(width, height) * 0.42

      for (const dot of dots) {
        // Distance from center
        const dx = dot.x - centerX
        const dy = dot.y - centerY
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Mask: fade out dots near center, full visibility at edges
        const maskAlpha = Math.min(1, Math.max(0, (dist - clearRadius) / (clearRadius * 0.5)))
        if (maskAlpha < 0.01) continue

        // Shimmer wave
        const wave = Math.sin(time * dot.speed + dot.phase)
        const glow = Math.max(0, (wave - 0.2) / 0.8)

        const r = radius + glow * 2
        const dotOpacity = (0.1 + glow * 0.9) * maskAlpha * opacity

        if (dotOpacity < 0.01) continue

        const size = r * 2

        if (glow > 0.05) {
          // Glowing square
          ctx.fillStyle = glowColor.replace(/[\d.]+\)$/, `${dotOpacity})`)
          ctx.fillRect(dot.x - size / 2, dot.y - size / 2, size, size)

          // Soft halo for bright squares
          if (glow > 0.4) {
            const haloSize = size + glow * 4
            ctx.fillStyle = glowColor.replace(/[\d.]+\)$/, `${glow * 0.12 * maskAlpha * opacity})`)
            ctx.fillRect(dot.x - haloSize / 2, dot.y - haloSize / 2, haloSize, haloSize)
          }
        } else {
          // Dim base square
          ctx.fillStyle = dotColor.replace(/[\d.]+\)$/, `${0.15 * maskAlpha * opacity})`)
          ctx.fillRect(dot.x - size / 2, dot.y - size / 2, size, size)
        }
      }

      animFrame = requestAnimationFrame(draw)
    }

    animFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener("resize", resize)
    }
  }, [gap, radius, opacity, glowColor, dotColor, speedMin, speedMax, speedScale])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  )
}
