import { useState } from 'react';

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Employee Onboarding Data Submitted!');
    // This is where you would trigger the POST request to your Express backend
  };

  return (
    <div className="max-w-3xl mx-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">New Employee Onboarding</h2>
        <p className="text-sm text-slate-500 mt-1">Step {currentStep} of {totalSteps}</p>
        
        {/* Progress Bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={currentStep === totalSteps ? handleSubmit : handleNext}>
        
        {/* Step 1: Personal Profile */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">First Name</label>
                <input type="text" required className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Last Name</label>
                <input type="text" required className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" required className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Department & Role */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-4">Department Assignment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Department</label>
                <select required className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option value="">Select Department...</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Direct Manager</label>
                <select required className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option value="">Assign Manager...</option>
                  <option value="manager_1">Sarah Jenkins (Engineering)</option>
                  <option value="manager_2">Marcus Doe (Marketing)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Compensation Setup */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-4">Compensation Setup</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Base Annual Salary (USD)</label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-500 sm:text-sm">$</span>
                  </div>
                  <input type="number" required className="block w-full rounded-md border border-slate-300 pl-7 pr-12 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Employment Type</label>
                <div className="mt-2 flex gap-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="empType" value="full-time" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-slate-700">Full-time</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="empType" value="contract" className="text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-slate-700">Contractor</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Controls */}
        <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              currentStep === 1 
                ? 'cursor-not-allowed bg-slate-100 text-slate-400' 
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-sm'
            }`}
          >
            Back
          </button>
          
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            {currentStep === totalSteps ? 'Complete Onboarding' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}