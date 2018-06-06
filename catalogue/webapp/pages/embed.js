// @flow
import fetch from 'isomorphic-unfetch';
import {iiifImageTemplate} from '@weco/common/utils/convert-image-uri';
import ImageViewer2 from '@weco/common/views/components/ImageViewer/ImageViewer2';

const Embed = ({ work }: {| work: Object |}) => {
  const [iiifImageLocation] = work.items.map(
    item => item.locations.find(
      location => location.locationType === 'iiif-image'
    )
  );
  const iiifInfoUrl = iiifImageLocation && iiifImageLocation.url;
  const iiifImage = iiifImageTemplate(iiifInfoUrl);
  const imageUrl = iiifImage({width: 800});

  return (
    <div className='enhanced' style={{
      maxHeight: '95vh',
      maxWidth: '100vh',
      textAlign: 'center',
      position: 'relative'
    }}>
      <ImageViewer2
        contentUrl={imageUrl}
        id={work.id}
        width={800}
        trackTitle={work.title}
      />
    </div>
  );
};

Embed.getInitialProps = async({query}) => {
  const {id} = query;
  const res = await fetch(`https://api.wellcomecollection.org/catalogue/v1/works/${id}?includes=identifiers,items,thumbnail`);
  const json = await res.json();

  return {
    work: json
  };
};

export default Embed;
