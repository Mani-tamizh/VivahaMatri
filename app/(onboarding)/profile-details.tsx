import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Input } from '../../src/components/Input';
import { Button } from '../../src/components/Button';
import { spacing } from '../../src/theme/spacing';

export default function ProfileDetails() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  
  const handleNext = () => {
    // In a real app, save to state/context here
    router.push('/(onboarding)/partner-preferences');
  };

  return (
    <Screen safeArea={false}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Input label="Full Name" placeholder="Enter your full name" value={name} onChangeText={setName} />
          <Input label="Age" placeholder="Enter your age" keyboardType="number-pad" value={age} onChangeText={setAge} />
          <Input label="Height" placeholder="e.g. 5'8&quot;" />
          <Input label="Location" placeholder="City, State" />
          <Input label="Education" placeholder="Highest degree" />
          <Input label="Occupation" placeholder="Current profession" />
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button title="Continue" onPress={handleNext} disabled={!name || !age} />
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
