import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  MAP_REGIONS,
  MAP_LOCATIONS,
  MAP_PATHS,
  type MapLocation,
  type MapRegion,
  type MapPath,
} from '../lore/gm-book-data';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AethelgardMapProps {
  partyLocation: string;
  visitedLocations: string[];
  onLocationClick: (locationId: string) => void;
  activeSceneLocation?: string;
  showPaths?: boolean;
  compact?: boolean;
}

interface MapTransform {
  x: number;
  y: number;
  scale: number;
}

interface TooltipData {
  location: MapLocation;
  screenX: number;
  screenY: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DANGER_COLORS: Record<string, string> = {
  safe: '#4caf50',
  low: '#fdd835',
  medium: '#ff9800',
  high: '#f44336',
  extreme: '#9c27b0',
};

const MARKER_SIZES: Record<string, number> = {
  capital: 14,
  city: 10,
  town: 7,
  village: 5,
  dungeon: 8,
  landmark: 8,
  fortress: 9,
  special: 9,
  wilderness: 7,
};

const PATH_DASH: Record<string, string> = {
  road: 'none',
  trail: '8 4',
  sea: '4 4',
  mountain: '2 6',
  underground: '4 2 1 2',
};

const toSvg = (pct: number, dimension: number = 1000) => (pct / 100) * dimension;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CompassRose({ x, y }: { x: number; y: number }) {
  const size = 30;
  return (
    <g transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
      <circle r={size} fill="rgba(20,15,10,0.6)" stroke="#d4af37" strokeWidth={1.5} />
      {/* N arrow */}
      <polygon points={`0,-${size - 4} -5,-4 0,4 5,-4`} fill="#d4af37" />
      {/* S arrow */}
      <polygon points={`0,${size - 4} -5,4 0,-4 5,4`} fill="#8b7355" />
      {/* E arrow */}
      <polygon points={`${size - 4},0 4,-5 -4,0 4,5`} fill="#8b7355" />
      {/* W arrow */}
      <polygon points={`-${size - 4},0 -4,-5 4,0 -4,5`} fill="#8b7355" />
      <text y={-size + 10} textAnchor="middle" fill="#d4af37" fontSize={9} fontFamily="Cinzel, serif" fontWeight="bold">N</text>
      <text y={size - 4} textAnchor="middle" fill="#8b7355" fontSize={7} fontFamily="Cinzel, serif">S</text>
      <text x={size - 7} y={3} textAnchor="middle" fill="#8b7355" fontSize={7} fontFamily="Cinzel, serif">E</text>
      <text x={-size + 7} y={3} textAnchor="middle" fill="#8b7355" fontSize={7} fontFamily="Cinzel, serif">O</text>
    </g>
  );
}

function ScaleIndicator({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
      <line x1={0} y1={0} x2={80} y2={0} stroke="#d4af37" strokeWidth={2} />
      <line x1={0} y1={-4} x2={0} y2={4} stroke="#d4af37" strokeWidth={2} />
      <line x1={80} y1={-4} x2={80} y2={4} stroke="#d4af37" strokeWidth={2} />
      <text x={40} y={-6} textAnchor="middle" fill="#d4af37" fontSize={8} fontFamily="Cinzel, serif">~100 lieues</text>
    </g>
  );
}

function LocationMarker({
  location,
  isPartyHere,
  isVisited,
  isActiveScene,
  isHovered,
  dimmed,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  location: MapLocation;
  isPartyHere: boolean;
  isVisited: boolean;
  isActiveScene: boolean;
  isHovered: boolean;
  dimmed: boolean;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const cx = toSvg(location.x);
  const cy = toSvg(location.y);
  const size = MARKER_SIZES[location.type] ?? 7;
  const dangerColor = DANGER_COLORS[location.dangerLevel] ?? '#999';
  const opacity = dimmed ? 0.4 : 1;

  const renderShape = () => {
    const fill = isVisited ? dangerColor : '#555';
    const stroke = isHovered ? '#fff' : isVisited ? '#d4af37' : '#888';
    const sw = isHovered ? 2 : 1.2;

    switch (location.type) {
      case 'capital': {
        // 5-point star
        const pts = Array.from({ length: 10 }, (_, i) => {
          const r = i % 2 === 0 ? size : size * 0.45;
          const angle = (Math.PI / 2) + (i * Math.PI) / 5;
          return `${cx + r * Math.cos(angle)},${cy - r * Math.sin(angle)}`;
        }).join(' ');
        return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />;
      }
      case 'dungeon': {
        // Skull-like shape: circle + jaw
        return (
          <g>
            <circle cx={cx} cy={cy - 1} r={size * 0.7} fill={fill} stroke={stroke} strokeWidth={sw} />
            <rect x={cx - size * 0.4} y={cy + size * 0.1} width={size * 0.8} height={size * 0.5} rx={1} fill={fill} stroke={stroke} strokeWidth={sw * 0.6} />
            <circle cx={cx - 2} cy={cy - 2} r={1.5} fill="#111" />
            <circle cx={cx + 2} cy={cy - 2} r={1.5} fill="#111" />
          </g>
        );
      }
      case 'landmark': {
        // Diamond
        const pts = `${cx},${cy - size} ${cx + size * 0.7},${cy} ${cx},${cy + size} ${cx - size * 0.7},${cy}`;
        return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />;
      }
      case 'fortress': {
        // Shield shape
        const pts = `${cx - size * 0.7},${cy - size * 0.6} ${cx + size * 0.7},${cy - size * 0.6} ${cx + size * 0.7},${cy + size * 0.2} ${cx},${cy + size} ${cx - size * 0.7},${cy + size * 0.2}`;
        return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />;
      }
      case 'special': {
        // 4-point star
        const pts = `${cx},${cy - size} ${cx + size * 0.3},${cy - size * 0.3} ${cx + size},${cy} ${cx + size * 0.3},${cy + size * 0.3} ${cx},${cy + size} ${cx - size * 0.3},${cy + size * 0.3} ${cx - size},${cy} ${cx - size * 0.3},${cy - size * 0.3}`;
        return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />;
      }
      case 'wilderness': {
        // Tree shape
        return (
          <g>
            <polygon
              points={`${cx},${cy - size} ${cx + size * 0.7},${cy + size * 0.4} ${cx - size * 0.7},${cy + size * 0.4}`}
              fill={fill}
              stroke={stroke}
              strokeWidth={sw}
            />
            <rect x={cx - 1.2} y={cy + size * 0.4} width={2.4} height={size * 0.5} fill="#5d4037" />
          </g>
        );
      }
      default:
        return <circle cx={cx} cy={cy} r={size} fill={fill} stroke={stroke} strokeWidth={sw} />;
    }
  };

  return (
    <g
      style={{ cursor: 'pointer', opacity }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Active scene glow */}
      {isActiveScene && (
        <circle cx={cx} cy={cy} r={size + 8} fill="none" stroke="#00e5ff" strokeWidth={2.5} opacity={0.8}>
          <animate attributeName="r" values={`${size + 6};${size + 12};${size + 6}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Visited checkmark background */}
      {isVisited && !isPartyHere && (
        <circle cx={cx + size + 3} cy={cy - size - 3} r={4} fill="#4caf50" stroke="#2e7d32" strokeWidth={0.5} />
      )}

      {renderShape()}

      {/* Visited checkmark */}
      {isVisited && !isPartyHere && (
        <text
          x={cx + size + 3}
          y={cy - size - 0.5}
          textAnchor="middle"
          fill="#fff"
          fontSize={6}
          fontWeight="bold"
          style={{ pointerEvents: 'none' }}
        >
          ✓
        </text>
      )}

      {/* Icon emoji */}
      <text
        x={cx}
        y={cy + size + 12}
        textAnchor="middle"
        fontSize={10}
        style={{ pointerEvents: 'none' }}
      >
        {location.icon}
      </text>

      {/* Party token */}
      {isPartyHere && (
        <g>
          <circle cx={cx} cy={cy} r={size + 6} fill="none" stroke="#d4af37" strokeWidth={2.5}>
            <animate attributeName="r" values={`${size + 4};${size + 10};${size + 4}`} dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r={size + 3} fill="none" stroke="#ffd700" strokeWidth={1.5} />
        </g>
      )}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const AethelgardMap: React.FC<AethelgardMapProps> = ({
  partyLocation,
  visitedLocations,
  onLocationClick,
  activeSceneLocation,
  showPaths = true,
  compact = false,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [transform, setTransform] = useState<MapTransform>({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  const visitedSet = useMemo(() => new Set(visitedLocations), [visitedLocations]);
  const locationMap = useMemo(() => {
    const m = new Map<string, MapLocation>();
    MAP_LOCATIONS.forEach((loc) => m.set(loc.id, loc));
    return m;
  }, []);

  // -- Pan handlers --
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
    },
    [transform.x, transform.y],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setTransform((prev) => ({
        ...prev,
        x: dragStart.current!.tx + dx / prev.scale,
        y: dragStart.current!.ty + dy / prev.scale,
      }));
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
  }, []);

  // -- Zoom handler --
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setTransform((prev) => {
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      const newScale = Math.min(Math.max(prev.scale * factor, 0.5), 4);
      return { ...prev, scale: newScale };
    });
  }, []);

  // -- Tooltip --
  const handleLocationMouseEnter = useCallback(
    (loc: MapLocation, e: React.MouseEvent) => {
      setHoveredLocation(loc.id);
      setTooltip({ location: loc, screenX: e.clientX, screenY: e.clientY });
    },
    [],
  );

  const handleLocationMouseLeave = useCallback(() => {
    setHoveredLocation(null);
    setTooltip(null);
  }, []);

  // -- Render paths --
  const renderedPaths = useMemo(() => {
    if (!showPaths) return null;
    return MAP_PATHS.map((path: MapPath) => {
      const from = locationMap.get(path.from);
      const to = locationMap.get(path.to);
      if (!from || !to) return null;

      const x1 = toSvg(from.x);
      const y1 = toSvg(from.y);
      const x2 = toSvg(to.x);
      const y2 = toSvg(to.y);
      const color = DANGER_COLORS[path.dangerLevel] ?? '#888';
      const dash = PATH_DASH[path.type] ?? '4 4';

      return (
        <line
          key={path.id}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray={dash === 'none' ? undefined : dash}
          opacity={0.5}
          style={{ pointerEvents: 'none' }}
        />
      );
    });
  }, [showPaths, locationMap]);

  // -- Render regions --
  const renderedRegions = useMemo(() => {
    return MAP_REGIONS.map((region: MapRegion) => {
      const pts = region.points.map((p) => `${toSvg(p.x)},${toSvg(p.y)}`).join(' ');
      const centroid = region.points.reduce(
        (acc, p) => ({ x: acc.x + p.x / region.points.length, y: acc.y + p.y / region.points.length }),
        { x: 0, y: 0 },
      );

      return (
        <g key={region.id}>
          <polygon
            points={pts}
            fill={region.color}
            fillOpacity={0.15}
            stroke={region.color}
            strokeWidth={1.5}
            strokeOpacity={0.35}
            style={{ pointerEvents: 'none' }}
          />
          <text
            x={toSvg(centroid.x)}
            y={toSvg(centroid.y)}
            textAnchor="middle"
            fill={region.color}
            fontSize={compact ? 14 : 18}
            fontFamily="Cinzel, serif"
            fontWeight="bold"
            opacity={0.6}
            style={{ pointerEvents: 'none', textTransform: 'uppercase', letterSpacing: '2px' }}
          >
            {region.name}
          </text>
        </g>
      );
    });
  }, [compact]);

  // -- Render locations --
  const renderedLocations = useMemo(() => {
    return MAP_LOCATIONS.map((loc: MapLocation) => {
      const isVisited = visitedSet.has(loc.id);
      const isParty = loc.id === partyLocation;
      const isActive = loc.id === activeSceneLocation;
      const isHov = loc.id === hoveredLocation;
      const dimmed = !isVisited && !isParty;

      return (
        <LocationMarker
          key={loc.id}
          location={loc}
          isPartyHere={isParty}
          isVisited={isVisited}
          isActiveScene={isActive}
          isHovered={isHov}
          dimmed={dimmed}
          onMouseEnter={(e) => handleLocationMouseEnter(loc, e)}
          onMouseLeave={handleLocationMouseLeave}
          onClick={() => onLocationClick(loc.id)}
        />
      );
    });
  }, [
    visitedSet,
    partyLocation,
    activeSceneLocation,
    hoveredLocation,
    handleLocationMouseEnter,
    handleLocationMouseLeave,
    onLocationClick,
  ]);

  // -- Container style --
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: compact ? '100%' : '100%',
    maxWidth: compact ? 360 : undefined,
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    borderRadius: 8,
    border: '2px solid #d4af37',
    background: 'linear-gradient(135deg, #2c2416 0%, #1a1308 40%, #2c2416 100%)',
    boxShadow: '0 0 20px rgba(212,175,55,0.15), inset 0 0 60px rgba(0,0,0,0.5)',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
  };

  // -- Tooltip style --
  const tooltipStyle: React.CSSProperties = tooltip
    ? {
        position: 'fixed',
        left: tooltip.screenX + 14,
        top: tooltip.screenY - 10,
        background: 'rgba(20,15,10,0.95)',
        border: '1px solid #d4af37',
        borderRadius: 6,
        padding: '8px 12px',
        color: '#e8dcc8',
        fontSize: compact ? 11 : 13,
        fontFamily: 'Cinzel, serif',
        pointerEvents: 'none' as const,
        zIndex: 1000,
        maxWidth: 260,
        whiteSpace: 'nowrap' as const,
      }
    : { display: 'none' as const };

  const dangerLabel = (level: string) => {
    const labels: Record<string, string> = {
      safe: 'Safe',
      low: 'Low Danger',
      medium: 'Medium Danger',
      high: 'High Danger',
      extreme: 'Extreme Danger',
    };
    return labels[level] ?? level;
  };

  const getTravelDays = (locId: string): string => {
    const paths = MAP_PATHS.filter((p) => p.from === locId || p.to === locId);
    if (paths.length === 0) return 'Isolated';
    const min = Math.min(...paths.map((p) => p.travelDays));
    const max = Math.max(...paths.map((p) => p.travelDays));
    return min === max ? `${min}d travel` : `${min}-${max}d travel`;
  };

  return (
    <div style={containerStyle}>
      {/* Parchment texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(139,115,85,0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Parchment background */}
        <defs>
          <radialGradient id="amap-bg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#3d3222" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#1a1308" stopOpacity={0} />
          </radialGradient>
          <filter id="amap-fog">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves={3} result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
            <feComponentTransfer in="gray" result="fog">
              <feFuncA type="linear" slope="0.15" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="fog" mode="multiply" />
          </filter>
        </defs>

        <rect width="1000" height="1000" fill="url(#amap-bg)" />

        <g
          transform={`translate(${500 + transform.x * transform.scale}, ${500 + transform.y * transform.scale}) scale(${transform.scale}) translate(-500, -500)`}
          filter="url(#amap-fog)"
        >
          {/* Regions */}
          {renderedRegions}

          {/* Paths */}
          {renderedPaths}

          {/* Locations */}
          {renderedLocations}
        </g>

        {/* Compass rose (fixed position) */}
        <CompassRose x={compact ? 50 : 60} y={compact ? 50 : 60} />

        {/* Scale indicator (fixed position) */}
        <ScaleIndicator x={compact ? 830 : 860} y={compact ? 970 : 970} />

        {/* Map title */}
        <text
          x={500}
          y={compact ? 22 : 28}
          textAnchor="middle"
          fill="#d4af37"
          fontSize={compact ? 16 : 22}
          fontFamily="Cinzel, serif"
          fontWeight="bold"
          style={{ letterSpacing: '4px', textTransform: 'uppercase' }}
        >
          Aethelgard
        </text>

        {/* Gold border frame */}
        <rect
          x={2}
          y={2}
          width={996}
          height={996}
          fill="none"
          stroke="#d4af37"
          strokeWidth={2}
          rx={4}
          opacity={0.5}
        />
        <rect
          x={8}
          y={8}
          width={984}
          height={984}
          fill="none"
          stroke="#d4af37"
          strokeWidth={0.5}
          rx={2}
          opacity={0.3}
        />
      </svg>

      {/* Tooltip overlay */}
      {tooltip && (
        <div style={tooltipStyle}>
          <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: compact ? 12 : 14 }}>
            {tooltip.location.icon} {tooltip.location.name}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: compact ? 10 : 12 }}>
            <span
              style={{
                color: DANGER_COLORS[tooltip.location.dangerLevel],
                fontWeight: 600,
              }}
            >
              {dangerLabel(tooltip.location.dangerLevel)}
            </span>
            <span style={{ color: '#a09080' }}>Lvl {tooltip.location.level}</span>
            <span style={{ color: '#a09080' }}>{getTravelDays(tooltip.location.id)}</span>
          </div>
          {tooltip.location.description && (
            <div
              style={{
                marginTop: 4,
                fontSize: compact ? 9 : 11,
                color: '#a09080',
                whiteSpace: 'normal',
                maxWidth: 240,
              }}
            >
              {tooltip.location.description}
            </div>
          )}
        </div>
      )}

      {/* Zoom controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          zIndex: 10,
        }}
      >
        {[
          { label: '+', delta: 1.3 },
          { label: '-', delta: 1 / 1.3 },
          { label: '⟳', delta: 0 },
        ].map(({ label, delta }) => (
          <button
            key={label}
            onClick={() =>
              delta === 0
                ? setTransform({ x: 0, y: 0, scale: 1 })
                : setTransform((prev) => ({
                    ...prev,
                    scale: Math.min(Math.max(prev.scale * delta, 0.5), 4),
                  }))
            }
            style={{
              width: 28,
              height: 28,
              background: 'rgba(20,15,10,0.85)',
              border: '1px solid #d4af37',
              borderRadius: 4,
              color: '#d4af37',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              lineHeight: 1,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Legend */}
      {!compact && (
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            background: 'rgba(20,15,10,0.9)',
            border: '1px solid #d4af37',
            borderRadius: 6,
            padding: '8px 10px',
            fontSize: 10,
            color: '#e8dcc8',
            fontFamily: 'Cinzel, serif',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {Object.entries(DANGER_COLORS).map(([level, color]) => (
            <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: color,
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span style={{ textTransform: 'capitalize' }}>{level}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AethelgardMap;
