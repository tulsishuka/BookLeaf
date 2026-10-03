import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Lock,
  Save,
  ShieldCheck,
  Building,
  ArrowRightLeft,
  KeyRound,
  Bell,
  Check,
  LogOut,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Shield,
  CreditCard
} from 'lucide-react';

const AuthorProfile = () => {
  // Profile Form States
  const [authorName, setAuthorName] = useState('Riya Sharma');
  const [domainEmail, setDomainEmail] = useState('riya.sharma@author.press');
  const [registryNumber, setRegistryNumber] = useState('PBL-10224');
  const [penName, setPenName] = useState('Riya Sharma (Calm Literary)');
  const [bio, setBio] = useState(
    'Contemporary essayist and novelist focusing on themes of renewal, mindful solitude, and human resilience.'
  );

  // Security Auth States
  const [currentPassword, setCurrentPassword] = useState('••••••••••••');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Notification Checkbox States
  const [notifications, setNotifications] = useState({
    typesetting: true,
    royalty: true,
    editor: true,
    pressReleases: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* --- BREADCRUMB & HEADER --- */}
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-gray-900">Account Settings</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <span>FOLIO IDENTIFIER: v2026.08</span>
          </div>
        </div>

        {/* --- PAGE TITLE --- */}
        <div>
          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block">
            FOLIO REGISTRY & LEDGER
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-0.5">
            Author Account & Folio Settings
          </h1>
          <p className="text-xs lg:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Manage your literary profile, verified banking escrow, security credentials, and editorial communication preferences.
          </p>
        </div>

        {/* --- MAIN TWO-COLUMN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ================= LEFT COLUMN (7 COLUMNS) ================= */}
          <div className="lg:col-span-7 space-y-8">

            {/* --- SECTION 1: AUTHOR PROFILE & COLOPHON --- */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  <h3 className="font-serif font-bold text-lg text-gray-900">
                    Author Profile & Colophon
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-gray-400 uppercase">
                  INDIVIDUAL AUTHOR
                </span>
              </div>

              {/* Avatar Upload Banner */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#F2EDE4] p-4 rounded-md border border-gray-300/40">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Riya Sharma"
                  className="w-20 h-20 rounded-md object-cover border border-gray-300 shadow-xs flex-shrink-0"
                />
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <h4 className="font-serif font-bold text-base text-gray-900">
                      Riya Sharma
                    </h4>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 fill-emerald-100" />
                  </div>
                  <p className="text-xs text-gray-600">
                    Independent Author of Contemporary Fiction
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    Format: JPG, PNG, WEBP. Maximum file resolution 2000 x 2000 px up to 10MB.
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                    <button
                      type="button"
                      className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-xs font-semibold text-gray-800 flex items-center gap-1.5 transition shadow-2xs"
                    >
                      <Camera className="w-3.5 h-3.5 text-gray-600" />
                      <span>Change Portrait</span>
                    </button>
                    <button
                      type="button"
                      className="text-xs text-gray-500 hover:text-red-700 transition font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Author Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    AUTHOR NAME
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Domain Email */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      DOMAIN EMAIL
                    </label>
                    <span className="text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <input
                    type="email"
                    value={domainEmail}
                    onChange={(e) => setDomainEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Registry Number */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    AUTHOR C.G. REGISTRY NUMBER
                  </label>
                  <input
                    type="text"
                    value={registryNumber}
                    disabled
                    className="w-full bg-[#EFEAE1] border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 font-mono cursor-not-allowed"
                  />
                </div>

                {/* Pen Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    PEN NAME / LITERARY IMPRINT
                  </label>
                  <input
                    type="text"
                    value={penName}
                    onChange={(e) => setPenName(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

              </div>

              {/* Bio Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    AUTHOR BIOGRAPHICAL NOTE (FOLIO DUST JACKET & COLOPHON)
                  </label>
                  <span className="text-[10px] font-mono text-gray-400">
                    {bio.length} / 300 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-3 text-xs text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-black resize-y"
                />
                <p className="text-[10px] text-gray-400 italic">
                  Appears on official library catalog filings, wholesale publisher notices, and copyright registration sheets.
                </p>
              </div>

              {/* Save Profile Button */}
              <div className="flex justify-end pt-2 border-t border-gray-200/80">
                <button
                  type="button"
                  className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white rounded text-xs font-semibold flex items-center gap-2 transition shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile Changes</span>
                </button>
              </div>

            </div>

            {/* --- SECTION 2: VERIFIED ROYALTY BANKING ESCROW --- */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-800" />
                  <h3 className="font-serif font-bold text-lg text-gray-900">
                    Verified Royalty Banking Escrow
                  </h3>
                </div>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                  ESCROW ACTIVE & VERIFIED
                </span>
              </div>

              <p className="text-xs text-gray-500 font-mono">
                DIRECT INSTITUTIONAL AUTOMATED CLEARING
              </p>

              {/* Escrow Bank Box */}
              <div className="bg-[#F2EDE4] rounded-md p-5 border border-gray-300/50 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-300/40 pb-2">
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                    AUTOMATED NEFT / RTGS ESCROW ROUTE
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">Tier 1 Banking Escrow</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      DESIGNATED BANK
                    </span>
                    <span className="font-semibold text-gray-900 text-sm block">HDFC Bank Ltd.</span>
                    <span className="text-[11px] text-gray-500">Fort Branch, Mumbai</span>
                    <span className="text-[10px] text-gray-400 block">Primary Deposit Account</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      ACCOUNT HOLDER
                    </span>
                    <span className="font-semibold text-gray-900 text-sm block">Riya Sharma</span>
                    <span className="text-[11px] text-gray-500">Matches Legal Publishing Contract</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      DISBURSEMENT ACCOUNT NUMBER
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-gray-900 font-semibold mt-0.5">
                      <span>•••• •••• •••• 5289</span>
                      <Lock className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-[10px] text-gray-400 block">Encrypted via Razorpay Escrow</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      IFSC ROUTING CODE
                    </span>
                    <span className="font-mono text-gray-900 font-semibold mt-0.5 block">HDFC0000128</span>
                    <span className="text-[10px] text-emerald-800 font-medium">Verified for Accelerated NEFT Transfers</span>
                  </div>
                </div>

                {/* PAN Verification Badge */}
                <div className="bg-white/80 p-3 rounded border border-gray-300/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">
                        PERMANENT ACCOUNT NUMBER (PAN)
                      </span>
                      <span className="font-mono font-semibold text-gray-900">ABCPS••••G</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                      TDS 10% Flat Compliant
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Withholding Tax System</span>
                  </div>
                </div>
              </div>

              {/* Bottom Request Revision Action */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200/80 text-xs">
                <p className="text-[11px] text-gray-500 max-w-sm">
                  To update designated royalty ledger bank details or Tax exemption certificates (Form 15G/15H), contact the Banking & Financial Treasury.
                </p>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#F2EDE4] hover:bg-[#EAE4D8] border border-gray-300 text-gray-800 text-xs font-semibold rounded flex items-center gap-1.5 transition flex-shrink-0"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Request Ledger Revision</span>
                </button>
              </div>

            </div>

          </div>

          {/* ================= RIGHT COLUMN (5 COLUMNS) ================= */}
          <div className="lg:col-span-5 space-y-8">

            {/* --- SECTION 3: SECURITY & FOLIO AUTH --- */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-800" />
                  <h3 className="font-serif font-bold text-lg text-gray-900">
                    Security & Folio Auth
                  </h3>
                </div>
              </div>

              <p className="text-xs text-gray-500 font-mono">
                CRYPTOGRAPHIC ACCESS CONTROL
              </p>

              <div className="space-y-4">
                
                {/* Current Password */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    CURRENT ARCHIVAL PASSWORD
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 10 characters with symbols"
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    CONFIRM NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* 2FA Toggle Box */}
                <div className="bg-[#F2EDE4] p-3.5 rounded border border-gray-300/50 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                      <Shield className="w-3.5 h-3.5 text-amber-800" />
                      <span>Two-Factor Authentication</span>
                    </div>
                    <p className="text-[10px] text-gray-500">
                      Authenticator App (TOTP) / Google Auth
                    </p>
                    <span className="text-[10px] font-mono text-emerald-800 font-semibold block">
                      Configured & Active
                    </span>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                      twoFactorEnabled ? 'bg-black' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Update Credentials Button */}
                <button
                  type="button"
                  className="w-full py-2.5 bg-black hover:bg-gray-800 text-white rounded text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Update Credentials</span>
                </button>

              </div>
            </div>

            {/* --- SECTION 4: EDITORIAL DISPATCH PREFERENCES --- */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-800" />
                  <h3 className="font-serif font-bold text-lg text-gray-900">
                    Editorial Dispatch
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-xs font-semibold text-gray-700 hover:underline"
                >
                  Save All
                </button>
              </div>

              <p className="text-[10px] font-mono text-gray-400 uppercase">
                CHANNEL & NOTIFICATION PREFERENCES
              </p>

              <div className="space-y-3 text-xs">
                
                {/* Pref 1 */}
                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-[#F2EDE4] transition">
                  <input
                    type="checkbox"
                    checked={notifications.typesetting}
                    onChange={() => toggleNotification('typesetting')}
                    className="mt-0.5 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      Typesetting & galley proof sign-off alerts
                    </span>
                    <span className="text-[11px] text-gray-500 leading-relaxed block mt-0.5">
                      Immediate priority dispatch on manuscript and author portal for typesetting proofs, embossing specimen notes, and binder galley sign-offs.
                    </span>
                  </div>
                </label>

                {/* Pref 2 */}
                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-[#F2EDE4] transition">
                  <input
                    type="checkbox"
                    checked={notifications.royalty}
                    onChange={() => toggleNotification('royalty')}
                    className="mt-0.5 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      Quarterly royalty statement & NEFT disbursement notices
                    </span>
                    <span className="text-[11px] text-gray-500 leading-relaxed block mt-0.5">
                      Comprehensive financial reconciliation PDFs, distribution sales ledgers, and credit confirmation notes.
                    </span>
                  </div>
                </label>

                {/* Pref 3 */}
                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-[#F2EDE4] transition">
                  <input
                    type="checkbox"
                    checked={notifications.editor}
                    onChange={() => toggleNotification('editor')}
                    className="mt-0.5 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      Direct correspondence from Managing Editor
                    </span>
                    <span className="text-[11px] text-gray-500 leading-relaxed block mt-0.5">
                      Personalized manuscript reviews, editorial marginalia comments, and revision schedules from the desk.
                    </span>
                  </div>
                </label>

                {/* Pref 4 */}
                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-[#F2EDE4] transition">
                  <input
                    type="checkbox"
                    checked={notifications.pressReleases}
                    onChange={() => toggleNotification('pressReleases')}
                    className="mt-0.5 rounded border-gray-300 text-black focus:ring-black accent-black"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      BookLeaf Press releases & seasonal literary catalogs
                    </span>
                    <span className="text-[11px] text-gray-500 leading-relaxed block mt-0.5">
                      Autumn and Spring catalog announcements, literary festival invitations, and press marketing highlights.
                    </span>
                  </div>
                </label>

              </div>
            </div>

            {/* --- SECTION 5: SESSION STATUS & FOOTER ACTIONS --- */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-gray-200/80 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  AUTHOR SESSION STATUS
                </span>
                <span className="font-mono text-[10px] text-gray-500">
                  IP: 182.73.192.42 • Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="px-4 py-2.5 bg-white hover:bg-gray-100 border border-gray-300 rounded text-xs font-semibold text-gray-800 flex items-center justify-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Dashboard</span>
                </button>

                <button
                  type="button"
                  className="px-4 py-2.5 bg-red-100 hover:bg-red-200 border border-red-200 rounded text-xs font-semibold text-red-900 flex items-center justify-center gap-1.5 transition"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-700" />
                  <span>Logout of Chamber</span>
                </button>
              </div>

              <div className="text-[10px] text-gray-400 text-center font-mono pt-1">
                BookLeaf Editorial Correspondence System • Cryptographic Ledger v4.12
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AuthorProfile;