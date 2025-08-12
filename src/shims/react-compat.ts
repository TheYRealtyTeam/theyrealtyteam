// React default export compatibility shim
// Provides a default export while forwarding all named exports
// to the real React package to avoid breaking modules that expect `export default`.

import * as ReactNS from 'react-original';

export default ReactNS;
export * from 'react-original';
