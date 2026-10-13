import React from 'react';
import { Info, HelpCircle } from 'lucide-react';
import type { ToolType, PrimitiveType } from '../../types';
import { getToolDefinition } from '../../services/tools/toolDefinitions';

interface StatusOverlayProps {
  currentTool: ToolType;
  selectedPrimitive: PrimitiveType;
}

export const StatusOverlay: React.FC<StatusOverlayProps> = ({ currentTool, selectedPrimitive }) => {
  const toolDef = getToolDefinition(currentTool);

  return (
    <div className="adw-card" style={{
      position: 'absolute',
      bottom: 16,
      left: 16,
      maxWidth: '320px',
      padding: '12px 16px',
      zIndex: 100,
      fontSize: '12px',
      lineHeight: 1.4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '4px' }}>
        <Info size={14} color="var(--accent-color)" />
        <span>{toolDef.label}</span>
      </div>

      <div style={{ opacity: 0.85, marginBottom: '8px' }}>
        {currentTool === 'select' && 'Click objects in the scene to select'}
        {currentTool === 'add-primitive' && `Click and drag in viewport to place ${selectedPrimitive}`}
        {toolDef.helpText && currentTool !== 'select' && currentTool !== 'add-primitive' && toolDef.helpText}
      </div>

      <div style={{
        borderTop: '1px solid var(--card-border-color)',
        paddingTop: '6px',
        fontSize: '11px',
        opacity: 0.7,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <HelpCircle size={12} />
        <span>Orbit: Middle Click • Pan: Right Click • Zoom: Scroll</span>
      </div>
    </div>
  );
};
