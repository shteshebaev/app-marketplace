import { useState, forwardRef } from 'react';
import { ArrowRight, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FormData {
  // Step 1
  companyName: string;
  businessSphere: string;
  companySize: string;
  budget: string;
  // Step 2
  projectDescription: string;
  needIntegrations: boolean;
  launchTimeline: string;
  contactName: string;
  phone: string;
  email: string;
}

const initialFormData: FormData = {
  companyName: '',
  businessSphere: '',
  companySize: '',
  budget: '',
  projectDescription: '',
  needIntegrations: false,
  launchTimeline: '',
  contactName: '',
  phone: '',
  email: '',
};

interface OrderFormProps {
  onNavigateHome: () => void;
}

export const OrderForm = forwardRef<HTMLDivElement, OrderFormProps>(
  ({ onNavigateHome }, ref) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const businessSpheres = [
      { value: 'ecommerce', label: t('orderDev.sphereEcommerce') },
      { value: 'fintech', label: t('orderDev.sphereFintech') },
      { value: 'logistics', label: t('orderDev.sphereLogistics') },
      { value: 'manufacturing', label: t('orderDev.sphereManufacturing') },
      { value: 'medicine', label: t('orderDev.sphereMedicine') },
      { value: 'education', label: t('orderDev.sphereEducation') },
      { value: 'real-estate', label: t('orderDev.sphereRealEstate') },
      { value: 'horeca', label: t('orderDev.sphereHoreca') },
      { value: 'other', label: t('orderDev.sphereOther') },
    ];

    const companySizes = [
      { value: '1-10', label: t('orderDev.size1_10') },
      { value: '10-50', label: t('orderDev.size10_50') },
      { value: '50+', label: t('orderDev.size50plus') },
    ];

    const budgetRanges = [
      { value: 'under-50k', label: t('orderDev.budgetUnder50k') },
      { value: '50k-100k', label: t('orderDev.budget50k100k') },
      { value: '100k-300k', label: t('orderDev.budget100k300k') },
      { value: 'over-300k', label: t('orderDev.budgetOver300k') },
      { value: 'discuss', label: t('orderDev.budgetDiscuss') },
    ];

    const launchTimelines = [
      { value: '1-month', label: t('orderDev.timeline1month') },
      { value: '1-3-months', label: t('orderDev.timeline1_3months') },
      { value: '3-6-months', label: t('orderDev.timeline3_6months') },
      { value: '6-months+', label: t('orderDev.timeline6plus') },
      { value: 'flexible', label: t('orderDev.timelineFlexible') },
    ];

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const isStep1Valid = formData.companyName && formData.businessSphere && formData.companySize;
    const isStep2Valid = formData.projectDescription && formData.contactName && formData.phone && formData.email;

    const handleNext = () => {
      if (step === 1 && isStep1Valid) {
        setStep(2);
      }
    };

    const handleBack = () => {
      if (step === 2) {
        setStep(1);
      }
    };

    const handleSubmit = async () => {
      if (!isStep2Valid) return;

      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setIsSubmitted(true);
    };

    // Success state
    if (isSubmitted) {
      return (
        <section ref={ref} className="py-16 md:py-20 px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-background-card rounded-3xl p-8 md:p-12 shadow-apple-lg text-center animate-scale-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                {t('orderDev.thankYou')}
              </h2>
              <p className="text-lg text-text-secondary mb-2">
                {t('orderDev.weReceivedRequest')}
              </p>
              <p className="text-text-secondary mb-8">
                {t('orderDev.specialistWillContact')}
              </p>

              <button
                onClick={onNavigateHome}
                className="
                  inline-flex items-center gap-2
                  px-6 py-3 rounded-xl
                  bg-gray-100 dark:bg-[#2C2C2E]
                  text-text-primary font-medium
                  hover:bg-gray-200 dark:hover:bg-[#3A3A3C]
                  transition-all duration-300
                "
              >
                <ArrowLeft className="w-4 h-4" />
                {t('orderDev.backToMarketplace')}
              </button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section ref={ref} className="py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Form Card */}
          <div className="bg-background-card rounded-3xl p-6 md:p-10 shadow-apple-lg">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  transition-all duration-300
                  ${step >= 1 ? 'bg-gradient-to-br from-orange-400 to-pink-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-text-tertiary'}
                `}
              >
                1
              </div>
              <div
                className={`
                  w-16 h-1 rounded-full transition-all duration-300
                  ${step >= 2 ? 'bg-gradient-to-r from-orange-400 to-pink-500' : 'bg-gray-200 dark:bg-gray-700'}
                `}
              />
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  transition-all duration-300
                  ${step >= 2 ? 'bg-gradient-to-br from-orange-400 to-pink-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-text-tertiary'}
                `}
              >
                2
              </div>
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
                  {t('orderDev.basicInfo')}
                </h3>

                <div className="space-y-5">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {t('orderDev.companyNameLabel')}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      placeholder={t('orderDev.companyPlaceholder')}
                      className="input"
                    />
                  </div>

                  {/* Business Sphere */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {t('orderDev.businessSphere')}
                    </label>
                    <select
                      value={formData.businessSphere}
                      onChange={(e) => updateField('businessSphere', e.target.value)}
                      className="input appearance-none cursor-pointer"
                    >
                      <option value="">{t('orderDev.selectSphere')}</option>
                      {businessSpheres.map((sphere) => (
                        <option key={sphere.value} value={sphere.value}>
                          {sphere.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {t('orderDev.companySize')}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {companySizes.map((size) => (
                        <button
                          key={size.value}
                          type="button"
                          onClick={() => updateField('companySize', size.value)}
                          className={`
                            py-3 px-4 rounded-xl text-sm font-medium
                            transition-all duration-200
                            ${
                              formData.companySize === size.value
                                ? 'bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow-md'
                                : 'bg-gray-100 dark:bg-[#2C2C2E] text-text-primary hover:bg-gray-200 dark:hover:bg-[#3A3A3C]'
                            }
                          `}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {t('orderDev.budgetOptional')} <span className="text-text-tertiary">({t('orderDev.optional')})</span>
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => updateField('budget', e.target.value)}
                      className="input appearance-none cursor-pointer"
                    >
                      <option value="">{t('orderDev.selectRange')}</option>
                      {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                  className="
                    w-full mt-8 py-4 px-6 rounded-2xl
                    font-semibold text-lg
                    bg-gradient-to-r from-orange-400 to-pink-500 text-white
                    shadow-lg hover:shadow-xl
                    transition-all duration-300
                    hover:scale-[1.02] active:scale-100
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                    flex items-center justify-center gap-2
                  "
                >
                  {t('orderDev.next')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
                  {t('orderDev.projectDesc')}
                </h3>

                <div className="space-y-5">
                  {/* Project Description */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {t('orderDev.taskDescription')}
                    </label>
                    <textarea
                      value={formData.projectDescription}
                      onChange={(e) => updateField('projectDescription', e.target.value)}
                      placeholder={t('orderDev.taskPlaceholder')}
                      rows={4}
                      className="input resize-none h-auto py-3"
                    />
                  </div>

                  {/* Need Integrations */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        className={`
                          w-6 h-6 rounded-lg flex items-center justify-center
                          transition-all duration-200
                          ${
                            formData.needIntegrations
                              ? 'bg-gradient-to-br from-orange-400 to-pink-500'
                              : 'bg-gray-100 dark:bg-[#2C2C2E] group-hover:bg-gray-200 dark:group-hover:bg-[#3A3A3C]'
                          }
                        `}
                        onClick={() => updateField('needIntegrations', !formData.needIntegrations)}
                      >
                        {formData.needIntegrations && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-text-primary">{t('orderDev.needIntegrations')}</span>
                    </label>
                  </div>

                  {/* Launch Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {t('orderDev.launchTimeline')}
                    </label>
                    <select
                      value={formData.launchTimeline}
                      onChange={(e) => updateField('launchTimeline', e.target.value)}
                      className="input appearance-none cursor-pointer"
                    >
                      <option value="">{t('orderDev.selectTimeline')}</option>
                      {launchTimelines.map((timeline) => (
                        <option key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
                    <p className="text-sm font-medium text-text-secondary mb-4">
                      {t('orderDev.contactInfo')}
                    </p>
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {t('orderDev.nameRequired')}
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => updateField('contactName', e.target.value)}
                      placeholder={t('orderDev.howToAddress')}
                      className="input"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        {t('orderDev.phoneRequired')}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+7 (999) 999-99-99"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        {t('orderDev.emailRequired')}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="email@company.com"
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleBack}
                    className="
                      flex-1 py-4 px-6 rounded-2xl
                      font-medium
                      bg-gray-100 dark:bg-[#2C2C2E] text-text-primary
                      hover:bg-gray-200 dark:hover:bg-[#3A3A3C]
                      transition-all duration-200
                      flex items-center justify-center gap-2
                    "
                  >
                    <ArrowLeft className="w-5 h-5" />
                    {t('orderDev.back')}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isStep2Valid || isSubmitting}
                    className="
                      flex-[2] py-4 px-6 rounded-2xl
                      font-semibold text-lg
                      bg-gradient-to-r from-orange-400 to-pink-500 text-white
                      shadow-lg hover:shadow-xl
                      transition-all duration-300
                      hover:scale-[1.02] active:scale-100
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                      flex items-center justify-center gap-2
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t('orderDev.sendingForm')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('orderDev.submitRequestForm')}
                      </>
                    )}
                  </button>
                </div>

                {/* Trust message */}
                <p className="text-center text-sm text-text-tertiary mt-4">
                  {t('orderDev.willContactIn1Day')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

OrderForm.displayName = 'OrderForm';
