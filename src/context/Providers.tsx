import AuthContext from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext>
      <ToasterContext />
      {children}
    </AuthContext>
  );
}
