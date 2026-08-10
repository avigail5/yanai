import { style, styleVariants } from '@vanilla-extract/css';

export const mapWrapper = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const newTaskButtonContainer = style({
  position: 'absolute',
  top: '16px',
  left: '16px',
  zIndex: 10,
});

const baseNewTaskButton = style({
  padding: '10px 16px',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '14px',
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  transition: 'background-color 0.2s ease, transform 0.1s ease',
  selectors: {
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
});

export const addButtonVariants = styleVariants({
  add: [
    baseNewTaskButton,
    {
      backgroundColor: '#2563eb',
      selectors: {
        '&:hover': {
          backgroundColor: '#1d4ed8',
        },
      },
    },
  ],
  cancel: [
    baseNewTaskButton,
    {
      backgroundColor: '#ef4444',
      selectors: {
        '&:hover': {
          backgroundColor: '#dc2626',
        },
      },
    },
  ],
});