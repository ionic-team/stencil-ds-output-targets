type CustomTagNameTransformer = (tagName: string) => string;

export let tagNameTransformer: CustomTagNameTransformer | undefined;
export const setCustomTagNameTransformer = (_tagNameTransformer: CustomTagNameTransformer) => {
    tagNameTransformer = _tagNameTransformer;
};
