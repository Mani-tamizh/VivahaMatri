import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Button } from '../../src/components/Button';
import { colors } from '../../src/theme/colors';
import { spacing, borderRadius } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';
import { useAuthStore as useAuth } from '../../src/store/authStore';

export default function PreviewStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, resetOnboarding } = useOnboardingStore();
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async () => {
    setLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      resetOnboarding();
      useAuth.getState().setOnboardingComplete();
      router.replace('/(main)/(tabs)');
    } catch (error) {
      console.error('Failed to create profile', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper component for displaying a row of info
  const InfoRow = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null;
    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Preview</Text>
        <View style={{ width: 40 }} /> {/* Placeholder for balance */}
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card Header */}
        <View style={styles.profileHeader}>
          {data.profilePhotoUri ? (
            <Image source={{ uri: data.profilePhotoUri }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Feather name="user" size={40} color={colors.textSecondary} />
            </View>
          )}
          
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.subtitle}>
            {data.gender}, {data.marital_status}
          </Text>
          <View style={styles.locationBadge}>
            <Feather name="map-pin" size={14} color={colors.textSecondary} />
            <Text style={styles.locationText}>{data.city}, {data.state}</Text>
          </View>
        </View>

        {/* About Section */}
        {data.about && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.aboutText}>{data.about}</Text>
          </View>
        )}

        {/* Basic Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Details</Text>
          <View style={styles.card}>
            <InfoRow label="Date of Birth" value={data.dob} />
            <InfoRow label="Height" value={data.height_cm} />
            <InfoRow label="Mother Tongue" value={data.mother_tongue} />
            <InfoRow label="Diet" value={data.diet} />
            <InfoRow label="Smoking" value={data.smoke} />
            <InfoRow label="Drinking" value={data.drink} />
            {data.no_of_kids && <InfoRow label="Children" value={data.no_of_kids} />}
          </View>
        </View>

        {/* Education & Career */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education & Career</Text>
          <View style={styles.card}>
            <InfoRow label="Education" value={data.education} />
            <InfoRow label="Occupation" value={data.occupation} />
            <InfoRow label="Annual Income" value={data.annual_income} />
          </View>
        </View>

        {/* Community Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Details</Text>
          <View style={styles.card}>
            <InfoRow label="Caste" value={data.caste} />
            <InfoRow label="Sub Caste" value={data.sub_caste} />
            <InfoRow label="Gothram" value={data.gothram} />
            <InfoRow label="Star" value={data.star} />
            <InfoRow label="Rasi" value={data.rasi} />
          </View>
        </View>

        {/* Family Details */}
        {(data.father_name || data.family_type) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Family Details</Text>
            <View style={styles.card}>
              <InfoRow label="Father" value={data.father_name} />
              <InfoRow label="Mother" value={data.mother_name} />
              <InfoRow label="Family Type" value={data.family_type} />
              <InfoRow label="Family Status" value={data.family_status} />
              <InfoRow label="Location" value={data.family_location} />
              {data.siblings_details && (
                <View style={[styles.infoRow, { flexDirection: 'column', alignItems: 'flex-start', gap: 4 }]}>
                  <Text style={styles.infoLabel}>Siblings</Text>
                  <Text style={styles.infoValue}>{data.siblings_details}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Partner Expectations */}
        {data.expectations && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Partner Expectations</Text>
            <Text style={styles.aboutText}>{data.expectations}</Text>
          </View>
        )}

        <View style={styles.privacyNote}>
          <Feather name="lock" size={16} color={colors.textSecondary} />
          <Text style={styles.privacyText}>
            Your contact details are securely hidden and only visible to paid premium members.
          </Text>
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => router.push('/(onboarding)/photo')}
          disabled={loading}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <View style={styles.createButtonContainer}>
          <Button 
            title={loading ? "Creating..." : "Create My Profile"} 
            onPress={handleCreateProfile}
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    ...typography.h3,
    fontWeight: '600',
  },
  backButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: spacing.lg,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.md,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  name: {
    ...typography.h2,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.text,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  aboutText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
    backgroundColor: '#FFFFFF',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F5E9',
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  privacyText: {
    flex: 1,
    fontSize: 13,
    color: '#2E7D32',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: spacing.lg,
  },
  editButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  editButtonText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  createButtonContainer: {
    flex: 1,
  },
});
