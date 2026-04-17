import { serializeJsonLd } from '../../utils/seo';

const StructuredData = ({ data }: { data: Record<string, unknown> }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
);

export default StructuredData;
