import React from 'react';
import { ForumThreadPageContent } from '../../../components/Forum/ForumThreadPageContent/ForumThreadPageContent';
import { StaticLayout } from '../../../components/StaticLayout/StaticLayout';
import './ForumThreadPage.scss';

export const ForumThreadPage: React.FC = () => {
  return (
    <StaticLayout>
      <ForumThreadPageContent />
    </StaticLayout>
  );
};

export default ForumThreadPage;
