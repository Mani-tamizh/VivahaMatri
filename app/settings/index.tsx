import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { spacing } from '../../src/theme/spacing';

export default function Settings() {
  return (
    <Screen style={styles.container}>
      <View style={styles.section}>
        <Button title="Privacy Policy" variant="outline" style={styles.button} />
        <Button title="Terms of Service" variant="outline" style={styles.button} />
        <Button title="Delete Account" variant="outline" style={styles.dangerButton} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
  },
  section: {
    gap: spacing.md,
  },
  button: {
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.xl,
  },
  dangerButton: {
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.xl,
    borderColor: 'red',
  }
});
