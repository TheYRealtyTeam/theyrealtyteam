declare global {
  interface Window {
    Appfolio?: {
      Listing: (config: {
        hostUrl: string;
        propertyGroup?: string;
        themeColor?: string;
        height?: string;
        width?: string;
        defaultOrder?: string;
      }) => void;
    };
  }
}

export {};