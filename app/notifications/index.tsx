import React from 'react';
import { Screen } from '../../src/components/Screen';
import { EmptyState } from '../../src/components/EmptyState';

export default function Notifications() {
  return (
    <Screen>
      <EmptyState 
        title="No Notifications" 
        description="You're all caught up!"
      />
    </Screen>
  );
}
