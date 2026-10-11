import React from 'react';
import { Undo2, Redo2, Sun, Moon, Info, MousePointer, PlusCircle, Paintbrush, Move } from 'lucide-react';
import type { ToolType } from '../../types';

interface HeaderBarProps {
  currentTool: ToolType;
  selectedObjectId: string | null;
  canUndo: boolean;
  canRedo: boolean;
  theme: 'dark' | 'light';
  onToolChange: (tool: ToolType) => void;
  onUndo: () => void;
  onRedo: () => void;
  onToggleTheme: () => void;
  onOpenAbout: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentTool,
  selectedObjectId,
  canUndo,
  canRedo,
  theme,
  onToolChange,
  onUndo,
  onRedo,
  onToggleTheme,
  onOpenAbout,
}) => {
  // Determine active view mode category
  const isSelectMode = currentTool === 'select';
  const isAddMode = currentTool === 'add-primitive';
  const isSculptMode = ['add', 'subtract', 'push'].includes(currentTool);
  const isTransformMode = ['move', 'scale', 'rotate'].includes(currentTool);

  return (
    <header className="adw-headerbar" style={{
      height: '52px',
      backgroundColor: 'var(--headerbar-bg-color)',
      borderBottom: '1px solid var(--headerbar-border-color)',
      color: 'var(--headerbar-fg-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      zIndex: 1000,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      {/* Start Area: Window controls / App Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ed6a5e', display: 'inline-block' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f5bf4f', display: 'inline-block' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#62c655', display: 'inline-block' }} />
        </div>

        <div style={{ marginLeft: '8px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '-0.2px' }}>Sculpt 3D</span>
          <span style={{ fontSize: '10px', opacity: 0.65, marginTop: '-2px' }}>
            {selectedObjectId ? 'Object Selected' : 'No Selection'}
          </span>
        </div>
      </div>

      {/* Center Area: AdwViewSwitcher */}
      <div className="adw-segmented-control">
        <button
          className={`adw-segmented-button ${isSelectMode ? 'active' : ''}`}
          onClick={() => onToolChange('select')}
          title="Selection Mode"
        >
          <MousePointer size={14} />
          <span>Select</span>
        </button>

        <button
          className={`adw-segmented-button ${isAddMode ? 'active' : ''}`}
          onClick={() => onToolChange('add-primitive')}
          title="Add 3D Primitives"
        >
          <PlusCircle size={14} />
          <span>Add</span>
        </button>

        <button
          className={`adw-segmented-button ${isSculptMode ? 'active' : ''}`}
          onClick={() => onToolChange('add')}
          title="Sculpting Tools"
        >
          <Paintbrush size={14} />
          <span>Sculpt</span>
        </button>

        <button
          className={`adw-segmented-button ${isTransformMode ? 'active' : ''}`}
          onClick={() => onToolChange('move')}
          title="Transform Tools"
        >
          <Move size={14} />
          <span>Transform</span>
        </button>
      </div>

      {/* End Area: Undo/Redo, Theme Toggle, About */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          className="adw-btn flat"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={16} />
        </button>

        <button
          className="adw-btn flat"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 size={16} />
        </button>

        <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--headerbar-border-color)', margin: '0 4px' }} />

        <button
          className="adw-btn flat"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
          className="adw-btn flat"
          onClick={onOpenAbout}
          title="About Sculpt 3D"
        >
          <Info size={16} />
        </button>
      </div>
    </header>
  );
};
