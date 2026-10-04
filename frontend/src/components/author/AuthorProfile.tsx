

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Lock,
  Save,
  ShieldCheck,
  Building,
  ArrowRightLeft,
  Check,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

interface AuthorData {
  id?: string;
  authorId?: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  role?: "author" | "admin";
}

const AuthorProfile = () => {
  const navigate = useNavigate();

  const [author, setAuthor] = useState<AuthorData | null>(null);
  const [loading, setLoading] = useState(true);

  const [authorName, setAuthorName] = useState("");
  const [domainEmail, setDomainEmail] = useState("");
  const [registryNumber, setRegistryNumber] = useState("");
  const [penName, setPenName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await api.get("/auth/me");

        const user: AuthorData = response.data.user;

        setAuthor(user);

        setAuthorName(user.name || "");
        setDomainEmail(user.email || "");
        setRegistryNumber(user.authorId || "");
        setPenName(user.name || "");
        setBio(
          `Author based in ${user.city || "India"}, contributing literary works through BookLeaf.`
        );
      } catch (error) {
        console.error("Failed to fetch author profile:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [navigate]);

  const handleSaveProfile = () => {
    console.log({
      authorName,
      domainEmail,
      penName,
      bio,
    });

    alert("Profile information saved locally.");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#FDFBF7] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#CFC7BB] border-t-[#9c6a3a] rounded-full animate-spin mx-auto mb-3" />

          <p className="text-xs text-gray-500">
            Loading author profile...
          </p>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen w-full bg-[#FDFBF7] flex items-center justify-center px-4">
        <div className="bg-[#F8F5EE] border border-[#CFC7BB] rounded-lg p-8 text-center">
          <p className="text-sm text-[#9c6a3a] font-medium">
            Author profile not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] px-4 py-6 sm:px-6 lg:px-10 text-gray-800 font-sans">

      <div className="w-full space-y-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#D8D0C5] pb-4">

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>

            <span>/</span>

            <span className="font-semibold text-[#9c6a3a]">
              Account Settings
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">

            <span className="w-2 h-2 rounded-full bg-[#9c6a3a]" />

            <span>
              AUTHOR ID: {author.authorId || "NOT ASSIGNED"}
            </span>

          </div>

        </div>

        {/* =====================================================
            PAGE TITLE
        ===================================================== */}

        <div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#F2EDE4] border border-[#CFC7BB] text-[10px] font-semibold text-[#9c6a3a] uppercase tracking-wider mb-2">

            <Sparkles className="w-3 h-3 text-[#9c6a3a]" />

            <span>
              Folio Registry & Ledger
            </span>

          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#9c6a3a] leading-tight">
            Author Account & Folio Settings
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-3xl leading-relaxed">
            Manage your literary profile, verified banking escrow,
            security credentials, and editorial communication preferences.
          </p>

        </div>

        {/* =====================================================
            MAIN CONTENT - FULL WIDTH
        ===================================================== */}

        <div className="w-full space-y-8">

          {/* ===================================================
              PROFILE
          =================================================== */}

          <div className="w-full bg-[#F8F5EE] border border-[#CFC7BB] rounded-lg p-5 sm:p-6 lg:p-8 space-y-6">

            {/* CARD HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#D8D0C5] pb-4">

              <div className="flex items-center gap-2">

                <Sparkles className="w-4 h-4 text-[#9c6a3a]" />

                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#9c6a3a]">
                  Author Profile & Colophon
                </h3>

              </div>

              <span className="text-[10px] font-mono text-gray-400 uppercase">
                Individual Author
              </span>

            </div>

            {/* AUTHOR SUMMARY */}

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-[#F2EDE4] p-4 sm:p-5 rounded-md border border-[#CFC7BB]">

              <div className="w-20 h-20 rounded-md bg-[#E8DED0] flex items-center justify-center text-2xl font-serif text-[#6B4F35] border border-[#CFC7BB] flex-shrink-0">

                {author.name.charAt(0).toUpperCase()}

              </div>

              <div className="space-y-1.5 text-center sm:text-left">

                <div className="flex items-center justify-center sm:justify-start gap-1.5">

                  <h4 className="font-serif font-bold text-base text-[#9c6a3a]">
                    {author.name}
                  </h4>

                  <CheckCircle2 className="w-4 h-4 text-emerald-700 fill-emerald-100" />

                </div>

                <p className="text-xs text-gray-600">
                  Independent Author
                </p>

                <p className="text-[10px] text-gray-400 font-mono">
                  {author.city || "Location not available"}
                </p>

              </div>

            </div>

            {/* FORM */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* NAME */}

              <div className="space-y-1.5">

                <label className="text-[11px] font-bold uppercase tracking-wider text-[#9c6a3a] block">
                  Author Name
                </label>

                <input
                  type="text"
                  value={authorName}
                  onChange={(e) =>
                    setAuthorName(e.target.value)
                  }
                  className="w-full bg-[#FDFBF7] border border-[#9c6a3a] rounded px-3 py-2.5 text-xs text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-[#9c6a3a]"
                />

              </div>

              {/* EMAIL */}

              <div className="space-y-1.5">

                <div className="flex items-center justify-between gap-2">

                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#9c6a3a] block">
                    Domain Email
                  </label>

                  <span className="text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Verified
                  </span>

                </div>

                <input
                  type="email"
                  value={domainEmail}
                  disabled
                  className="w-full bg-[#EFEAE1] border border-[#CFC7BB] rounded px-3 py-2.5 text-xs text-gray-700 font-medium cursor-not-allowed"
                />

              </div>

              {/* AUTHOR ID */}

              <div className="space-y-1.5">

                <label className="text-[11px] font-bold uppercase tracking-wider text-[#9c6a3a] block">
                  Author Registry Number
                </label>

                <input
                  type="text"
                  value={registryNumber}
                  disabled
                  className="w-full bg-[#EFEAE1] border border-[#CFC7BB] rounded px-3 py-2.5 text-xs text-gray-700 font-mono cursor-not-allowed"
                />

              </div>

              {/* CITY */}

              <div className="space-y-1.5">

                <label className="text-[11px] font-bold uppercase tracking-wider text-[#9c6a3a] block">
                  City
                </label>

                <input
                  type="text"
                  value={author.city || ""}
                  disabled
                  className="w-full bg-[#EFEAE1] border border-[#CFC7BB] rounded px-3 py-2.5 text-xs text-gray-700 font-medium cursor-not-allowed"
                />

              </div>

              {/* PEN NAME */}

              <div className="space-y-1.5 sm:col-span-2 lg:col-span-4">

                <label className="text-[11px] font-bold uppercase tracking-wider text-[#9c6a3a] block">
                  Pen Name / Literary Imprint
                </label>

                <input
                  type="text"
                  value={penName}
                  onChange={(e) =>
                    setPenName(e.target.value)
                  }
                  className="w-full bg-[#FDFBF7] border border-[#9c6a3a] rounded px-3 py-2.5 text-xs text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-[#9c6a3a]"
                />

              </div>

            </div>

            {/* BIO */}

            <div className="space-y-1.5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

                <label className="text-[11px] font-bold uppercase tracking-wider text-[#9c6a3a] block">
                  Author Biographical Note
                </label>

                <span className="text-[10px] font-mono text-gray-400">
                  {bio.length} / 300 chars
                </span>

              </div>

              <textarea
                rows={4}
                maxLength={300}
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                className="w-full bg-[#FDFBF7] border border-[#9c6a3a] rounded p-3.5 text-xs text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#9c6a3a] resize-y"
              />

            </div>

            {/* SAVE */}

            <div className="flex justify-end pt-4 border-t border-[#D8D0C5]">

              <button
                type="button"
                onClick={handleSaveProfile}
                className="w-full sm:w-auto px-6 py-3 bg-[#9c6a3a] hover:bg-[#85572f] border border-[#9c6a3a] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
              >

                <Save className="w-3.5 h-3.5" />

                <span>
                  Save Profile Changes
                </span>

              </button>

            </div>

          </div>

          {/* ===================================================
              BANKING
          =================================================== */}

          <div className="w-full bg-[#F8F5EE] border border-[#CFC7BB] rounded-lg p-5 sm:p-6 lg:p-8 space-y-5">

            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#D8D0C5] pb-4">

              <div className="flex items-center gap-2">

                <Building className="w-4 h-4 text-[#9c6a3a]" />

                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#9c6a3a]">
                  Verified Royalty Banking Escrow
                </h3>

              </div>

              <span className="w-fit bg-[#F2EDE4] text-[#9c6a3a] border border-[#CFC7BB] text-[10px] font-bold px-2.5 py-1 rounded tracking-wide uppercase">
                Escrow Active & Verified
              </span>

            </div>

            <p className="text-xs text-gray-500 font-mono">
              DIRECT INSTITUTIONAL AUTOMATED CLEARING
            </p>

            {/* BANKING PANEL */}

            <div className="bg-[#F2EDE4] rounded-md p-4 sm:p-5 border border-[#CFC7BB] space-y-5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#D8D0C5] pb-3">

                <span className="text-[10px] font-bold text-[#9c6a3a] uppercase tracking-wider flex items-center gap-1.5">

                  <ShieldCheck className="w-3.5 h-3.5 text-[#9c6a3a]" />

                  Automated NEFT / RTGS Escrow Route

                </span>

                <span className="text-[10px] font-mono text-gray-500">
                  Tier 1 Banking Escrow
                </span>

              </div>

              {/* BANK DETAILS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">

                <div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Designated Bank
                  </span>

                  <span className="font-semibold text-gray-900 text-sm block">
                    HDFC Bank Ltd.
                  </span>

                  <span className="text-[11px] text-gray-500">
                    Fort Branch, Mumbai
                  </span>

                </div>

                <div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Account Holder
                  </span>

                  <span className="font-semibold text-gray-900 text-sm block">
                    {author.name}
                  </span>

                  <span className="text-[11px] text-gray-500">
                    Matches Legal Publishing Contract
                  </span>

                </div>

                <div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Disbursement Account
                  </span>

                  <div className="flex items-center gap-1.5 font-mono text-gray-900 font-semibold mt-0.5">

                    <span>
                      •••• •••• •••• 5289
                    </span>

                    <Lock className="w-3 h-3 text-gray-400" />

                  </div>

                </div>

                <div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    IFSC Routing Code
                  </span>

                  <span className="font-mono text-gray-900 font-semibold mt-0.5 block">
                    HDFC0000128
                  </span>

                  <span className="text-[10px] text-emerald-800 font-medium">
                    Verified for Accelerated NEFT Transfers
                  </span>

                </div>

              </div>

              {/* PAN */}

              <div className="bg-[#FDFBF7] p-3.5 sm:p-4 rounded border border-[#CFC7BB] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div className="flex items-center gap-2">

                  <CreditCard className="w-4 h-4 text-[#9c6a3a]" />

                  <div>

                    <span className="text-[10px] text-gray-400 font-bold uppercase block">
                      Permanent Account Number (PAN)
                    </span>

                    <span className="font-mono font-semibold text-gray-900">
                      ABCPS••••G
                    </span>

                  </div>

                </div>

                <span className="w-fit text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded border border-emerald-200">
                  TDS 10% Flat Compliant
                </span>

              </div>

            </div>

            {/* BANK FOOTER */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-4 border-t border-[#D8D0C5]">

              <p className="text-[11px] text-gray-500 max-w-2xl leading-relaxed">
                To update designated royalty ledger bank details or Tax exemption certificates, contact the Banking & Financial Treasury.
              </p>

              <button
                type="button"
                className="w-full lg:w-auto px-5 py-2.5 bg-[#FDFBF7] hover:bg-[#F2EDE4] border border-[#9c6a3a] text-[#9c6a3a] text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition flex-shrink-0"
              >

                <ArrowRightLeft className="w-3.5 h-3.5" />

                <span>
                  Request Ledger Revision
                </span>

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthorProfile;
