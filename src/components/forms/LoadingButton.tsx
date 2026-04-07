import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';

interface ILoadingButton extends ButtonProps {
  loading: boolean;
  children: React.ReactNode;
  bgColor?: string;
}

export default function LoadingButton({
  children,
  bgColor = 'darkred',
  ...props
}: Readonly<ILoadingButton>) {
  return (
    <Button
      style={{
        width: '100%',
        backgroundColor: bgColor,
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 20,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        justifyContent: 'center',
      }}
      labelStyle={{ color: '#fff', fontWeight: '600' }}
      contentStyle={{
        height: '100%',
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
