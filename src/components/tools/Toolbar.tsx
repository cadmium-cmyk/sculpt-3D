import React from 'react';
import {
  MousePointer,
  PlusCircle,
  Plus,
  Minus,
  Move,
  Maximize2,
  Circle,
  Square,
  Database,
  Triangle,
  Disc,
} from 'lucide-react';
import type { PrimitiveType, ToolType } from '../../types';
import { TOOL_DEFINITIONS, PRIMITIVE_DEFINITIONS } from '../../services/tools/toolDefinitions';

interface ToolbarProps {
  currentTool: ToolType;
  selectedPrimitive: PrimitiveType;
  selectedObjectId: string | null;
  onToolChange: (tool: ToolType) => void;
  onPrimitiveSelect: (primitive: PrimitiveType) => void;
}

const getToolIcon = (toolId: ToolType) => {
  switch (toolId) {
    case 'select': return <MousePointer size={18} />;
    case 'add-primitive': return <PlusCircle size={18} />;
    case 'add': return <Plus size={18} />;
    case 'subtract': return <Minus size={18} />;
    case 'push': return <Move size={18} />;
    case 'move': return <Move size={18} />;
    case 'scale': return <Maximize2 size={18} />;
    default: return <MousePointer size={18} />;
  }
};

const getPrimitiveIcon = (primitiveId: PrimitiveType) => {
  switch (primitiveId) {
    case 'sphere': return <Circle size={18} />;
    case 'cube': return <Square size={18} />;
    case 'cylinder': return <Database size={18} />;
    case 'cone': return <Triangle size={18} />;
    case 'torus': return <Disc size={18} />;
    default: return <Circle size={18} />;
  }
};

export const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  selectedPrimitive,
  selectedObjectId,
  onToolChange,
  onPrimitiveSelect,
}) => {
  const hasSelectedObject = selectedObjectId !== null;

  return (
    <div style={{
      position: 'absolute',
      top: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      zIndex: 100,
    }}>
      {/* Primary Tool Toolbar */}
      <div className="adw-card" style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 8px',
        gap: '4px',
        borderRadius: 'var(--adw-radius-pill)',
      }}>
        {TOOL_DEFINITIONS.map((tool) => {
          const isDisabled = tool.requiresObject && !hasSelectedObject;
          const isActive = currentTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => !isDisabled && onToolChange(tool.id)}
              disabled={isDisabled}
              className={`adw-btn pill ${isActive ? 'suggested-action' : 'flat'}`}
              style={{
                padding: '8px 12px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: isActive ? 600 : 500,
              }}
              title={isDisabled ? `${tool.label} (Select an object first)` : tool.label}
            >
              {getToolIcon(tool.id)}
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* Primitive Sub-toolbar (When add-primitive tool is active) */}
      {currentTool === 'add-primitive' && (
        <div className="adw-card" style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 6px',
          gap: '4px',
          borderRadius: 'var(--adw-radius-pill)',
          animation: 'adw-pop-in 0.15s ease-out',
        }}>
          {PRIMITIVE_DEFINITIONS.map((primitive) => {
            const isActive = selectedPrimitive === primitive.id;
            return (
              <button
                key={primitive.id}
                onClick={() => onPrimitiveSelect(primitive.id)}
                className={`adw-btn pill ${isActive ? 'suggested-action' : 'flat'}`}
                style={{
                  padding: '6px 10px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                }}
                title={primitive.label}
              >
                {getPrimitiveIcon(primitive.id)}
                <span>{primitive.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
