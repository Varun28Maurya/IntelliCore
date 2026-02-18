import { Routes, Route, Navigate } from "react-router-dom";

import ExecutiveLayout from "./Roles/Executive/ExecutiveLayout";
import ExecutiveDashboard from "./Roles/Executive/pages/ExecutiveDashboard";
import FinancialOverview from "./Roles/Executive/pages/FinancialOverview";
import RiskExposure from "./Roles/Executive/pages/RiskExposure";
import AdoptionUsage from "./Roles/Executive/pages/AdoptionUsage";
import SystemReliability from "./Roles/Executive/pages/SystemReliability";
import ReportsInsights from "./Roles/Executive/pages/ReportsInsights";

import RiskLayout from "./Roles/RiskOfficer/RiskLayout";
import RiskOverview from "./Roles/RiskOfficer/pages/RiskOverview";
import AIRiskIndex from "./Roles/RiskOfficer/pages/AIRiskIndex";
import TraditionalMLMonitoring from "./Roles/RiskOfficer/pages/TraditionalMLMonitoring";
import LLMRiskMonitoring from "./Roles/RiskOfficer/pages/LLMRiskMonitoring";
import BiasFairness from "./Roles/RiskOfficer/pages/BiasFairness";
import ComplianceGovernance from "./Roles/RiskOfficer/pages/ComplianceGovernance";
import AuditLogs from "./Roles/RiskOfficer/pages/AuditLogs";


import DataScientistLayout from "./Roles/DataScientist/DataScientistLayout";
import DSOverview from "./Roles/DataScientist/pages/DSOverview";
import ModelPerformance from "./Roles/DataScientist/pages/ModelPerformance";
import DriftMonitoring from "./Roles/DataScientist/pages/DriftMonitoring";
import BiasFairnessDS from "./Roles/DataScientist/pages/BiasFairnessDS";
import ModelRegistry from "./Roles/DataScientist/pages/ModelRegistry";
import ExperimentsTracking from "./Roles/DataScientist/pages/ExperimentsTracking";
import AlertsCenter from "./Roles/DataScientist/pages/AlertsCenter";

// LLM Engineer Role
import LLMLayout from "./Roles/LLMEngineer/LLMLayout";
import LLMOverview from "./Roles/LLMEngineer/pages/LLMOverview";
import PerformanceMetrics from "./Roles/LLMEngineer/pages/PerformanceMetrics";
import TokenUsageCost from "./Roles/LLMEngineer/pages/TokenUsageCost";
import SafetyMonitoring from "./Roles/LLMEngineer/pages/SafetyMonitoring";
import PromptTraces from "./Roles/LLMEngineer/pages/PromptTracing";
import RedTeamTesting from "./Roles/LLMEngineer/pages/RedTeamTesting";
import Alerts from "./Roles/LLMEngineer/pages/Alerts";

/* =========================
   AIOps ROLE IMPORTS
========================= */

import AIOpsLayout from "./Roles/AIOps/AIOpsLayout";
import AIOpsOverview from "./Roles/AIOps/pages/AIOpsOverview";
import PipelineMonitoring from "./Roles/AIOps/pages/PipelineMonitoring";
import DeploymentTracking from "./Roles/AIOps/pages/DeploymentTracking";
import ResourceUtilization from "./Roles/AIOps/pages/ResourceUtilization";
import IncidentManagement from "./Roles/AIOps/pages/IncidentManagement";
import LogsTracing from "./Roles/AIOps/pages/LogsTracing";

import Login from "./components/AuthPage";

import ProfilePage from "./components/ProfilePage";
import SettingsPage from "./components/SettingsPage";
function App() {
  return (
    <Routes>

  {/* Default Redirect */}
  <Route path="/" element={<Navigate to="/login" replace />} />

  {/* Fake Login */}
  <Route path="/login" element={<Login />} />

      {/* Executive Role */}
      <Route path="/executive" element={<ExecutiveLayout />}>
        <Route index element={<ExecutiveDashboard />} />
        <Route path="financial" element={<FinancialOverview />} />
        <Route path="risk" element={<RiskExposure />} />
        <Route path="adoption" element={<AdoptionUsage />} />
        <Route path="reliability" element={<SystemReliability />} />
        <Route path="reports" element={<ReportsInsights />} />
      </Route>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />



      {/* Risk Officer Role */}
      <Route path="/risk" element={<RiskLayout />}>
        <Route index element={<RiskOverview />} />
        <Route path="index" element={<AIRiskIndex />} />
        <Route path="ml" element={<TraditionalMLMonitoring />} />
        <Route path="llm" element={<LLMRiskMonitoring />} />
        <Route path="bias" element={<BiasFairness />} />
        <Route path="compliance" element={<ComplianceGovernance />} />
        <Route path="audit" element={<AuditLogs />} />
      </Route>

      {/* Data Scientist Role */}
      <Route path="/datascientist" element={<DataScientistLayout />}>
        <Route index element={<DSOverview />} />
        <Route path="performance" element={<ModelPerformance />} />
        <Route path="drift" element={<DriftMonitoring />} />
        <Route path="bias" element={<BiasFairnessDS />} />
        <Route path="registry" element={<ModelRegistry />} />
        <Route path="experiments" element={<ExperimentsTracking />} />
        <Route path="alerts" element={<AlertsCenter />} />
      </Route>

      {/* LLM Engineer Role */}
      <Route path="/llm" element={<LLMLayout />}>
        <Route index element={<LLMOverview />} />
        <Route path="performance" element={<PerformanceMetrics />} />
        <Route path="cost" element={<TokenUsageCost />} />
        <Route path="safety" element={<SafetyMonitoring />} />
        <Route path="prompts" element={<PromptTraces />} />
        <Route path="redteam" element={<RedTeamTesting />} />
        <Route path="alerts" element={<Alerts />} />
      </Route>

      {/* =========================
    AIOps ROLE
========================= */}
      <Route path="/aiops" element={<AIOpsLayout />}>
        <Route index element={<AIOpsOverview />} />
        <Route path="pipeline" element={<PipelineMonitoring />} />
        <Route path="deployments" element={<DeploymentTracking />} />
        <Route path="resources" element={<ResourceUtilization />} />
        <Route path="incidents" element={<IncidentManagement />} />
        <Route path="logs" element={<LogsTracing />} />
      </Route>



      {/* 404 Fallback - Always LAST */}
      <Route path="*" element={<Navigate to="/executive" replace />} />

    </Routes>
  );
}

export default App;
