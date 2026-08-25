import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CustomTabs } from '../../../src/components/CustomTabs';
import { ProfileCard, ProfileData } from '../../../src/components/ProfileCard';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../src/theme/colors';
import { spacing, borderRadius } from '../../../src/theme/spacing';

const RECEIVED_PROFILES: ProfileData[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    isVerified: true,
    profession: 'Software Engineer',
    location: 'Chennai',
    imageUri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: '2',
    name: 'Ananya Nair',
    age: 27,
    isVerified: true,
    profession: 'Doctor',
    location: 'Bengaluru',
    imageUri: 'https://images.unsplash.com/photo-1599842057874-37393e9342df?w=400&q=80',
  },
  {
    id: '3',
    name: 'Sneha Iyer',
    age: 25,
    isVerified: true,
    profession: 'Product Designer',
    location: 'Hyderabad',
    imageUri: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&q=80',
  }
];

const SENT_PROFILES: ProfileData[] = [
  {
    id: '4',
    name: 'Meera Krishnan',
    age: 24,
    isVerified: true,
    profession: 'HR Professional',
    location: 'Coimbatore',
    status: 'Pending',
    imageUri: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&q=80',
  },
];

export default function Interests() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('received');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Interests</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="info" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <CustomTabs 
        tabs={[
          { id: 'received', label: `Received (8)` },
          { id: 'sent', label: 'Sent (5)' }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'received' ? (
          RECEIVED_PROFILES.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              variant="received"
              onPress={() => router.push(`/profile/${profile.id}` as any)}
              onAction={(action) => console.log(action, profile.id)}
            />
          ))
        ) : (
          <>
            {/* Info Banner for Sent Tab */}
            <View style={styles.infoBanner}>
              <MaterialCommunityIcons name="shield-lock-outline" size={24} color={colors.primary} />
              <View style={styles.infoBannerTextContainer}>
                <Text style={styles.infoBannerTitle}>Interest Accepted</Text>
                <Text style={styles.infoBannerDesc}>
                  You can view contact details after subscription.
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.primary} />
            </View>

            <Text style={styles.sectionTitle}>Sent Requests</Text>

            {SENT_PROFILES.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                variant="sent"
                onPress={() => router.push(`/profile/${profile.id}` as any)}
              />
            ))}
          </>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    height: 56,
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  iconButton: {
    padding: spacing.xs,
  },
  scrollContent: {
    paddingTop: spacing.xs,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F3',
    padding: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  infoBannerTextContainer: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  infoBannerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  infoBannerDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  }
});
