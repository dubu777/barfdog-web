import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import HealthNoteGuest from "@/components/pages/heathNote/main/healthNoteGuest/healthNoteGuest";

export default async function HeathNotePage() {
  return (
    <>
      <HealthNoteGuest />
      <BottomNavBar />
    </>
  );
}
