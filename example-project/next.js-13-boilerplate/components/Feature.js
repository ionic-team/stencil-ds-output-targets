import { storyblokEditable } from "@storyblok/react/rsc";

const Feature = ({ blok }) => (
  <div className="column feature" {...storyblokEditable(blok)}>
    {blok.name}
  </div>
);

export default Feature;