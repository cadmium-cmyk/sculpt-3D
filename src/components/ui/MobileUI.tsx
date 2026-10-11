import React, { useState, useEffect } from 'react';
import {
  MousePointer,
  PlusCircle,
  Move,
  Maximize2,
  Paintbrush,
  Undo2,
  Redo2,
  Settings,
  X,
  Trash2,
  Plus,
  Minus,
  Sliders,
  Layers
} from 'lucide-react';
import type { ToolType, PrimitiveType } from '../../types';

interface MobileUIProps {
  currentTool: ToolType;
  setCurrentTool: (tool: ToolType) => void;
  selectedPrimitive: PrimitiveType;
  setSelectedPrimitive: (primitive: PrimitiveType) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  brushStrength: number;
  setBrushStrength: (strength: number) => void;
  symmetryAxes: { x: boolean; y: boolean; z: boolean };
  setSymmetryAxes: (axes: { x: boolean; y: boolean; z: boolean }) => void;
  selectedRenderMode: 'shaded' | 'mesh';
  onRenderModeChange: (mode: 'shaded' | 'mesh') => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onDeleteSelected: () => void;
  hasSelection: boolean;
}

export const MobileUI: React.FC<MobileUIProps> = ({
  currentTool,
  setCurrentTool,
  selectedPrimitive,
  setSelectedPrimitive,
  brushSize,
  setBrushSize,
  brushStrength,
  setBrushStrength,
  symmetryAxes,
  setSymmetryAxes,
  selectedRenderMode,
  onRenderModeChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onDeleteSelected,
  hasSelection,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showPrimitives, setShowPrimitives] = useState(false);
  const [showSculptControls, setShowSculptControls] = useState(false);
  const [showSculptTools, setShowSculptTools] = useState(false);

  const mainTools: { type: ToolType; icon: React.ReactNode; label: string }[] = [
    { type: 'select', icon: <MousePointer size={18} />, label: 'Select' },
    { type: 'add-primitive', icon: <PlusCircle size={18} />, label: 'Add' },
    { type: 'move', icon: <Move size={18} />, label: 'Move' },
    { type: 'scale', icon: <Maximize2 size={18} />, label: 'Scale' },
  ];

  const sculptTools: { type: ToolType; icon: React.ReactNode; label: string }[] = [
    { type: 'add', icon: <Plus size={18} />, label: 'Add Material' },
    { type: 'subtract', icon: <Minus size={18} />, label: 'Subtract' },
    { type: 'push', icon: <Move size={18} />, label: 'Push' },
  ];

  const primitives: PrimitiveType[] = ['sphere', 'cube', 'cylinder', 'cone', 'torus'];
  const isSculptTool = ['add', 'subtract', 'push'].includes(currentTool);

  useEffect(() => {
    if (currentTool !== 'add-primitive') {
      setShowPrimitives(false);
    }
  }, [currentTool]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      pointerEvents: 'none',
    }}>
      {/* Header bar for mobile */}
      <div className="adw-card" style={{
        margin: '8px',
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'auto',
        borderRadius: 'var(--adw-radius-pill)',
      }}>
        {/* Tool selector */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {mainTools.map(tool => (
            <button
              key={tool.type}
              className={`adw-btn pill ${currentTool === tool.type ? 'suggested-action' : 'flat'}`}
              onClick={() => {
                setCurrentTool(tool.type);
                if (tool.type === 'add-primitive') {
                  setShowPrimitives(!showPrimitives);
                } else {
                  setShowPrimitives(false);
                }
                setShowSculptTools(false);
              }}
              style={{ padding: '8px', minWidth: '36px', height: '36px' }}
              title={tool.label}
            >
              {tool.icon}
            </button>
          ))}

          {/* Sculpt Tools trigger */}
          <button
            className={`adw-btn pill ${isSculptTool ? 'suggested-action' : 'flat'}`}
            onClick={() => {
              setShowSculptTools(!showSculptTools);
              setShowPrimitives(false);
            }}
            style={{ padding: '8px', minWidth: '36px', height: '36px' }}
            title="Sculpting Tools"
          >
            <Paintbrush size={18} />
          </button>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            className="adw-btn pill flat"
            onClick={onUndo}
            disabled={!canUndo}
            style={{ padding: '8px' }}
          >
            <Undo2 size={16} />
          </button>
          <button
            className="adw-btn pill flat"
            onClick={onRedo}
            disabled={!canRedo}
            style={{ padding: '8px' }}
          >
            <Redo2 size={16} />
          </button>
          <button
            className="adw-btn pill flat"
            onClick={() => setShowSettings(!showSettings)}
            style={{ padding: '8px' }}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Sculpting Sub-tools Sheet */}
      {showSculptTools && (
        <div className="adw-card" style={{
          margin: '0 8px 8px 8px',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          pointerEvents: 'auto',
          animation: 'adw-pop-in 0.15s ease-out',
        }}>
          {sculptTools.map(tool => (
            <button
              key={tool.type}
              className={`adw-btn ${currentTool === tool.type ? 'suggested-action' : 'flat'}`}
              onClick={() => {
                setCurrentTool(tool.type);
                setShowSculptTools(false);
              }}
              style={{ justifyContent: 'flex-start', padding: '10px 12px' }}
            >
              {tool.icon}
              <span style={{ fontSize: '13px' }}>{tool.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Primitive Shapes Sheet */}
      {showPrimitives && (
        <div className="adw-card" style={{
          margin: '0 8px 8px 8px',
          padding: '8px',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          pointerEvents: 'auto',
          animation: 'adw-pop-in 0.15s ease-out',
        }}>
          {primitives.map(primitive => (
            <button
              key={primitive}
              className={`adw-btn pill ${selectedPrimitive === primitive ? 'suggested-action' : 'flat'}`}
              onClick={() => {
                setSelectedPrimitive(primitive);
                setShowPrimitives(false);
              }}
              style={{ whiteSpace: 'nowrap', textTransform: 'capitalize', fontSize: '12px' }}
            >
              {primitive}
            </button>
          ))}
        </div>
      )}

      {/* Sculpt controls toggle */}
      {isSculptTool && (
        <div style={{ margin: '8px', pointerEvents: 'auto' }}>
          <button
            className="adw-btn adw-card"
            onClick={() => setShowSculptControls(!showSculptControls)}
            style={{ width: '100%', justifyContent: 'space-between', padding: '10px 14px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={16} color="var(--accent-color)" />
              <span>Brush Settings</span>
            </div>
            <span>{showSculptControls ? '▲' : '▼'}</span>
          </button>
        </div>
      )}

      {/* Expanded Sculpt Controls Sheet */}
      {isSculptTool && showSculptControls && (
        <div className="adw-card" style={{
          margin: '0 8px 8px 8px',
          padding: '16px',
          pointerEvents: 'auto',
          animation: 'adw-pop-in 0.15s ease-out',
        }}>
          <div className="adw-preferences-group">
            <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
              <span className="adw-action-row-label">Size: {Math.round(brushSize * 100)}%</span>
              <input
                type="range"
                className="adw-slider"
                min="10"
                max="500"
                value={brushSize * 100}
                onChange={(e) => setBrushSize(parseInt(e.target.value) / 100)}
              />
            </div>

            <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
              <span className="adw-action-row-label">Strength: {Math.round(brushStrength * 100)}%</span>
              <input
                type="range"
                className="adw-slider"
                min="10"
                max="100"
                value={brushStrength * 100}
                onChange={(e) => setBrushStrength(parseInt(e.target.value) / 100)}
              />
            </div>

            <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
              <span className="adw-action-row-label">Symmetry Axes</span>
              <div className="adw-segmented-control" style={{ width: '100%' }}>
                <button
                  className={`adw-segmented-button ${symmetryAxes.x ? 'active' : ''}`}
                  onClick={() => setSymmetryAxes({ ...symmetryAxes, x: !symmetryAxes.x })}
                  style={{ flex: 1 }}
                >
                  X
                </button>
                <button
                  className={`adw-segmented-button ${symmetryAxes.y ? 'active' : ''}`}
                  onClick={() => setSymmetryAxes({ ...symmetryAxes, y: !symmetryAxes.y })}
                  style={{ flex: 1 }}
                >
                  Y
                </button>
                <button
                  className={`adw-segmented-button ${symmetryAxes.z ? 'active' : ''}`}
                  onClick={() => setSymmetryAxes({ ...symmetryAxes, z: !symmetryAxes.z })}
                  style={{ flex: 1 }}
                >
                  Z
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Settings Modal Flap */}
      {showSettings && (
        <div className="adw-card" style={{
          position: 'fixed',
          top: '60px',
          right: '8px',
          left: '8px',
          maxWidth: '360px',
          margin: '0 auto',
          padding: '16px',
          pointerEvents: 'auto',
          animation: 'adw-pop-in 0.15s ease-out',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Mobile Settings</h3>
            <button className="adw-btn flat pill" onClick={() => setShowSettings(false)} style={{ padding: '4px' }}>
              <X size={16} />
            </button>
          </div>

          {hasSelection && (
            <div className="adw-preferences-group" style={{ marginBottom: '12px' }}>
              <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={14} />
                  <span className="adw-action-row-label">Render Mode</span>
                </div>
                <div className="adw-segmented-control" style={{ width: '100%' }}>
                  <button
                    className={`adw-segmented-button ${selectedRenderMode === 'shaded' ? 'active' : ''}`}
                    onClick={() => onRenderModeChange('shaded')}
                    style={{ flex: 1 }}
                  >
                    Shaded
                  </button>
                  <button
                    className={`adw-segmented-button ${selectedRenderMode === 'mesh' ? 'active' : ''}`}
                    onClick={() => onRenderModeChange('mesh')}
                    style={{ flex: 1 }}
                  >
                    Wireframe
                  </button>
                </div>
              </div>

              <button
                className="adw-btn destructive-action"
                onClick={() => {
                  onDeleteSelected();
                  setShowSettings(false);
                }}
                style={{ width: '100%', padding: '10px', marginTop: '8px' }}
              >
                <Trash2 size={16} />
                <span>Delete Selected</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
