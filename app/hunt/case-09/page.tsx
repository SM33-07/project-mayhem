"use client";

import CaseFile09 from "@/components/case-file-09/CaseFile09";
import CaseGuard from "@/components/CaseGuard";

export default function Page() {
  return (
    <CaseGuard caseId="09">
      <CaseFile09 />
    </CaseGuard>
  );
}
