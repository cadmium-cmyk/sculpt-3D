import React from 'react';
import { Undo2, Redo2 } from 'lucide-react';

interface UndoRedoControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const UndoRedoControls: React.FC<UndoRedoControlsProps> = ({ canUndo, canRedo, onUndo, onRedo }) => {
  return (
    <div className="adw-card" style={{
      position: 'absolute',
      bottom: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      padding: '4px 6px',
      gap: '4px',
      borderRadius: 'var(--adw-radius-pill)',
      zIndex: 100,
    }}>
      <button
        className="adw-btn pill flat"
        onClick={onUndo}
        disabled={!canUndo}
        style={{ padding: '6px 12px', fontSize: '12px' }}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 size={16} />
        <span>Undo</span>
      </button>

      <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--card-border-color)' }} />

      <button
        className="adw-btn pill flat"
        onClick={onRedo}
        disabled={!canRedo}
        style={{ padding: '6px 12px', fontSize: '12px' }}
        title="Redo (Ctrl+Shift+Z)"
      >
        <span>Redo</span>
        <Redo2 size={16} />
      </button>
    </div>
  );
};
