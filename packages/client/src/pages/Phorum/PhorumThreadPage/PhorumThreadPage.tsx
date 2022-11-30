import React from 'react';
import { PhorumThreadPageContent } from '../../../components/Phorum/PhorumThreadPageContent/PhorumThreadPageContent';
import { StaticLayout } from '../../../components/StaticLayout/StaticLayout';
import './PhorumThreadPage.scss';

export const PhorumThreadPage: React.FC = () => {
  return (
    <StaticLayout>
      <PhorumThreadPageContent />
    </StaticLayout>
  );
};

export default PhorumThreadPage;
