import { useState } from 'react';
import { UserPlus, Building, User, Phone, Mail, MapPin, CreditCard, CheckCircle } from 'lucide-react';

const businessTypes = ['Retail', 'Wholesale', 'HoReCa', 'E-commerce'];
const creditLimits = [
  { value: 50000, label: '₹50,000' },
  { value: 100000, label: '₹1,00,000' },
  { value: 150000, label: '₹1,50,000' },
  { value: 200000, label: '₹2,00,000' },
  { value: 300000, label: '₹3,00,000' },
];

interface BuyerFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  businessType: string;
  gstNumber: string;
  panNumber: string;
  creditLimit: number;
  bankAccountNumber: string;
  bankName: string;
  ifscCode: string;
  estimatedMonthlyVolume: string;
  businessYears: string;
  referenceContact: string;
  notes: string;
}

export default function OnboardBuyer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BuyerFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    businessType: '',
    gstNumber: '',
    panNumber: '',
    creditLimit: 100000,
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    estimatedMonthlyVolume: '',
    businessYears: '',
    referenceContact: '',
    notes: ''
  });

  const handleInputChange = (field: keyof BuyerFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    console.log('Submitting buyer onboarding:', formData);
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Buyer Successfully Onboarded!</h2>
          <p className="text-gray-600 mb-6">
            {formData.companyName} has been added to your buyer network. 
            They will receive login credentials and can start placing orders immediately.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Login credentials will be sent to {formData.email}</li>
              <li>• Credit limit of ₹{formData.creditLimit.toLocaleString()} has been approved</li>
              <li>• Account verification may take 24-48 hours</li>
              <li>• You'll receive commission on all their orders</li>
            </ul>
          </div>
          <div className="flex space-x-4 justify-center">
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  companyName: '',
                  contactPerson: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: '',
                  state: '',
                  pincode: '',
                  businessType: '',
                  gstNumber: '',
                  panNumber: '',
                  creditLimit: 100000,
                  bankAccountNumber: '',
                  bankName: '',
                  ifscCode: '',
                  estimatedMonthlyVolume: '',
                  businessYears: '',
                  referenceContact: '',
                  notes: ''
                });
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Onboard Another Buyer
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              View My Buyers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Onboard New Buyer</h1>
          <p className="text-gray-600 mt-1">Add a new business to your buyer network and start earning commissions</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${step <= currentStep ? 'text-purple-600' : 'text-gray-500'}`}>
                  {step === 1 && 'Basic Information'}
                  {step === 2 && 'Business Details'}
                  {step === 3 && 'Financial Information'}
                  {step === 4 && 'Review & Submit'}
                </p>
              </div>
              {step < 4 && (
                <div className={`w-16 h-0.5 ml-4 ${step < currentStep ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Building className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter contact person name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                  placeholder="Enter complete business address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="110001"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Business Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                  <select
                    required
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
                  <select
                    value={formData.businessYears}
                    onChange={(e) => handleInputChange('businessYears', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select years</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="27AABCU9603R1ZX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                  <input
                    type="text"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="ABCDE1234F"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Monthly Volume</label>
                  <select
                    value={formData.estimatedMonthlyVolume}
                    onChange={(e) => handleInputChange('estimatedMonthlyVolume', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select volume range</option>
                    <option value="0-50k">₹0 - ₹50,000</option>
                    <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                    <option value="1L-5L">₹1,00,000 - ₹5,00,000</option>
                    <option value="5L+">₹5,00,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reference Contact</label>
                  <input
                    type="text"
                    value={formData.referenceContact}
                    onChange={(e) => handleInputChange('referenceContact', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Any existing business reference"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Financial Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Financial Information</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credit Limit *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {creditLimits.map(limit => (
                    <label key={limit.value} className="relative">
                      <input
                        type="radio"
                        name="creditLimit"
                        value={limit.value}
                        checked={formData.creditLimit === limit.value}
                        onChange={(e) => handleInputChange('creditLimit', Number(e.target.value))}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.creditLimit === limit.value 
                          ? 'border-purple-600 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">{limit.label}</p>
                          <p className="text-sm text-gray-600">Credit Limit</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Number</label>
                  <input
                    type="text"
                    value={formData.bankAccountNumber}
                    onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Account number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Bank name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="IFSC code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                  placeholder="Any additional information about the buyer"
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Review & Submit</h2>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Company Name</p>
                    <p className="font-medium">{formData.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-medium">{formData.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Business Type</p>
                    <p className="font-medium">{formData.businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Credit Limit</p>
                    <p className="font-medium">₹{formData.creditLimit.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Commission Structure</h3>
                <p className="text-sm text-blue-800">
                  You will earn 8-12% commission on all orders placed by this buyer. 
                  Commission rates vary based on product categories and order volumes.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 border border-gray-300 rounded-lg transition-colors ${
                currentStep === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Onboard Buyer</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
