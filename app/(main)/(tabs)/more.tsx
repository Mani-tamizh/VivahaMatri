import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../src/theme/colors";
import { spacing, borderRadius } from "../../../src/theme/spacing";
import { mockCurrentUser } from "../../../src/lib/mockData";
import { useAuthStore } from "../../../src/store/authStore";

type MenuItemProps = {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  badge?: string | number;
  badgeColor?: string;
  badgeTextColor?: string;
  isLast?: boolean;
};

const MenuItem = ({ icon, title, badge, badgeColor, badgeTextColor, isLast }: MenuItemProps) => (
  <TouchableOpacity style={[styles.menuItem, !isLast && styles.menuItemBorder]}>
    <View style={styles.menuItemLeft}>
      <Feather name={icon} size={20} color={colors.primary} />
      <Text style={styles.menuItemTitle}>{title}</Text>
    </View>
    <View style={styles.menuItemRight}>
      {badge && (
        <View style={[styles.badge, badgeColor ? { backgroundColor: badgeColor } : null]}>
          <Text style={[styles.badgeText, badgeTextColor ? { color: badgeTextColor } : null]}>{badge}</Text>
        </View>
      )}
      <Feather name="chevron-right" size={20} color={colors.textSecondary} />
    </View>
  </TouchableOpacity>
);

export default function MoreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Feather name="x" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>More</Text>
        <View style={styles.closeButton} /> {/* Empty view for centering */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: mockCurrentUser.profilePhotoUrl }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>{mockCurrentUser.name}</Text>
              <MaterialCommunityIcons name="check-decagram" size={16} color={colors.primary} />
            </View>
            <Text style={styles.premiumText}>Premium Member</Text>
            <Text style={styles.validityText}>Valid till 20 Aug 2025</Text>
          </View>
          <View style={styles.premiumIconContainer}>
            <MaterialCommunityIcons name="shield-crown" size={28} color={colors.white} />
          </View>
        </View>

        {/* Group 1 */}
        <View style={styles.menuGroup}>
          <MenuItem icon="user" title="Edit Profile" />
          <MenuItem icon="star" title="Premium Plan" badge="Active" badgeColor="#FFF0F3" badgeTextColor={colors.primary} />
          <MenuItem icon="heart" title="Matches" badge="12" badgeColor="#FFF0F3" badgeTextColor={colors.primary} />
          <MenuItem icon="users" title="Interests" badge="8" badgeColor="#FFF0F3" badgeTextColor={colors.primary} />
          <MenuItem icon="bookmark" title="Shortlist" badge="15" badgeColor="#FFF0F3" badgeTextColor={colors.primary} />
          <MenuItem icon="eye" title="Profile Views" badge="23" badgeColor="#FFF0F3" badgeTextColor={colors.primary} isLast />
        </View>

        {/* Group 2 */}
        <View style={styles.menuGroup}>
          <MenuItem icon="image" title="My Photos" />
          <MenuItem icon="shield" title="Privacy Settings" />
          <MenuItem icon="slash" title="Blocked Profiles" />
          <MenuItem icon="phone-call" title="Who Can Contact Me" isLast />
        </View>

        {/* Group 3 */}
        <View style={styles.menuGroup}>
          <MenuItem icon="headphones" title="Help & Support" />
          <MenuItem icon="lock" title="Privacy Policy" />
          <MenuItem icon="file-text" title="Terms & Conditions" />
          <MenuItem icon="info" title="About VivahaMatri" isLast />
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            await useAuthStore.getState().logout();
            router.replace('/(auth)/phone');
          }}
        >
          <Feather name="log-out" size={20} color="#FF3B30" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        
        {/* Extra padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  scrollContent: {
    padding: spacing.md,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFEBF0',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginRight: spacing.xs,
  },
  premiumText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "600",
    marginBottom: 2,
  },
  validityText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  premiumIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  menuGroup: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 15,
    color: colors.text,
    marginLeft: spacing.sm,
    fontWeight: "500",
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: spacing.sm,
  },
});
