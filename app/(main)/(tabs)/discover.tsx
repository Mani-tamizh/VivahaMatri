import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { mockProfiles } from "../../../src/lib/mockData";
import { typography } from "../../../src/theme/typography";
import { colors } from "../../../src/theme/colors";
import { spacing, borderRadius } from "../../../src/theme/spacing";

const { width } = Dimensions.get("window");
const cardWidth = (width - spacing.xl - spacing.md) / 1.9;

export default function Discover() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 1. Custom Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logoImage}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. Search & Filter Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <Feather
              name="search"
              size={20}
              color={colors.primary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, location, community..."
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Feather name="sliders" size={18} color={colors.primary} />
            <Text style={styles.filterBtnText}>Filters</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContainer}
        >
          <TouchableOpacity style={[styles.chip, styles.chipActive]}>
            <Feather name="grid" size={16} color={colors.white} />
            <Text style={[styles.chipText, styles.chipTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Feather name="map-pin" size={16} color={colors.text} />
            <Text style={styles.chipText}>Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <View style={styles.onlineDot} />
            <Text style={styles.chipText}>Online</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Feather name="star" size={16} color={colors.text} />
            <Text style={styles.chipText}>Newly Joined</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* 4. Discover Matches Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Discover Matches</Text>
            <Text style={styles.sectionSubtitle}>
              Explore profiles that match your preferences
            </Text>
          </View>
          <TouchableOpacity style={styles.sortBtn}>
            <Text style={styles.sortText}>Sort by: Relevance</Text>
            <Feather name="chevron-down" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* 4b. Profile Grid */}
        <View style={styles.grid}>
          {mockProfiles.map((profile, index) => {
            // Determine badge based on index for variety matching mockup
            let badgeText = "";
            let badgeType = "";
            if (index === 0 || index === 1) {
              badgeText = "Online";
              badgeType = "online";
            } else if (index === 2) {
              badgeText = "New";
              badgeType = "new";
            } else if (index === 3) {
              badgeText = "Recently Joined";
              badgeType = "recent";
            }

            return (
              <TouchableOpacity
                key={profile.id}
                style={styles.card}
                onPress={() => router.push(`/profile/${profile.id}`)}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: profile.profilePhotoUrl }}
                    style={styles.cardImage}
                  />

                  {/* Badges */}
                  {badgeText ? (
                    <View
                      style={[
                        styles.cardBadge,
                        badgeType === "online" && styles.badgeOnline,
                        badgeType === "new" && styles.badgeNew,
                        badgeType === "recent" && styles.badgeRecent,
                      ]}
                    >
                      <Text style={styles.badgeText}>{badgeText}</Text>
                    </View>
                  ) : null}

                  {/* Heart Icon */}
                  <TouchableOpacity style={styles.heartBtn}>
                    <Feather name="heart" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>

                {/* Chat Icon Float - positioned absolute to the card, overlapping the seam */}
                <TouchableOpacity style={styles.chatBtn}>
                  <Feather
                    name="message-circle"
                    size={16}
                    color={colors.primary}
                  />
                </TouchableOpacity>

                <View style={styles.cardContent}>
                  <View style={styles.nameRow}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {profile.name.split(" ")[0]}, {profile.age}
                    </Text>
                    {profile.isVerified && (
                      <MaterialCommunityIcons
                        name="check-decagram"
                        size={16}
                        color={colors.success}
                      />
                    )}
                  </View>

                  <View style={styles.infoRow}>
                    <Feather
                      name="briefcase"
                      size={12}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.infoText} numberOfLines={1}>
                      {profile.occupation}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Feather name="map-pin" size={12} color={colors.primary} />
                    <Text style={styles.infoText} numberOfLines={1}>
                      {profile.location.split(",")[0]}
                    </Text>
                  </View>

                  <View style={styles.tagsRow}>
                    <View style={styles.tag}>
                      <Feather name="user" size={12} color={colors.primary} />
                      <Text style={styles.tagText}>{profile.height}</Text>
                    </View>
                    <View style={styles.tag}>
                      <MaterialCommunityIcons
                        name="om"
                        size={12}
                        color={colors.primary}
                      />
                      <Text style={styles.tagText} numberOfLines={1}>
                        Hindu - Iyer
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 5. Premium Banner */}
        <View style={styles.premiumBanner}>
          <View style={styles.premiumIconContainer}>
            <MaterialCommunityIcons
              name="diamond-stone"
              size={40}
              color={colors.primary}
            />
            <MaterialCommunityIcons
              name="creation"
              size={16}
              color="#FFB6C1"
              style={styles.sparkle1}
            />
            <MaterialCommunityIcons
              name="creation"
              size={12}
              color="#FFB6C1"
              style={styles.sparkle2}
            />
          </View>
          <View style={styles.premiumTextContainer}>
            <View style={styles.premiumTitleRow}>
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <MaterialCommunityIcons
                name="crown"
                size={18}
                color={colors.primary}
              />
            </View>
            <Text style={styles.premiumDesc}>
              Unlock full access & connect with more matches.
            </Text>

            <TouchableOpacity style={styles.upgradeBtn}>
              <Text style={styles.upgradeBtnText}>Upgrade Now</Text>
              <Feather name="chevron-right" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. Trust Badges */}
        <View style={styles.trustGrid}>
          <View style={styles.trustItem}>
            <View style={styles.trustIconBg}>
              <MaterialCommunityIcons
                name="shield-check"
                size={24}
                color={colors.white}
              />
            </View>
            <Text style={styles.trustTitle}>Verified Profiles</Text>
            <Text style={styles.trustDesc}>100% Secure</Text>
          </View>
          <View style={styles.trustItem}>
            <View style={styles.trustIconBg}>
              <Feather name="eye" size={24} color={colors.white} />
            </View>
            <Text style={styles.trustTitle}>Privacy Focused</Text>
            <Text style={styles.trustDesc}>Your data is safe</Text>
          </View>
          <View style={styles.trustItem}>
            <View style={styles.trustIconBg}>
              <Feather name="message-circle" size={24} color={colors.white} />
            </View>
            <Text style={styles.trustTitle}>Connect Easily</Text>
            <Text style={styles.trustDesc}>Start meaningful chats</Text>
          </View>
          <View style={styles.trustItem}>
            <View style={styles.trustIconBg}>
              <Feather name="award" size={24} color={colors.white} />
            </View>
            <Text style={styles.trustTitle}>Trusted by Many</Text>
            <Text style={styles.trustDesc}>Join thousands of users</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9FA", // Lightest pink background matching the design
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: "#FFF9FA",
  },
  headerIcon: {
    padding: spacing.xs,
  },
  logoImage: {
    height: 50,
    width: 200,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    fontStyle: "italic",
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF9FA",
  },
  notificationText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.sm,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    fontSize: 12,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0F3",
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
    height: 48,
  },
  filterBtnText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  chipsScroll: {
    marginBottom: spacing.xl,
    flexGrow: 0,
  },
  chipsContainer: {
    paddingHorizontal: spacing.sm,
    gap: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    height: 36,
  },
  chipActive: {
    backgroundColor: "#FF8DA1", // specific pink for the chip in the mockup
    borderColor: "#FF8DA1",
  },
  chipText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "500",
  },
  chipTextActive: {
    color: colors.white,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sortText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.sm,
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  card: {
    width: cardWidth,
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: spacing.sm,
  },
  imageContainer: {
    height: 160,
    width: "100%",
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardBadge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeOnline: { backgroundColor: "#34C759" },
  badgeNew: { backgroundColor: colors.primary },
  badgeRecent: { backgroundColor: "#6C63FF" },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  heartBtn: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chatBtn: {
    position: "absolute",
    top: 164, // 180 (image height) - 16 (half of height)
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    zIndex: 10,
  },
  cardContent: {
    padding: spacing.sm,
    paddingTop: spacing.md, // extra padding because of the overlapping chat bubble
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    flexShrink: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 10,
    color: colors.textSecondary,
    flex: 1,
  },
  tagsRow: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  tag: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0F3",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 4,
    gap: 4,
  },
  tagText: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: "600",
  },
  premiumBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0F3",
    marginHorizontal: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  premiumIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#FFD1DC",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  sparkle1: { position: "absolute", top: 5, right: 5 },
  sparkle2: { position: "absolute", bottom: 5, left: 5 },
  premiumTextContainer: {
    flex: 1,
  },
  premiumTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  premiumDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: spacing.md,
  },
  upgradeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF4B72",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignSelf: "flex-start",
  },
  upgradeBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 4,
  },
  trustGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    flexWrap: "nowrap",
  },
  trustItem: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 2,
  },
  trustIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  trustTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 4,
  },
  trustDesc: {
    fontSize: 8,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
