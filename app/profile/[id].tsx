import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { mockProfiles } from '../../src/lib/mockData';
import { typography } from '../../src/theme/typography';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { useAuthStore } from '../../src/store/authStore';

export default function ProfileDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const profile = mockProfiles.find(p => p.id === id);
  const { authState } = useAuthStore();
  const hasMembership = authState === 'active_membership';

  if (!profile) {
    return (
      <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={typography.title}>Profile not found</Text>
      </Screen>
    );
  }

  return (
    <Screen safeArea={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: profile.profilePhotoUrl }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{profile.name}, {profile.age}</Text>
          <Text style={styles.subtitle}>{profile.location}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.body}>{profile.about}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education & Career</Text>
            <Text style={styles.body}>{profile.education}</Text>
            <Text style={styles.body}>{profile.occupation}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Info</Text>
            {hasMembership ? (
              <Text style={styles.body}>{profile.contactNumber || 'Contact details shared upon interest acceptance.'}</Text>
            ) : (
              <Text style={[styles.body, styles.locked]}>Contact details available with active membership</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Shortlist" variant="outline" style={{ flex: 1, marginRight: spacing.sm }} />
        <Button title="Send Interest" style={{ flex: 1, marginLeft: spacing.sm }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xxl * 3,
  },
  image: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: spacing.xl,
  },
  title: {
    ...typography.heading,
  },
  subtitle: {
    ...typography.title,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  body: {
    ...typography.body,
    lineHeight: 24,
  },
  locked: {
    color: colors.primary,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.xl,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});
