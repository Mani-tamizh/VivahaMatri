import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Screen } from '../../../src/components/Screen';
import { CustomTabs } from '../../../src/components/CustomTabs';
import { ProfileCard, ProfileData } from '../../../src/components/ProfileCard';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';

const MOCK_PROFILES: ProfileData[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    isVerified: true,
    profession: 'Software Engineer',
    location: 'Chennai, Tamil Nadu',
    height: "5'4\"",
    religion: 'Hindu',
    caste: 'Iyer',
    imageUri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: '2',
    name: 'Ananya Nair',
    age: 27,
    isVerified: true,
    profession: 'Doctor',
    location: 'Bengaluru, Karnataka',
    height: "5'5\"",
    religion: 'Hindu',
    caste: 'Nair',
    imageUri: 'https://images.unsplash.com/photo-1599842057874-37393e9342df?w=400&q=80',
  },
  {
    id: '3',
    name: 'Sneha Iyer',
    age: 25,
    isVerified: true,
    profession: 'Product Designer',
    location: 'Hyderabad, Telangana',
    height: "5'3\"",
    religion: 'Hindu',
    caste: 'Iyer',
    imageUri: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&q=80',
  },
  {
    id: '4',
    name: 'Meera Krishnan',
    age: 24,
    isVerified: true,
    profession: 'HR Professional',
    location: 'Coimbatore, Tamil Nadu',
    height: "5'2\"",
    religion: 'Hindu',
    caste: 'Nair',
    imageUri: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&q=80',
  },
];

export default function Shortlist() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shortlist</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="heart" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <CustomTabs 
        tabs={[
          { id: 'all', label: `All (${MOCK_PROFILES.length})` },
          { id: 'recent', label: 'Recently Added' }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {MOCK_PROFILES.map(profile => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            variant="shortlist"
            onPress={() => router.push(`/profile/${profile.id}` as any)}
            onAction={() => console.log('Remove from shortlist', profile.id)}
          />
        ))}
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
});
