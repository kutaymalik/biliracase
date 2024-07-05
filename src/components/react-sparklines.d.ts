declare module 'react-sparklines' {
    import * as React from 'react';

    interface SparklinesProps {
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
      children?: React.ReactNode; // Add this line
    }

    interface SparklinesLineProps {
      color?: string;
      style?: React.CSSProperties;
    }

    export class Sparklines extends React.Component<SparklinesProps, any> {}
    export class SparklinesLine extends React.Component<SparklinesLineProps, any> {}
}
