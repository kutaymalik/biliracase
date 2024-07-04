declare module 'react-sparklines' {
    import * as React from 'react';
  
    export interface SparklinesProps {
      data: number[];
      limit?: number;
      width?: number;
      height?: number;
      svgWidth?: number;
      svgHeight?: number;
      preserveAspectRatio?: string;
      margin?: number;
      min?: number;
      max?: number;
      style?: React.CSSProperties;
    }
  
    export interface SparklinesLineProps {
      color?: string;
      style?: React.CSSProperties;
    }
  
    export class Sparklines extends React.Component<SparklinesProps> {}
    export class SparklinesLine extends React.Component<SparklinesLineProps> {}
  }
  