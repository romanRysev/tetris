import React from 'react';
import { ForumMainPageContent } from '../../../components/Forum/ForumMainPageContent/ForumMainPageContent';
import { StaticLayout } from '../../../components/StaticLayout/StaticLayout';
import './ForumMainPage.scss';

interface ForumPageProps {
  threadHeader?: string;
  repliesHeader?: string;
  lastReplyHeader?: string;
}

export const ForumMainPage: React.FC<ForumPageProps> = () => {
  return (
    <StaticLayout>
      <ForumMainPageContent />
    </StaticLayout>
  );
};

export default ForumMainPage;
