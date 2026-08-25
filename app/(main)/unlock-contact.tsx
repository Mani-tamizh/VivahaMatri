import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/colors';
import { spacing, borderRadius } from '../../src/theme/spacing';

export default function UnlockContact() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Unlock Contact</Text>
        <View style={{ width: 40 }} /> {/* Placeholder for balance */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Shield Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.shieldBackground}>
            <MaterialCommunityIcons name="shield-crown" size={48} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>Unlock Contact Details</Text>
        <Text style={styles.subtitle}>
          Get contact number and connect{'\n'}with your perfect match.
        </Text>

        {/* Membership Plan Card */}
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <View>
              <Text style={styles.planSubTitle}>Membership Plan</Text>
              <Text style={styles.planValidity}>1 Year Validity</Text>
            </View>
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>POPULAR</Text>
            </View>
          </View>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Feather name="check" size={16} color={colors.primary} />
              <Text style={styles.featureText}>View <Text style={styles.highlightText}>contact number</Text></Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="check" size={16} color={colors.primary} />
              <Text style={styles.featureText}>Chat and <Text style={styles.highlightText}>communicate</Text></Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="check" size={16} color={colors.primary} />
              <Text style={styles.featureText}>Priority <Text style={styles.highlightText}>customer support</Text></Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="check" size={16} color={colors.primary} />
              <Text style={styles.featureText}>1 Year membership</Text>
            </View>
          </View>

          <Text style={styles.priceText}>₹1,000</Text>
        </View>

        {/* Apply Coupon */}
        <TouchableOpacity style={styles.couponContainer}>
          <Text style={styles.couponText}>Apply Coupon</Text>
          <MaterialCommunityIcons name="ticket-percent-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        {/* Price Details */}
        <View style={styles.priceDetailsContainer}>
          <Text style={styles.priceDetailsTitle}>Price Details</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Membership (1 Year)</Text>
            <Text style={styles.priceValue}>₹1,000</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discount</Text>
            <Text style={[styles.priceValue, styles.discountValue]}>- ₹0</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹1,000</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => router.push('/(main)/payment-success')}
        >
          <Text style={styles.payButtonText}>Proceed to Pay</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    height: 56,
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
    padding: spacing.xl,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  shieldBackground: {
    backgroundColor: '#FF4B72',
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4B72',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  planCard: {
    backgroundColor: '#FFF0F3',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  planSubTitle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  planValidity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 4,
  },
  popularBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featureList: {
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 8,
  },
  highlightText: {
    color: colors.primary,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  couponText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceDetailsContainer: {
    marginBottom: spacing.xl,
  },
  priceDetailsTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.text,
  },
  priceValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  discountValue: {
    color: '#00C853', // green for discount
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  payButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
