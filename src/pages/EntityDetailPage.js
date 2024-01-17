import React from 'react';
import Header from '../components/common/Header';
import AttributeDisplay from '../components/entitydetail/AttributeDisplay';
import RelatedEntitiesTabs from '../components/entitydetail/RelatedEntitiesTabs';

function EntityDetailPage() {
  return (
    <div>
      <Header />
      <AttributeDisplay />
      <RelatedEntitiesTabs />
      {/* Additional content for the entity detail page */}
    </div>
  );
}

export default EntityDetailPage;
