// Components.
import AuthContext from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";
import ActiveStatus from "@/components/ActiveStatus";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext>
      <ToasterContext />
      <ActiveStatus />
      {children}
    </AuthContext>
  );
}
