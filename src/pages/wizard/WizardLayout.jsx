import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import Stepper from '../../components/ui/Stepper';
import Sidebar from '../../components/layout/Sidebar';
import Step1Upload from './Step1Upload';
import Step2Analysis from './Step2Analysis';
import Step3Review from './Step3Review';
import Step4Customize from './Step4Customize';
import Step5Generate from './Step5Generate';
import Step6Preview from './Step6Preview';

const STEPS = [
  { label: 'Upload' },
  { label: 'Analyze' },
  { label: 'Review' },
  { label: 'Customize' },
  { label: 'Generate' },
  { label: 'Preview' },
];

const STEP_COMPONENTS = [Step1Upload, Step2Analysis, Step3Review, Step4Customize, Step5Generate, Step6Preview];

export default function WizardLayout() {
  const { currentStep } = usePortfolio();
  const StepComponent = STEP_COMPONENTS[currentStep - 1] || Step1Upload;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Sidebar — hidden on mobile */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Stepper header */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <Stepper steps={STEPS} currentStep={currentStep} />
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-16 animate-fade-in" key={currentStep}>
            <StepComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
