import React from 'react';
import ReactDom from 'react-dom';

import { attachProps, createForwardRef, dashToPascalCase, isCoveredByReact } from './utils';

interface StencilReactInternalProps<ElementType> extends React.HTMLAttributes<ElementType> {
  forwardedRef?: React.Ref<ElementType>;
  ref?: React.Ref<any>;
}
export const NavContext = React.createContext<{}>({});

export const createReactComponent = <
  PropType,
  ElementType,
  ContextStateType = {},
  ExpandedPropsTypes = {}
>(
  tagName: string,
  reactComponentContext?: React.Context<ContextStateType>,
  manipulatePropsFunction: (
    originalProps: StencilReactInternalProps<PropType>,
    propsToPass: any,
  ) => ExpandedPropsTypes = undefined,
) => {
  const displayName = dashToPascalCase(tagName);
  const ReactComponent = class extends React.Component<StencilReactInternalProps<PropType>> {
    context!: React.Context<typeof reactComponentContext>;

    constructor(props: StencilReactInternalProps<PropType>) {
      super(props);
    }

    componentDidMount() {
      this.componentDidUpdate(this.props);
    }

    componentDidUpdate(prevProps: StencilReactInternalProps<PropType>) {
      const node = ReactDom.findDOMNode(this) as HTMLElement;
      attachProps(node, this.props, prevProps);
    }

    render() {
      const { children, forwardedRef, style, className, ref, ...cProps } = this.props;

      let propsToPass = Object.keys(cProps).reduce((acc, name) => {
        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          const eventName = name.substring(2).toLowerCase();
          if (isCoveredByReact(eventName)) {
            (acc as any)[name] = (cProps as any)[name];
          }
        }
        return acc;
      }, {});

      if (manipulatePropsFunction) {
        propsToPass = manipulatePropsFunction(this.props, propsToPass);
      }

      let newProps: StencilReactInternalProps<PropType> = {
        ...propsToPass,
        ref: forwardedRef,
        style,
      };

      return React.createElement(tagName, newProps, children);
    }

    static get displayName() {
      return displayName;
    }

    static get contextType() {
      return reactComponentContext;
    }
  };
  return createForwardRef<PropType, ElementType>(ReactComponent, displayName);
};
