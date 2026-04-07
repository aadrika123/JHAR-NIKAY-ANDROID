import React, { useEffect, useState, useRef } from 'react';
import { InteractionManager } from 'react-native';

type Props = {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  priority?: number;
};

const InteractionsWrapper = ({
  children,
  placeholder = null,
  priority = 0,
}: Props) => {
  const [isInteractionComplete, setIsInteractionComplete] =
    useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() => {
      // Check if component is still mounted before updating state
      if (isMountedRef.current) {
        setIsInteractionComplete(true);
      }
    });

    return () => {
      isMountedRef.current = false;
      handle.cancel();
    };
  }, []);

  if (!isInteractionComplete) {
    return <>{placeholder}</>;
  }

  return <>{children}</>;
};

export default React.memo(InteractionsWrapper);
