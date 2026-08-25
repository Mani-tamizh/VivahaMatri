import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, borderRadius } from '../../src/theme/spacing';
import { colors } from '../../src/theme/colors';
import { authService } from '../../src/services/auth.service';
import { useAuthStore } from '../../src/store/authStore';

export default function OTP() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(45);
  
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    // Check if the user pasted a full code
    if (text.length > 1) {
      const pasteOtp = text.slice(0, 6).split('');
      const newOtp = [...otp];
      pasteOtp.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      
      const nextIndex = Math.min(index + pasteOtp.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-advance
    if (text !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) return;
    
    setLoading(true);
    
    try {
      const response = await authService.verifyOtp(phone || '', otpString);
      
      if (response.success) {
        await useAuthStore.getState().setAuthSession({
          user: response.user || null,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          isExistingUser: response.isExistingUser
        });

        if (response.isExistingUser) {
          router.replace('/(main)/(tabs)');
        } else {
          router.replace('/(onboarding)/photo');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          
          <View style={styles.topSection}>
            {/* Top Icon Badge */}
            <View style={styles.iconContainer}>
              <View style={styles.iconOuterCircle}>
                <View style={styles.iconInnerCircle}>
                  <Text style={styles.iconText}>OTP</Text>
                </View>
              </View>
            </View>

            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>Enter the 6 digit OTP sent to</Text>
            
            <View style={styles.phoneRow}>
              <Text style={styles.phoneText}>{phone || '+91 98765 43210'}</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Feather name="edit-2" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {/* OTP Inputs */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputRefs.current[index] = ref; }}
                  style={[styles.otpInput, digit !== '' && styles.otpInputFilled]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  textContentType="oneTimeCode"
                  autoComplete="sms-otp"
                />
              ))}
            </View>
            
            {/* Resend Section */}
            <Text style={styles.resendPrompt}>Didn't receive the OTP?</Text>

            {timer > 0 ? (
              <View style={styles.timerBadge}>
                <Text style={styles.timerBadgeText}>
                  Resend OTP in <Text style={styles.timerBold}>00:{timer.toString().padStart(2, '0')}</Text>
                </Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.resendBtn} onPress={() => setTimer(45)}>
                <Feather name="refresh-cw" size={16} color={colors.primary} />
                <Text style={styles.resendBtnText}>Resend OTP</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.changePhoneBtn} onPress={() => router.back()}>
              <Feather name="phone" size={14} color={colors.primary} />
              <Text style={styles.changePhoneText}>Change mobile number</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSection}>
            {/* Verify Button */}
            <TouchableOpacity 
              style={[styles.primaryButton, (otp.join('').length < 6 || loading) && styles.primaryButtonDisabled]} 
              onPress={handleVerify}
              disabled={otp.join('').length < 6 || loading}
            >
              <Text style={styles.primaryButtonText}>{loading ? "Verifying..." : "Verify & Login"}</Text>
            </TouchableOpacity>

            {/* Footer Badge */}
            <View style={styles.footerBadge}>
              <MaterialCommunityIcons name="shield-check-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.footerText}>
                This is a secure verification.{"\n"}Your information is protected.
              </Text>
            </View>
          </View>
          
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
    paddingHorizontal: spacing.md,
    height: 56,
  },
  backBtn: {
    padding: spacing.xs,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  topSection: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  iconOuterCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF0F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  iconText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    gap: 8,
  },
  phoneText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xxl,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    borderRadius: borderRadius.md,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
    backgroundColor: colors.white,
  },
  otpInputFilled: {
    borderColor: colors.primary,
  },
  resendPrompt: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  timerBadge: {
    backgroundColor: '#FFF0F3',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  timerBadgeText: {
    color: colors.text,
    fontSize: 14,
  },
  timerBold: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    width: '100%',
    marginBottom: spacing.lg,
    gap: 8,
  },
  resendBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  changePhoneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.xl,
  },
  changePhoneText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.xl,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});
