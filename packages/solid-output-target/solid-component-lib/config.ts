type AdapterOptions = {
  /**
   * Transform the tag name of the component
   */
  transformTagName: (tagName: string) => string;
};

type OptionalAdapterOptions = Partial<AdapterOptions>;

export const CONFIG: AdapterOptions = {
  transformTagName: (tagName: string) => tagName
};

export const configAdapter = (options: OptionalAdapterOptions = {}) => {
  if (options.transformTagName) {
    if (typeof options.transformTagName !== 'function') {
      console.warn('transformTagName should be a function');
    } else if (typeof options.transformTagName('') === 'string') {
      console.warn('transformTagName should return a string');
    } else {
      CONFIG.transformTagName = options.transformTagName;
    }
  }
};
