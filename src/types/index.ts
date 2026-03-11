/**
 * @fileoverview Global type definitions for the OS environment architecture.
 */

import React from 'react';

export interface Position {
    x: number;
    y: number;
}

export interface Dimensions {
    width: number | string;
    height: number | string;
}

export interface WindowState {
    id: string;
    title: string;
    isOpen: boolean;
    isFocused: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    position: Position;
    dimensions: Dimensions;
    zIndex: number;
    component: React.FC | React.LazyExoticComponent<React.FC>;
}

export interface AppMetadata {
    id: string;
    title: string;
    iconId: string;
    defaultPosition?: Position;
    defaultDimensions?: Dimensions;
}