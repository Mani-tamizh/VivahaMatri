import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Input } from '../../src/components/Input';
import { Button } from '../../src/components/Button';
import { spacing } from '../../src/theme/spacing';

export default function PartnerPreferences() {
  const router = useRouter();
  
  const handleNext = () => {
    router.push('/(onboarding)/profile-photo');
  };

  return (
    <Screen safeArea={false}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Input label="Minimum Age" placeholder="e.g. 25" keyboardType="number-pad" />
          <Input label="Maximum Age" placeholder="e.g. 30" keyboardType="number-pad" />
          <Input label="Minimum Height" placeholder="e.g. 5'2&quot;" />
          <Input label="Preferred Locations" placeholder="e.g. Mumbai, Pune" />
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button title="Continue" onPress={handleNext} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  form: {
    gap: spacing.md,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  }
});
