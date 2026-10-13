import React from 'react';
import { X, Trash2, Box, Layers, Move, RotateCw, Maximize2 } from 'lucide-react';
import type { PrimitiveType } from '../../types';

interface SceneObjectData {
  id: string;
  type: PrimitiveType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

interface ObjectSidebarProps {
  selectedObjectId: string | null;
  objects: SceneObjectData[];
  selectedRenderMode: 'shaded' | 'mesh';
  objectVertexCounts: Record<string, number>;
  onDeselectObject: () => void;
  onDeleteObject: (id: string) => void;
  onRenderModeChange: (mode: 'shaded' | 'mesh') => void;
  onObjectPositionChange: (id: string, position: [number, number, number]) => void;
  onObjectRotationChange: (id: string, rotation: [number, number, number]) => void;
  onObjectScaleChange: (id: string, scale: [number, number, number]) => void;
}

export const ObjectSidebar: React.FC<ObjectSidebarProps> = ({
  selectedObjectId,
  objects,
  selectedRenderMode,
  objectVertexCounts,
  onDeselectObject,
  onDeleteObject,
  onRenderModeChange,
  onObjectPositionChange,
  onObjectRotationChange,
  onObjectScaleChange,
}) => {
  const selectedObject = objects.find(obj => obj.id === selectedObjectId);

  if (!selectedObjectId || !selectedObject) {
    return null;
  }

  const vertexCount = objectVertexCounts[selectedObjectId] || 0;

  return (
    <div className="adw-card" style={{
      position: 'absolute',
      top: 16,
      right: 16,
      width: '280px',
      padding: '16px',
      zIndex: 100,
      maxHeight: 'calc(100vh - 80px)',
      overflowY: 'auto',
    }}>
      {/* Sidebar Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: '1px solid var(--card-border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box size={18} color="var(--accent-color)" />
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>Object Properties</h3>
        </div>
        <button
          className="adw-btn flat pill"
          onClick={onDeselectObject}
          style={{ padding: '4px' }}
          title="Deselect Object"
        >
          <X size={16} />
        </button>
      </div>

      <div className="adw-preferences-group">
        {/* Information Group */}
        <div className="adw-preferences-group-title">Metadata</div>

        <div className="adw-action-row">
          <div>
            <div className="adw-action-row-label">Shape Type</div>
            <div className="adw-action-row-subtitle" style={{ textTransform: 'capitalize' }}>
              {selectedObject.type}
            </div>
          </div>
        </div>

        <div className="adw-action-row">
          <div>
            <div className="adw-action-row-label">Geometry Detail</div>
            <div className="adw-action-row-subtitle">
              {vertexCount.toLocaleString()} Vertices
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="adw-preferences-group-title" style={{ marginTop: '12px' }}>Display</div>

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
              Shaded Surface
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

        {/* Transform: Position */}
        <div className="adw-preferences-group-title" style={{ marginTop: '12px' }}>Position</div>

        <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Move size={14} />
            <span className="adw-action-row-label">Coordinates (X, Y, Z)</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={axis} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '10px', opacity: 0.6, textAlign: 'center' }}>{axis}</span>
                <input
                  type="number"
                  className="adw-spin-input"
                  value={selectedObject.position[index].toFixed(2)}
                  step="0.1"
                  onChange={(e) => {
                    const newPos = [...selectedObject.position] as [number, number, number];
                    newPos[index] = parseFloat(e.target.value) || 0;
                    onObjectPositionChange(selectedObjectId, newPos);
                  }}
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Transform: Rotation */}
        <div className="adw-preferences-group-title" style={{ marginTop: '12px' }}>Rotation</div>

        <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RotateCw size={14} />
            <span className="adw-action-row-label">Angles (Degrees)</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={axis} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '10px', opacity: 0.6, textAlign: 'center' }}>{axis}°</span>
                <input
                  type="number"
                  className="adw-spin-input"
                  value={(selectedObject.rotation[index] * 180 / Math.PI).toFixed(0)}
                  step="5"
                  onChange={(e) => {
                    const newRot = [...selectedObject.rotation] as [number, number, number];
                    newRot[index] = (parseFloat(e.target.value) || 0) * Math.PI / 180;
                    onObjectRotationChange(selectedObjectId, newRot);
                  }}
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Transform: Scale */}
        <div className="adw-preferences-group-title" style={{ marginTop: '12px' }}>Scale</div>

        <div className="adw-action-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Maximize2 size={14} />
              <span className="adw-action-row-label">Uniform Scale</span>
            </div>
            <span className="adw-action-row-subtitle" style={{ fontWeight: 600 }}>
              {selectedObject.scale[0].toFixed(2)}x
            </span>
          </div>
          <input
            type="range"
            className="adw-slider"
            min="0.1"
            max="5"
            step="0.1"
            value={selectedObject.scale[0]}
            onChange={(e) => {
              const newScale = parseFloat(e.target.value);
              onObjectScaleChange(selectedObjectId, [newScale, newScale, newScale]);
            }}
          />
        </div>

        {/* Delete Action */}
        <div style={{ marginTop: '16px' }}>
          <button
            className="adw-btn destructive-action"
            onClick={() => onDeleteObject(selectedObjectId)}
            style={{ width: '100%', padding: '10px', gap: '8px' }}
          >
            <Trash2 size={16} />
            <span>Delete Object</span>
          </button>
        </div>
      </div>
    </div>
  );
};
