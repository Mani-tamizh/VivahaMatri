import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { typography } from '../../src/theme/typography';
import { colors } from '../../src/theme/colors';
import { spacing, borderRadius } from '../../src/theme/spacing';
import { useAuthStore } from '../../src/store/authStore';
import { useRouter } from 'expo-router';

export default function Membership() {
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useAuthStore();
  const router = useRouter();

  const handleSubscribe = () => {
    setLoading(true);
    // Mocking payment success
    setTimeout(() => {
      setAuthState('active_membership');
      setLoading(false);
      router.back();
    }, 1500);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.planTitle}>Premium Membership</Text>
        <Text style={styles.price}>₹1,000</Text>
        <Text style={styles.validity}>Valid for 1 Year</Text>
        
        <View style={styles.features}>
          <Text style={styles.featureItem}>• View unlimited contact numbers</Text>
          <Text style={styles.featureItem}>• Send unlimited interests</Text>
          <Text style={styles.featureItem}>• Stand out in search results</Text>
          <Text style={styles.featureItem}>• Premium badge on profile</Text>
        </View>

        <Button title="Subscribe Now" onPress={handleSubscribe} loading={loading} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.xxl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  planTitle: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  price: {
    ...typography.heading,
    fontSize: 36,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  validity: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  features: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  featureItem: {
    ...typography.body,
    marginBottom: spacing.sm,
  }
});
