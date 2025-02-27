import { type GlobalThemeOverrides } from 'naive-ui';

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0055A4',
    primaryColorHover: '#0077CC',
    primaryColorPressed: '#003D73',
    primaryColorSuppl: '#0055A4',
    borderRadius: '6px',
    fontFamily: '"Inter", sans-serif',
    bodyColor: '#F5F7FA',
    cardColor: '#FFFFFF',
    textColorBase: '#1F2229',
    boxShadow2: '0px 4px 12px rgba(0, 85, 164, 0.2)',
  },
  Card: {
    color: '#FFFFFF',
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(0, 85, 164, 0.15)',
    titleFontWeight: '700',
    titleTextColor: '#1F2229',
    border: '2px solid #C5D1E8',
    backdropFilter: 'none',
  },
  Button: {
    textColor: 'white',
    color: '#0055A4',
    borderRadius: '6px',
    boxShadow: 'none',
    border: '2px solid #0055A4',
  },
  Input: {
    color: '#FFFFFF',
    textColor: '#1F2229',
    placeholderColor: '#7A7D8A',
    borderColor: '#C5D1E8',
    borderRadius: '6px',
    boxShadowFocus: '0px 0px 6px rgba(0, 85, 164, 0.3)',
    borderHover: '2px solid #0055A4',
    borderActive: '2px solid #0077CC',
  },
  Alert: {
    color: '#E8F0FA',
    titleTextColor: '#1F2229',
    borderRadius: '6px',
    border: '2px solid #C5D1E8',
    boxShadow: '0px 2px 6px rgba(0, 85, 164, 0.2)',
  },
};
