import React from 'react';
import { PhorumThreadPageContent } from '../../../components/Phorum/PhorumThreadPageContent/PhorumThreadPageContent';
import { StaticLayout } from '../../../components/StaticLayout/StaticLayout';
import './PhorumThreadPage.scss';

interface PhorumThreadPageProps {
  title: string;
}

export const PhorumThreadPage: React.FC<PhorumThreadPageProps> = ({ title }) => {
  return (
    <StaticLayout>
      <PhorumThreadPageContent title={title} />
    </StaticLayout>
  );
};
