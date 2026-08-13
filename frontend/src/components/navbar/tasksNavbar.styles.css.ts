import { style, styleVariants } from '@vanilla-extract/css';

export const navbarContainer = style({
  width: '320px',
  height: '100%',
  backgroundColor: '#ffffff',
  boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  zIndex: 20,
  boxSizing: 'border-box',
});

export const navbarHeader = style({
  padding: '16px 20px',
  borderBottom: '1px solid #e5e7eb',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const navbarTitle = style({
  margin: 0,
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#111827',
});

export const taskList = style({
  flex: 1,
  overflowY: 'auto',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const baseTaskCard = style({
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textAlign: 'right',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  selectors: {
    '&:hover': {
      borderColor: '#3b82f6',
      backgroundColor: '#f8fafc',
    },
  },
});

export const taskCardVariants = styleVariants({
  normal: [
    baseTaskCard,
    {
      backgroundColor: '#ffffff',
    },
  ],
  selected: [
    baseTaskCard,
    {
      backgroundColor: '#eff6ff',
      borderColor: '#2563eb',
      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.15)',
    },
  ],
});

export const taskCardTitle = style({
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: 0,
});

export const taskCardDescription = style({
  fontSize: '12px',
  color: '#6b7280',
  margin: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const taskStatusBadge = style({
  alignSelf: 'flex-start',
  fontSize: '10px',
  fontWeight: 600,
  padding: '2px 8px',
  borderRadius: '12px',
  backgroundColor: '#e0e7ff',
  color: '#3730a3',
  marginTop: '4px',
});

export const errorMessage = style({
  textAlign: 'center',
  color: '#ef4444',
  padding: '16px',
});

export const noTasksMessage = style({
  textAlign: 'center',
  color: '#9ca3af',
  padding: '16px',
});

export const loadingMessage = style({
  textAlign: 'center',
  color: '#6b7280',
  padding: '16px',
});