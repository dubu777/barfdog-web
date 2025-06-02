import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import HealthNoteGuestHeader from "@/components/pages/heathNote/layout/header/HealthNoteGuestHeader";
import HealthNoteGuest from "@/components/pages/heathNote/main/healthNoteGuest/healthNoteGuest";

export default async function HeathNotePage() {
  return (
    <>
      <HealthNoteGuestHeader />
      <HealthNoteGuest />
      <BottomNavBar />
    </>
  );
}
