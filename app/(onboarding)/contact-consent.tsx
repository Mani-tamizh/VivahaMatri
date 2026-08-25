import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm as useRHForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { ContactConsentForm, contactConsentSchema } from '../../src/schemas/onboardingSchema';
import { StepIndicator } from '../../src/components/StepIndicator';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { colors } from '../../src/theme/colors';
import { spacing, borderRadius } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function ContactConsentStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, updateData } = useOnboardingStore();
  const [sameAsPhone, setSameAsPhone] = useState(true);
  
  // Mock verified phone from Auth flow
  const verifiedPhone = data.phone || '+91 98765 43210';

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useRHForm<ContactConsentForm>({
    resolver: zodResolver(contactConsentSchema),
    defaultValues: {
      whatsapp_number: data.whatsapp_number || verifiedPhone,
      email: data.email || '',
      // @ts-ignore (we know it's bool but zod expects literal true)
      declare_truth: data.declare_truth || false,
      // @ts-ignore
      declare_share_consent: data.declare_share_consent || false,
    },
  });

  const declareTruth = watch('declare_truth');
  const declareConsent = watch('declare_share_consent');

  useEffect(() => {
    if (sameAsPhone) {
      setValue('whatsapp_number', verifiedPhone);
    } else {
      setValue('whatsapp_number', '');
    }
  }, [sameAsPhone]);

  const onSubmit = (formData: ContactConsentForm) => {
    updateData({ ...formData, phone: verifiedPhone });
    router.push('/(onboarding)/preview');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <StepIndicator currentStep={9} totalSteps={10} />

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Contact & Privacy</Text>

        <View style={styles.verifiedPhoneCard}>
          <Text style={styles.verifiedLabel}>Phone Number</Text>
          <View style={styles.verifiedRow}>
            <Text style={styles.verifiedNumber}>{verifiedPhone}</Text>
            <View style={styles.verifiedBadge}>
              <Feather name="check" size={14} color="#FFFFFF" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={styles.checkboxRow} 
            onPress={() => setSameAsPhone(!sameAsPhone)}
          >
            <MaterialCommunityIcons 
              name={sameAsPhone ? "checkbox-marked" : "checkbox-blank-outline"} 
              size={24} 
              color={sameAsPhone ? colors.primary : colors.textSecondary} 
            />
            <Text style={styles.checkboxLabel}>WhatsApp number is same as phone</Text>
          </TouchableOpacity>
        </View>

        {!sameAsPhone && (
          <Controller
            control={control}
            name="whatsapp_number"
            render={({ field: { onChange, value } }) => (
              <Input
                label="WhatsApp Number"
                placeholder="Enter WhatsApp number"
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChange}
                error={errors.whatsapp_number?.message}
              />
            )}
          />
        )}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email Address (Optional)"
              placeholder="e.g. name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Text style={[styles.title, { marginTop: spacing.lg, fontSize: 18 }]}>Consent</Text>
        
        <View style={styles.consentContainer}>
          <Controller
            control={control}
            name="declare_truth"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity 
                style={styles.consentRow} 
                onPress={() => onChange(!value)}
              >
                <View style={styles.consentCheckbox}>
                  <MaterialCommunityIcons 
                    name={value ? "checkbox-marked" : "checkbox-blank-outline"} 
                    size={24} 
                    color={value ? colors.primary : colors.textSecondary} 
                  />
                </View>
                <Text style={styles.consentText}>
                  I confirm that the information provided by me is true and accurate.
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.declare_truth && <Text style={styles.errorText}>{errors.declare_truth.message}</Text>}

          <Controller
            control={control}
            name="declare_share_consent"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity 
                style={styles.consentRow} 
                onPress={() => onChange(!value)}
              >
                <View style={styles.consentCheckbox}>
                  <MaterialCommunityIcons 
                    name={value ? "checkbox-marked" : "checkbox-blank-outline"} 
                    size={24} 
                    color={value ? colors.primary : colors.textSecondary} 
                  />
                </View>
                <Text style={styles.consentText}>
                  I agree that my profile information can be shared with registered VivahaMatri members for matrimonial purposes.
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.declare_share_consent && <Text style={styles.errorText}>{errors.declare_share_consent.message}</Text>}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Continue" 
          onPress={handleSubmit(onSubmit)}
          disabled={!declareTruth || !declareConsent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.xl,
  },
  verifiedPhoneCard: {
    backgroundColor: '#F8F9FA',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  verifiedLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  verifiedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verifiedNumber: {
    ...typography.h3,
    color: colors.text,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981', // Green
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    marginBottom: spacing.xl,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkboxLabel: {
    ...typography.body,
    color: colors.text,
  },
  consentContainer: {
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  consentCheckbox: {
    marginTop: 2,
  },
  consentText: {
    flex: 1,
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginLeft: 36,
    marginTop: -spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});
