import React from 'react';
import { PhorumThreadContent } from '../../../components/Phorum/PhorumThreadPage/__Content/PhorumThreadPageContent';
import { StaticLayout } from '../../../components/StaticLayout/StaticLayout';
import './PhorumThreadPage.scss';

interface PhorumThreadPageProps {
  title: string;
}

export const PhorumThreadPage: React.FC<PhorumThreadPageProps> = ({ title }) => {
  return (
    <StaticLayout>
      <PhorumThreadContent title={title} />
    </StaticLayout>
  );
};
