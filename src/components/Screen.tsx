import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

interface ScreenProps extends ViewProps {
  safeArea?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({ safeArea = true, style, children, ...props }) => {
  if (safeArea) {
    return (
      <SafeAreaView style={[styles.container, style]} {...props}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});
