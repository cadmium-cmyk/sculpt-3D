import React from 'react';
import { X, Box, Code2, Sparkles, Heart } from 'lucide-react';

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="adw-dialog-overlay" onClick={onClose}>
      <div
        className="adw-dialog-window"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '24px', textAlign: 'center' }}
      >
        {/* Header bar with close button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <button className="adw-btn flat pill" onClick={onClose} style={{ padding: '6px' }}>
            <X size={16} />
          </button>
        </div>

        {/* App Logo & Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3584e4 0%, #1c71d8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 8px 16px rgba(53, 132, 228, 0.4)',
          }}>
            <Box size={36} />
          </div>

          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Sculpt 3D</h2>
            <span style={{
              display: 'inline-block',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: 600,
              borderRadius: '10px',
              backgroundColor: 'var(--button-bg-color)',
              opacity: 0.8,
              marginTop: '4px',
            }}>
              v1.0.0 • GNOME Libadwaita Edition
            </span>
          </div>
        </div>

        <p style={{ fontSize: '13px', lineHeight: 1.5, opacity: 0.85, marginBottom: '20px', padding: '0 12px' }}>
          A modern browser-based 3D modeling and sculpting application with real-time mesh manipulation, dynamic subdivision, and native GNOME Libadwaita styling.
        </p>

        {/* Info Rows */}
        <div className="adw-preferences-group" style={{ textAlign: 'left', marginBottom: '20px' }}>
          <div className="adw-action-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Code2 size={16} color="var(--accent-color)" />
              <div>
                <div className="adw-action-row-label">Technology Stack</div>
                <div className="adw-action-row-subtitle">React 19 • Three.js • Vite • TypeScript</div>
              </div>
            </div>
          </div>

          <div className="adw-action-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={16} color="var(--accent-color)" />
              <div>
                <div className="adw-action-row-label">Design System</div>
                <div className="adw-action-row-subtitle">GNOME Libadwaita & Adwaita Sans</div>
              </div>
            </div>
          </div>

          <div className="adw-action-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={16} color="var(--destructive-color)" />
              <div>
                <div className="adw-action-row-label">License</div>
                <div className="adw-action-row-subtitle">MIT License • Open Source</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer close button */}
        <button
          className="adw-btn suggested-action pill"
          onClick={onClose}
          style={{ width: '100%', padding: '10px', fontSize: '14px' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
