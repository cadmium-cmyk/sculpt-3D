import React from 'react';
import { Paintbrush, Sliders, AlertTriangle, FlipHorizontal } from 'lucide-react';
import type { ToolType } from '../../types';
import { getToolDefinition } from '../../services/tools/toolDefinitions';

interface SculptingControlsProps {
  currentTool: ToolType;
  brushSize: number;
  brushStrength: number;
  selectedObjectId: string | null;
  symmetryAxes: { x: boolean; y: boolean; z: boolean };
  onBrushSizeChange: (size: number) => void;
  onBrushStrengthChange: (strength: number) => void;
  onSymmetryChange: (axis: 'x' | 'y' | 'z', enabled: boolean) => void;
}

export const SculptingControls: React.FC<SculptingControlsProps> = ({
  currentTool,
  brushSize,
  brushStrength,
  selectedObjectId,
  symmetryAxes,
  onBrushSizeChange,
  onBrushStrengthChange,
  onSymmetryChange,
}) => {
  const toolDef = getToolDefinition(currentTool);

  if (!toolDef.isSculptingTool) {
    return null;
  }

  return (
    <div className="adw-card" style={{
      position: 'absolute',
      top: 16,
      left: 16,
      width: '280px',
      padding: '16px',
      zIndex: 100,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: '1px solid var(--card-border-color)'
      }}>
        <Paintbrush size={18} color="var(--accent-color)" />
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>
          {toolDef.label} Brush
        </h3>
      </div>

      {!selectedObjectId ? (
        <div style={{
          backgroundColor: 'rgba(229, 165, 10, 0.12)',
          border: '1px solid var(--warning-color)',
          color: 'var(--warning-color)',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <AlertTriangle size={18} />
          <span>Select an object in the viewport to enable sculpting.</span>
        </div>
      ) : (
        <div className="adw-preferences-group">
          {/* Brush Parameters */}
          <div className="adw-preferences-group-title">Brush Parameters</div>

          <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={14} />
                <span className="adw-action-row-label">Brush Size</span>
              </div>
              <span className="adw-action-row-subtitle" style={{ fontWeight: 600 }}>
                {brushSize.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              className="adw-slider"
              min="0.1"
              max="5"
              step="0.1"
              value={brushSize}
              onChange={(e) => onBrushSizeChange(parseFloat(e.target.value))}
            />
          </div>

          <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={14} />
                <span className="adw-action-row-label">Strength</span>
              </div>
              <span className="adw-action-row-subtitle" style={{ fontWeight: 600 }}>
                {(brushStrength * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              className="adw-slider"
              min="0.1"
              max="1"
              step="0.1"
              value={brushStrength}
              onChange={(e) => onBrushStrengthChange(parseFloat(e.target.value))}
            />
          </div>

          {/* Symmetry Axes */}
          <div className="adw-preferences-group-title" style={{ marginTop: '12px' }}>Symmetry Planes</div>

          <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FlipHorizontal size={14} />
              <span className="adw-action-row-label">Mirror Axes</span>
            </div>
            <div className="adw-segmented-control" style={{ width: '100%' }}>
              {(['x', 'y', 'z'] as const).map(axis => (
                <button
                  key={axis}
                  onClick={() => onSymmetryChange(axis, !symmetryAxes[axis])}
                  className={`adw-segmented-button ${symmetryAxes[axis] ? 'active' : ''}`}
                  style={{ flex: 1, textTransform: 'uppercase', fontWeight: 600 }}
                  title={`Mirror on ${axis.toUpperCase()}-axis`}
                >
                  {axis.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Shortcut guide */}
          <div style={{
            fontSize: '11px',
            opacity: 0.7,
            marginTop: '8px',
            lineHeight: 1.5,
            padding: '8px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '6px'
          }}>
            <div><strong>Shortcuts:</strong></div>
            <div>[ / ] — Adjust size</div>
            <div>Shift + [ / ] — Adjust strength</div>
            <div>X / Y / Z — Toggle mirror planes</div>
          </div>
        </div>
      )}
    </div>
  );
};
