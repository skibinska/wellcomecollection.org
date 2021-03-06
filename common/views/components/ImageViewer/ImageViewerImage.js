// @flow
import fetch from 'isomorphic-unfetch';
import openseadragon from 'openseadragon';
import { useState, useEffect, useContext } from 'react';
import { spacing } from '../../../utils/classnames';
import { ImageInfoContext } from '../ImageViewer/ImageViewer';

function setupViewer(imageInfoSrc, viewerId, handleScriptError) {
  fetch(imageInfoSrc)
    .then(response => response.json())
    .then(response => {
      openseadragon({
        id: `image-viewer-${viewerId}`,
        visibilityRatio: 1,
        showFullPageControl: false,
        showHomeControl: false,
        zoomInButton: `zoom-in-${viewerId}`,
        zoomOutButton: `zoom-out-${viewerId}`,
        showNavigator: true,
        controlsFadeDelay: 0,
        animationTime: 0.5,
        tileSources: [
          {
            '@context': 'http://iiif.io/api/image/2/context.json',
            '@id': response['@id'],
            height: response.height,
            width: response.width,
            profile: ['http://iiif.io/api/image/2/level2.json'],
            protocol: 'http://iiif.io/api/image',
            tiles: [
              {
                scaleFactors: [1, 2, 4, 8, 16, 32],
                width: 400,
              },
            ],
          },
        ],
      });
    })
    .catch(_ => {
      handleScriptError();
    });
}

const ErrorMessage = () => (
  <div
    className={`image-viewer__error ${spacing(
      { s: 5 },
      { padding: ['left', 'right', 'top', 'bottom'] }
    )}`}
  >
    <p>The image viewer is not working.</p>
  </div>
);

type Props = {|
  id: string,
|};

const ImageViewerImage = ({ id }: Props) => {
  const [scriptError, setScriptError] = useState(false);
  const infoUrl = useContext(ImageInfoContext);

  const handleScriptError = () => {
    setScriptError(true);
  };

  useEffect(() => {
    setupViewer(infoUrl, id, handleScriptError);
  }, []);

  return (
    <div className="image-viewer__image" id={`image-viewer-${id}`}>
      {scriptError && <ErrorMessage />}
    </div>
  );
};

export default ImageViewerImage;
