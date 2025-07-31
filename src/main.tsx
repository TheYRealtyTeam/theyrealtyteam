import React from 'react';
import { createRoot } from 'react-dom/client';
import FreshApp from './FreshApp';

const root = createRoot(document.getElementById('root')!);
root.render(<FreshApp />);