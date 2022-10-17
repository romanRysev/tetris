import React from 'react';
import { PhorumMainPageContent } from '../../../components/Phorum/PhorumMainPage/__Content/PhorumMainPageContent';
import { StaticLayout } from '../../../components/StaticLayout/StaticLayout';
import './PhorumMainPage.scss';

interface PhorumPageProps {
  threadHeader?: string;
  repliesHeader?: string;
  lastReplyHeader?: string;
}

export const PhorumMainPage: React.FC<PhorumPageProps> = () => {
  return (
    <StaticLayout>
      <PhorumMainPageContent />
    </StaticLayout>
  );
};
