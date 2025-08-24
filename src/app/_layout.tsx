import { AntDesign } from "@expo/vector-icons";
import "../global.css";
import { Slot, Tabs } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";

export default function Layout() {
  return (
    <ClerkProvider>
      <Slot />
    </ClerkProvider>
  );
}
