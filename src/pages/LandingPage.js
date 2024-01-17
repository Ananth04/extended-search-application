import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import EntitySelectionDropdown from '../components/landing/EntitySelectionDropdown';
import SearchBar from '../components/landing/SearchBar';

function LandingPage() {
  return (
    <div className='landing-page'>
      <Header />
      <div className='random-text-1'>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
        <EntitySelectionDropdown />
        <SearchBar />
      <div className='random-text-2'>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
      <Footer />
      {/* Additional content for the landing page */}
    </div>
  );
}

export default LandingPage;
