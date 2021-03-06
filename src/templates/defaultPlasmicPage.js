import React from "react";
import Helmet from "react-helmet";
import {
  initPlasmicLoader,
  PlasmicComponent,
  PlasmicRootProvider,
} from "@plasmicapp/loader-gatsby";
import { graphql } from "gatsby";

export const query = graphql`
  query ($path: String) {
    plasmicComponents(componentNames: [$path])
    plasmicOptions
  }
`;

const PlasmicGatsbyPage = ({ data, location }) => {
  const {
    plasmicComponents,
    plasmicOptions,
  } = data;
  const pageMeta = plasmicComponents.entryCompMetas[0];
  const pageMetadata = pageMeta.pageMetadata;
  return (
    <PlasmicRootProvider
      loader={initPlasmicLoader(plasmicOptions)}
      prefetchedData={plasmicComponents}
    >
      <Helmet>
        {pageMetadata.title && <title>{pageMetadata.title}</title>}
        {pageMetadata.title && <meta property="og:title" content={pageMetadata.title} /> }
        {pageMetadata.description && <meta property="og:description" content={pageMetadata.description} />}
        {pageMetadata.openGraphImageUrl && <meta property="og:image" content={pageMetadata.openGraphImageUrl} />}
      </Helmet>
      <PlasmicComponent component={pageMeta.name} />
    </PlasmicRootProvider>
  );
};

export default PlasmicGatsbyPage;