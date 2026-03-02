import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, DollarSign, TrendingUp, Star, CheckCircle, Award, Globe, Phone, Mail, User, Calculator, FileText, XCircle, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DirhamLogo from '@/components/ui/DirhamLogo';

const Affiliates = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    countryCode: '+971',
    phone: '',
    acceptedTerms: false
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    propertyValue: '',
    companyCommissionRate: '3',
    affiliateCommissionRate: '5'
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculatorChange = (field: string, value: string) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.name && formData.email && formData.country && formData.countryCode && formData.phone && formData.acceptedTerms;

  // Commission calculation
  const propertyValue = parseFloat(calculatorData.propertyValue) || 0;
  const companyCommissionRate = parseFloat(calculatorData.companyCommissionRate) || 0;
  const affiliateCommissionRate = parseFloat(calculatorData.affiliateCommissionRate) || 0;
  const companyCommission = (propertyValue * companyCommissionRate) / 100;
  const affiliateCommission = (companyCommission * affiliateCommissionRate) / 100;

  const sendWhatsApp = () => {
    const message = `Hello! I would like to join the Desert Jewel Realty affiliate program.

My Details:
Name: ${formData.name}
Email: ${formData.email}
Country: ${formData.country}
Phone: ${formData.countryCode} ${formData.phone}

I'm interested in earning up to 15% commission by referring clients to your premium properties. Please provide me with the affiliate materials and next steps.`;

    const whatsappUrl = `https://wa.me/971589532210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendTelegram = () => {
    const message = `Hello! I would like to join the Desert Jewel Realty affiliate program.

My Details:
Name: ${formData.name}
Email: ${formData.email}
Country: ${formData.country}
Phone: ${formData.countryCode} ${formData.phone}

I'm interested in earning up to 15% commission by referring clients to your premium properties. Please provide me with the affiliate materials and next steps.`;

    const telegramUrl = `https://t.me/desertjewelrealty?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Up to 15% Commission",
      description: "Earn up to 15% commission on successful property sales from your referrals"
    },
    {
      icon: TrendingUp,
      title: "High-Value Properties",
      description: "Promote luxury properties with prices ranging from 500K to 50M+"
    },
    {
      icon: Users,
      title: "Marketing Support",
      description: "Get access to professional marketing materials and property brochures"
    },
    {
      icon: Star,
      title: "Trusted Brand",
      description: "Partner with Dubai's premier real estate agency with proven track record"
    }
  ];

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa/DRC)", 
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", 
    "Dominica", "Dominican Republic", "East Timor (Timor-Leste)", "Ecuador", "Egypt", 
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", 
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", 
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Israel", 
    "Italy", "Ivory Coast (Côte d'Ivoire)", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
    "Kenya", "Kiribati", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", 
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", 
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", 
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", 
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", 
    "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", 
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", 
    "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", 
    "Sweden", "Switzerland", "Syria", "São Tomé and Príncipe", "Taiwan", "Tajikistan", 
    "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", 
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const countryCodes = [
    { country: "Afghanistan", code: "+93" },
    { country: "Albania", code: "+355" },
    { country: "Algeria", code: "+213" },
    { country: "Andorra", code: "+376" },
    { country: "Angola", code: "+244" },
    { country: "Antigua and Barbuda", code: "+1‑268" },
    { country: "Argentina", code: "+54" },
    { country: "Armenia", code: "+374" },
    { country: "Australia", code: "+61" },
    { country: "Austria", code: "+43" },
    { country: "Azerbaijan", code: "+994" },
    { country: "Bahamas", code: "+1‑242" },
    { country: "Bahrain", code: "+973" },
    { country: "Bangladesh", code: "+880" },
    { country: "Barbados", code: "+1‑246" },
    { country: "Belarus", code: "+375" },
    { country: "Belgium", code: "+32" },
    { country: "Belize", code: "+501" },
    { country: "Benin", code: "+229" },
    { country: "Bhutan", code: "+975" },
    { country: "Bolivia", code: "+591" },
    { country: "Bosnia and Herzegovina", code: "+387" },
    { country: "Botswana", code: "+267" },
    { country: "Brazil", code: "+55" },
    { country: "Brunei", code: "+673" },
    { country: "Bulgaria", code: "+359" },
    { country: "Burkina Faso", code: "+226" },
    { country: "Burundi", code: "+257" },
    { country: "Cape Verde", code: "+238" },
    { country: "Cambodia", code: "+855" },
    { country: "Cameroon", code: "+237" },
    { country: "Canada", code: "+1" },
    { country: "Central African Republic", code: "+236" },
    { country: "Chad", code: "+235" },
    { country: "Chile", code: "+56" },
    { country: "China", code: "+86" },
    { country: "Colombia", code: "+57" },
    { country: "Comoros", code: "+269" },
    { country: "Congo (Brazzaville)", code: "+242" },
    { country: "Congo (Kinshasa)", code: "+243" },
    { country: "Costa Rica", code: "+506" },
    { country: "Croatia", code: "+385" },
    { country: "Cuba", code: "+53" },
    { country: "Cyprus", code: "+357" },
    { country: "Czech Republic", code: "+420" },
    { country: "Denmark", code: "+45" },
    { country: "Djibouti", code: "+253" },
    { country: "Dominica", code: "+1‑767" },
    { country: "Dominican Republic", code: "+1‑809" },
    { country: "Ecuador", code: "+593" },
    { country: "Egypt", code: "+20" },
    { country: "El Salvador", code: "+503" },
    { country: "Equatorial Guinea", code: "+240" },
    { country: "Eritrea", code: "+291" },
    { country: "Estonia", code: "+372" },
    { country: "Eswatini", code: "+268" },
    { country: "Ethiopia", code: "+251" },
    { country: "Fiji", code: "+679" },
    { country: "Finland", code: "+358" },
    { country: "France", code: "+33" },
    { country: "Gabon", code: "+241" },
    { country: "Gambia", code: "+220" },
    { country: "Georgia", code: "+995" },
    { country: "Germany", code: "+49" },
    { country: "Ghana", code: "+233" },
    { country: "Greece", code: "+30" },
    { country: "Grenada", code: "+1‑473" },
    { country: "Guatemala", code: "+502" },
    { country: "Guinea", code: "+224" },
    { country: "Guinea‑Bissau", code: "+245" },
    { country: "Guyana", code: "+592" },
    { country: "Haiti", code: "+509" },
    { country: "Honduras", code: "+504" },
    { country: "Hungary", code: "+36" },
    { country: "Iceland", code: "+354" },
    { country: "India", code: "+91" },
    { country: "Indonesia", code: "+62" },
    { country: "Iraq", code: "+964" },
    { country: "Ireland", code: "+353" },
    { country: "Israel", code: "+972" },
    { country: "Italy", code: "+39" },
    { country: "Jamaica", code: "+1‑876" },
    { country: "Japan", code: "+81" },
    { country: "Jordan", code: "+962" },
    { country: "Kazakhstan", code: "+7" },
    { country: "Kenya", code: "+254" },
    { country: "Kiribati", code: "+686" },
    { country: "Kosovo", code: "+383" },
    { country: "Kuwait", code: "+965" },
    { country: "Kyrgyzstan", code: "+996" },
    { country: "Laos", code: "+856" },
    { country: "Latvia", code: "+371" },
    { country: "Lebanon", code: "+961" },
    { country: "Lesotho", code: "+266" },
    { country: "Liberia", code: "+231" },
    { country: "Libya", code: "+218" },
    { country: "Liechtenstein", code: "+423" },
    { country: "Lithuania", code: "+370" },
    { country: "Luxembourg", code: "+352" },
    { country: "Madagascar", code: "+261" },
    { country: "Malawi", code: "+265" },
    { country: "Malaysia", code: "+60" },
    { country: "Maldives", code: "+960" },
    { country: "Mali", code: "+223" },
    { country: "Malta", code: "+356" },
    { country: "Marshall Islands", code: "+692" },
    { country: "Mauritania", code: "+222" },
    { country: "Mauritius", code: "+230" },
    { country: "Mexico", code: "+52" },
    { country: "Micronesia", code: "+691" },
    { country: "Moldova", code: "+373" },
    { country: "Monaco", code: "+377" },
    { country: "Mongolia", code: "+976" },
    { country: "Montenegro", code: "+382" },
    { country: "Morocco", code: "+212" },
    { country: "Mozambique", code: "+258" },
    { country: "Namibia", code: "+264" },
    { country: "Nauru", code: "+674" },
    { country: "Nepal", code: "+977" },
    { country: "Netherlands", code: "+31" },
    { country: "New Zealand", code: "+64" },
    { country: "Nicaragua", code: "+505" },
    { country: "Niger", code: "+227" },
    { country: "Nigeria", code: "+234" },
    { country: "North Macedonia", code: "+389" },
    { country: "Norway", code: "+47" },
    { country: "Oman", code: "+968" },
    { country: "Pakistan", code: "+92" },
    { country: "Palau", code: "+680" },
    { country: "Palestine", code: "+970" },
    { country: "Panama", code: "+507" },
    { country: "Papua New Guinea", code: "+675" },
    { country: "Paraguay", code: "+595" },
    { country: "Peru", code: "+51" },
    { country: "Philippines", code: "+63" },
    { country: "Poland", code: "+48" },
    { country: "Portugal", code: "+351" },
    { country: "Qatar", code: "+974" },
    { country: "Romania", code: "+40" },
    { country: "Russia", code: "+7" },
    { country: "Rwanda", code: "+250" },
    { country: "Saint Kitts and Nevis", code: "+1‑869" },
    { country: "Saint Lucia", code: "+1‑758" },
    { country: "St Vincent & Grenadines", code: "+1‑784" },
    { country: "Samoa", code: "+685" },
    { country: "San Marino", code: "+378" },
    { country: "São Tomé and Príncipe", code: "+239" },
    { country: "Saudi Arabia", code: "+966" },
    { country: "Senegal", code: "+221" },
    { country: "Serbia", code: "+381" },
    { country: "Seychelles", code: "+248" },
    { country: "Sierra Leone", code: "+232" },
    { country: "Singapore", code: "+65" },
    { country: "Slovakia", code: "+421" },
    { country: "Slovenia", code: "+386" },
    { country: "Solomon Islands", code: "+677" },
    { country: "Somalia", code: "+252" },
    { country: "South Africa", code: "+27" },
    { country: "South Sudan", code: "+211" },
    { country: "Spain", code: "+34" },
    { country: "Sri Lanka", code: "+94" },
    { country: "Sudan", code: "+249" },
    { country: "Suriname", code: "+597" },
    { country: "Sweden", code: "+46" },
    { country: "Switzerland", code: "+41" },
    { country: "Syria", code: "+963" },
    { country: "Taiwan", code: "+886" },
    { country: "Tajikistan", code: "+992" },
    { country: "Tanzania", code: "+255" },
    { country: "Thailand", code: "+66" },
    { country: "Togo", code: "+228" },
    { country: "Tonga", code: "+676" },
    { country: "Trinidad and Tobago", code: "+1‑868" },
    { country: "Tunisia", code: "+216" },
    { country: "Turkey", code: "+90" },
    { country: "Turkmenistan", code: "+993" },
    { country: "Tuvalu", code: "+688" },
    { country: "Uganda", code: "+256" },
    { country: "Ukraine", code: "+380" },
    { country: "United Kingdom", code: "+44" },
    { country: "United States", code: "+1" },
    { country: "Uruguay", code: "+598" },
    { country: "Uzbekistan", code: "+998" },
    { country: "Vanuatu", code: "+678" },
    { country: "Vatican City", code: "+379" },
    { country: "Venezuela", code: "+58" },
    { country: "Vietnam", code: "+84" },
    { country: "Yemen", code: "+967" },
    { country: "Zambia", code: "+260" },
    { country: "Zimbabwe", code: "+263" }
  ];

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              <Award className="w-4 h-4 mr-2" />
              Partner Program
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Join Our <span className="text-primary">Affiliate Program</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Earn up to 15% commission by referring clients to Dubai's most prestigious properties. 
              Partner with Desert Jewel Realty and turn your network into income.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-900">Global Opportunity</h3>
              </div>
              <p className="text-blue-800 text-lg">
                Our affiliate program is open to partners worldwide! Whether you're in Europe, Asia, America, or anywhere else, 
                you can join our network and earn commissions on Dubai property referrals.
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Become an Affiliate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Join Our Affiliate Program</DialogTitle>
                  <DialogDescription>
                    Fill out your details to start earning commissions on property referrals
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country of Residence</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                      <Select onValueChange={(value) => handleInputChange('country', value)} required>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <div className="w-32">
                        <Select 
                          value={formData.countryCode} 
                          onValueChange={(value) => handleInputChange('countryCode', value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="+93, +971, +1...">
                              {formData.countryCode || "+93, +971, +1..."}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {countryCodes.map((item) => (
                              <SelectItem key={item.code} value={item.code}>
                                {item.code} {item.country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptedTerms}
                        onCheckedChange={(checked) => setFormData(prev => ({...prev, acceptedTerms: checked as boolean}))}
                        required
                      />
                      <label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I agree to the{' '}
                        <button
                          type="button"
                          onClick={() => setIsTermsDialogOpen(true)}
                          className="text-primary hover:text-primary/80 underline"
                        >
                          Terms and Conditions
                        </button>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <p className="text-sm text-muted-foreground text-center">
                      Choose your preferred contact method:
                    </p>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={sendWhatsApp}
                        disabled={!isFormValid}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690"/>
                        </svg>
                        WhatsApp
                      </Button>
                      <Button
                        type="button"
                        onClick={sendTelegram}
                        disabled={!isFormValid}
                        variant="outline"
                        className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        Telegram
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            {/* Terms and Conditions Dialog */}
            <Dialog open={isTermsDialogOpen} onOpenChange={setIsTermsDialogOpen}>
              <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Affiliate Terms & Conditions</DialogTitle>
                  <DialogDescription>
                    Please read and understand our comprehensive affiliate program terms and conditions
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-8 py-4">
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-2">Important Legal Notice</h4>
                    <p className="text-amber-800 text-sm">
                      By participating in our affiliate program, you agree to comply with all applicable laws in your jurisdiction and the UAE. 
                      These terms are binding and violations may result in immediate termination and legal action.
                    </p>
                  </div>

                  {/* Affiliate Program Terms */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-6 text-blue-900 flex items-center gap-2">
                      <FileText className="w-6 h-6" />
                      Affiliate Program Terms
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Enrollment</h4>
                        <p className="text-sm text-gray-700">
                          By applying to join, affiliates confirm they are licensed under UAE law (trade + e-media) if operating from within the UAE.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Promotional Content</h4>
                        <p className="text-sm text-gray-700">
                          Affiliates must disclose paid links (#Ad/#Sponsored/#إعلان) in English & Arabic and avoid misleading claims about Desert Jewel Realty's services.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Lead Requirements</h4>
                        <p className="text-sm text-gray-700">
                          "Hot leads" must include verified contact information, specific property requests, and qualification metrics with proper consent.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Tracking & Payment</h4>
                        <p className="text-sm text-gray-700">
                          Commissions tracked via approved systems; payment within 30 days after lead conversion and sale completion.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Compliance Clause</h4>
                        <p className="text-sm text-gray-700">
                          Affiliates are responsible for abiding by NMC, PDPL, TDRA, consumer protection, telemarketing laws, and must indemnify Desert Jewel Realty from any breaches.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Data Obligations</h4>
                        <p className="text-sm text-gray-700">
                          Affiliates must secure consents and handle personal data under PDPL and applicable privacy laws.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Termination</h4>
                        <p className="text-sm text-gray-700">
                          Desert Jewel Realty reserves the right to suspend or terminate affiliates for legal violations or policy breaches.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Governing Law</h4>
                        <p className="text-sm text-gray-700">
                          UAE federal law governs this agreement; disputes resolved in Dubai courts.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* UAE Do's and Don'ts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* UAE-Based Affiliate Do's */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        UAE-Based Affiliate Do's
                      </h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Hold valid UAE e-media license from NMC if using paid media or social promotion</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Use #Ad, #Sponsored, and #إعلان for all paid promotions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Use only approved marketing content from Desert Jewel Realty</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Collect genuine, opt-in leads with clear consent</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Respect UAE culture, Islamic values, and local laws</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Maintain truthful messaging without exaggeration</span>
                        </li>
                      </ul>
                    </div>

                    {/* UAE-Based Affiliate Don'ts */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-red-800 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        UAE-Based Affiliate Don'ts
                      </h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>Don't use paid ads or social media without proper media license</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>Don't hide sponsorships or paid partnerships</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>Don't misrepresent your role as broker or employee</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>Don't use banned platforms or inappropriate content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>Don't collect or sell lead data to third parties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>Don't engage in black hat techniques or fake reviews</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* International Affiliate Terms & Conditions */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-6 text-blue-900 flex items-center gap-2">
                      <Globe className="w-6 h-6" />
                      International Affiliate Terms & Conditions
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Program Eligibility */}
                      <div className="bg-white rounded-lg p-5 border border-blue-100">
                        <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          Program Eligibility
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Must be at least 18 years old and legally authorized to promote real estate services</li>
                          <li>• Cannot be based in or promoting to countries under UAE or international sanctions</li>
                          <li>• Understand this is a referral partnership, not employment or brokerage</li>
                        </ul>
                      </div>

                      {/* Promotion Guidelines */}
                      <div className="bg-white rounded-lg p-5 border border-yellow-100">
                        <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-600" />
                          Promotion Guidelines
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Permitted Channels:</strong></p>
                          <ul className="space-y-1 pl-4">
                            <li>• Blogs, articles, real estate comparison content</li>
                            <li>• Organic social media (Instagram, YouTube, TikTok)</li>
                            <li>• Paid ads (with prior written approval only)</li>
                            <li>• Email newsletters (opt-in recipients only)</li>
                          </ul>
                          <p className="mt-3"><strong>Requirements:</strong></p>
                          <ul className="space-y-1 pl-4">
                            <li>• Use accurate, honest, approved marketing materials</li>
                            <li>• Clearly disclose paid promotions (#Ad, #Sponsored, etc.)</li>
                            <li>• Follow cultural sensitivities in target markets</li>
                            <li>• Comply with local laws (FTC, GDPR, etc.)</li>
                            <li>• Respect UAE cultural sensitivities</li>
                          </ul>
                        </div>
                      </div>

                      {/* Commission Terms */}
                      <div className="bg-white rounded-lg p-5 border border-green-100">
                        <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          Commission Terms
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Commission paid only on successful property sale closures</li>
                          <li>• No payment for traffic, leads, clicks, or incomplete transactions</li>
                          <li>• Sales must be verifiable direct referrals (not existing clients)</li>
                          <li>• Payment via bank transfer within 30-45 days of sale closure</li>
                          <li>• Commission amounts confirmed in writing per partnership</li>
                        </ul>
                      </div>

                      {/* Prohibited Conduct */}
                      <div className="bg-white rounded-lg p-5 border border-red-100">
                        <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          Prohibited Conduct
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Misrepresenting yourself as Desert Jewel Realty staff/agent</li>
                          <li>• Bidding on brand terms in paid ads</li>
                          <li>• Using bots, click farms, or fake engagement</li>
                          <li>• Submitting unqualified or fake buyer inquiries</li>
                          <li>• Distributing or reselling collected lead data</li>
                          <li>• Violating local laws or platform guidelines</li>
                          <li>• Posting culturally insensitive content</li>
                        </ul>
                      </div>

                      {/* Data & Privacy */}
                      <div className="bg-white rounded-lg p-5 border border-purple-100">
                        <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                          <KeyRound className="w-5 h-5 text-purple-600" />
                          Data & Privacy
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Collect personal data only with informed user consent</li>
                          <li>• Comply with privacy laws in your country (GDPR, CCPA)</li>
                          <li>• Do not retain, share, or resell client data once referred</li>
                          <li>• Report any data breaches within 48 hours</li>
                        </ul>
                      </div>

                      {/* Termination & Legal */}
                      <div className="bg-white rounded-lg p-5 border border-gray-100">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-gray-600" />
                          Termination & Legal
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>Desert Jewel Realty may:</p>
                          <ul className="space-y-1 pl-4">
                            <li>• Terminate partnerships at any time, with or without cause</li>
                            <li>• Deny commissions for fraudulent or existing referrals</li>
                            <li>• Take legal action for brand misuse or false representation</li>
                          </ul>
                          <p className="mt-3"><strong>Governing Law:</strong></p>
                          <p>UAE federal law governs; disputes resolved in Dubai courts</p>
                          <p className="mt-2"><strong>Exit Process:</strong></p>
                          <p>Email info@desertjewelrealty.com to exit program</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acknowledgement */}
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Acknowledgement</h4>
                    <p className="text-sm text-green-700">
                      By promoting Desert Jewel Realty, you acknowledge and agree to these Terms & Conditions and commit to acting ethically, professionally, and legally in all promotional activities.
                    </p>
                  </div>

                  {/* Data Protection & Compliance */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-6 text-purple-900 flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6" />
                      Data Protection & Compliance
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Data Handling Requirements */}
                      <div className="bg-white rounded-lg p-5 border border-purple-100">
                        <h4 className="font-semibold text-purple-800 mb-3">Data Handling Requirements</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Obtain explicit consent before collecting personal data</li>
                          <li>• Secure data transmission and storage practices</li>
                          <li>• Honor data deletion requests promptly</li>
                          <li>• Never sell or share lead data with third parties</li>
                        </ul>
                      </div>

                      {/* Platform Compliance */}
                      <div className="bg-white rounded-lg p-5 border border-pink-100">
                        <h4 className="font-semibold text-pink-800 mb-3">Platform Compliance</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Follow social media platform advertising policies</li>
                          <li>• Comply with search engine guidelines</li>
                          <li>• Respect email marketing regulations</li>
                          <li>• Avoid spam and unsolicited communications</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <p><strong>Last Updated:</strong> June 2025 | <strong>Contact:</strong> For questions about these terms, contact us through WhatsApp or Telegram</p>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setIsTermsDialogOpen(false)} className="px-6">
                    I Understand & Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of successful affiliates earning substantial commissions by promoting Dubai's finest properties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to start earning commissions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Complete our affiliate application form and get approved to join our program"
              },
              {
                step: "2",
                title: "Sign Partnership Agreement",
                description: "Review and sign our partnership agreement to formalize the collaboration"
              },
              {
                step: "3",
                title: "Refer Clients",
                description: "Share our premium properties with your network using provided marketing materials"
              },
              {
                step: "4",
                title: "Earn Commission",
                description: "Receive up to 15% commission when your referrals successfully purchase properties"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Commission Structure</h2>
            <p className="text-xl text-muted-foreground">
              Transparent and competitive commission rates
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Up to 15% Commission Share</CardTitle>
                <CardDescription className="text-lg">
                  Earn up to 15% of our company commission on successful sales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">How It Works:</h4>
                  <p className="text-blue-800 text-sm">
                    You earn up to 15% of the commission we receive from developers based on your performance level. 
                    For example, if we earn 5% commission on a <span className="inline"><DirhamLogo variant="green" size="xs" /> 1M</span> property (<span className="inline"><DirhamLogo variant="green" size="xs" /> 50,000</span>), you could get <span className="inline"><DirhamLogo variant="green" size="xs" /> 2,500-7,500</span>.
                  </p>
                </div>

                <Tabs defaultValue="examples" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="examples">Commission Examples</TabsTrigger>
                    <TabsTrigger value="calculator">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculator
                    </TabsTrigger>
                    <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="examples" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Commission Examples:</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium flex items-center gap-0.5"><DirhamLogo variant="green" size="xs" />1M Property</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-0.5">Company gets 5% (<DirhamLogo variant="green" size="xs" />50K)</div>
                            </div>
                            <span className="font-semibold text-primary flex items-center gap-0.5"><DirhamLogo variant="green" size="xs" />500 - 7,500</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium flex items-center gap-0.5"><DirhamLogo variant="green" size="xs" />5M Property</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-0.5">Company gets 3% (<DirhamLogo variant="green" size="xs" />150K)</div>
                            </div>
                            <span className="font-semibold text-primary flex items-center gap-0.5"><DirhamLogo variant="green" size="xs" />1,500 - 22,500</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium flex items-center gap-0.5"><DirhamLogo variant="green" size="xs" />10M Property</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-0.5">Company gets 2% (<DirhamLogo variant="green" size="xs" />200K)</div>
                            </div>
                            <span className="font-semibold text-primary flex items-center gap-0.5"><DirhamLogo variant="green" size="xs" />2,000 - 30,000</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Payment Terms:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span>Commission paid after sale completion</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span>No upfront fees or hidden costs</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span>WhatsApp/Telegram communication</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span>Marketing materials provided in groups</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="calculator" className="space-y-6">
                    <div className="max-w-2xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="propertyValue" className="flex items-center gap-0.5">Property Value (<DirhamLogo variant="green" size="xs" />)</Label>
                            <Input
                              id="propertyValue"
                              type="number"
                              placeholder="Enter property value"
                              value={calculatorData.propertyValue}
                              onChange={(e) => handleCalculatorChange('propertyValue', e.target.value)}
                              className="text-lg"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="companyRate">Company Commission Rate (%)</Label>
                            <Select 
                              value={calculatorData.companyCommissionRate} 
                              onValueChange={(value) => handleCalculatorChange('companyCommissionRate', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select commission rate" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2">2%</SelectItem>
                                <SelectItem value="3">3%</SelectItem>
                                <SelectItem value="4">4%</SelectItem>
                                <SelectItem value="5">5%</SelectItem>
                                <SelectItem value="6">6%</SelectItem>
                                <SelectItem value="7">7%</SelectItem>
                                <SelectItem value="8">8%</SelectItem>
                                <SelectItem value="9">9%</SelectItem>
                                <SelectItem value="10">10%</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="affiliateRate">Your Commission Rate (% of Company Commission)</Label>
                            <Select 
                              value={calculatorData.affiliateCommissionRate} 
                              onValueChange={(value) => handleCalculatorChange('affiliateCommissionRate', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select your rate" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1%</SelectItem>
                                <SelectItem value="2">2%</SelectItem>
                                <SelectItem value="3">3%</SelectItem>
                                <SelectItem value="4">4%</SelectItem>
                                <SelectItem value="5">5%</SelectItem>
                                <SelectItem value="6">6%</SelectItem>
                                <SelectItem value="7">7%</SelectItem>
                                <SelectItem value="8">8%</SelectItem>
                                <SelectItem value="9">9%</SelectItem>
                                <SelectItem value="10">10%</SelectItem>
                                <SelectItem value="11">11%</SelectItem>
                                <SelectItem value="12">12%</SelectItem>
                                <SelectItem value="13">13%</SelectItem>
                                <SelectItem value="14">14%</SelectItem>
                                <SelectItem value="15">15%</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-lg mb-3">Commission Breakdown:</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Property Value:</span>
                                <span className="font-medium flex items-center gap-0.5"><DirhamLogo variant="green" size="xs" />{propertyValue.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Company Commission ({companyCommissionRate}%):</span>
                                <span className="font-medium flex items-center gap-0.5"><DirhamLogo variant="green" size="xs" />{companyCommission.toLocaleString()}</span>
                              </div>
                              <div className="border-t pt-2 flex justify-between text-lg font-bold text-primary">
                                <span>Your Commission ({affiliateCommissionRate}%):</span>
                                <span className="flex items-center gap-0.5"><DirhamLogo variant="green" size="xs" />{affiliateCommission.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-green-800 text-sm">
                              <strong>How it works:</strong> You earn 1-15% of the commission we receive from the developer based on your partnership level. 
                              Higher-performing affiliates earn higher commission rates!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="terms" className="space-y-6">
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
                        <h4 className="font-semibold text-amber-900 mb-2">Important Legal Notice</h4>
                        <p className="text-amber-800 text-sm">
                          By participating in our affiliate program, you agree to comply with all applicable laws in your jurisdiction and the UAE. 
                          These terms are binding and violations may result in immediate termination and legal action.
                        </p>
                      </div>

                      <div className="space-y-8">
                        {/* Affiliate Program Terms */}
                        <div className="bg-white border rounded-lg p-6">
                          <h3 className="text-xl font-semibold mb-4 text-primary">Affiliate Program Terms</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Enrollment</h4>
                              <p className="text-sm text-muted-foreground">
                                By applying to join, affiliates confirm they are licensed under UAE law (trade + e-media) if operating from within the UAE.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Promotional Content</h4>
                              <p className="text-sm text-muted-foreground">
                                Affiliates must disclose paid links (#Ad/#Sponsored/#إعلان) in English & Arabic and avoid misleading claims about Desert Jewel Realty's services.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Lead Requirements</h4>
                              <p className="text-sm text-muted-foreground">
                                "Hot leads" must include verified contact information, specific property requests, and qualification metrics with proper consent.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Tracking & Payment</h4>
                              <p className="text-sm text-muted-foreground">
                                Commissions tracked via approved systems; payment within 30 days after lead conversion and sale completion.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Compliance Clause</h4>
                              <p className="text-sm text-muted-foreground">
                                Affiliates are responsible for abiding by NMC, PDPL, TDRA, consumer protection, telemarketing laws, and must indemnify Desert Jewel Realty from any breaches.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Data Obligations</h4>
                              <p className="text-sm text-muted-foreground">
                                Affiliates must secure consents and handle personal data under PDPL and applicable privacy laws.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Termination</h4>
                              <p className="text-sm text-muted-foreground">
                                Desert Jewel Realty reserves the right to suspend or terminate affiliates for legal violations or policy breaches.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Governing Law</h4>
                              <p className="text-sm text-muted-foreground">
                                UAE federal law governs this agreement; disputes resolved in Dubai courts.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* UAE-Based Affiliates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5" />
                              UAE-Based Affiliate Do's
                            </h3>
                            <ul className="space-y-3 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Hold valid UAE e-media license from NMC if using paid media or social promotion</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Use #Ad, #Sponsored, and #إعلان for all paid promotions</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Use only approved marketing content from Desert Jewel Realty</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Collect genuine, opt-in leads with clear consent</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Respect UAE culture, Islamic values, and local laws</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Maintain truthful messaging without exaggeration</span>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-red-800 flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">✕</span>
                              UAE-Based Affiliate Don'ts
                            </h3>
                            <ul className="space-y-3 text-sm">
                              <li className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-xs mt-0.5 flex-shrink-0">✕</span>
                                <span>Don't use paid ads or social media without proper media license</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-xs mt-0.5 flex-shrink-0">✕</span>
                                <span>Don't hide sponsorships or paid partnerships</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-xs mt-0.5 flex-shrink-0">✕</span>
                                <span>Don't misrepresent your role as broker or employee</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-xs mt-0.5 flex-shrink-0">✕</span>
                                <span>Don't use banned platforms or inappropriate content</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-xs mt-0.5 flex-shrink-0">✕</span>
                                <span>Don't collect or sell lead data to third parties</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-xs mt-0.5 flex-shrink-0">✕</span>
                                <span>Don't engage in black hat techniques or fake reviews</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* International Affiliates - Detailed Terms */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                          <h3 className="text-xl font-semibold mb-6 text-blue-900 flex items-center gap-2">
                            <Globe className="w-6 h-6" />
                            International Affiliate Terms & Conditions
                          </h3>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Program Eligibility */}
                            <div className="bg-white rounded-lg p-5 border border-blue-100">
                              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                Program Eligibility
                              </h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Must be at least 18 years old and legally authorized to promote real estate services</li>
                                <li>• Cannot be based in or promoting to countries under UAE or international sanctions</li>
                                <li>• Understand this is a referral partnership, not employment or brokerage</li>
                              </ul>
                            </div>

                            {/* Promotion Guidelines */}
                            <div className="bg-white rounded-lg p-5 border border-blue-100">
                              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-600" />
                                Promotion Guidelines
                              </h4>
                              <div className="space-y-3 text-sm">
                                <div>
                                  <p className="font-medium text-green-700 mb-1">Permitted Channels:</p>
                                  <ul className="space-y-1 text-xs">
                                    <li>• Blogs, articles, real estate comparison content</li>
                                    <li>• Organic social media (Instagram, YouTube, TikTok)</li>
                                    <li>• Paid ads (with prior written approval only)</li>
                                    <li>• Email newsletters (opt-in recipients only)</li>
                                  </ul>
                                </div>
                                <div>
                                  <p className="font-medium text-blue-700 mb-1">Requirements:</p>
                                  <ul className="space-y-1 text-xs">
                                    <li>• Use accurate, honest, approved marketing materials</li>
                                    <li>• Clearly disclose paid promotions (#Ad, #Sponsored, #Affiliate)</li>
                                    <li>• Comply with local laws (FTC, GDPR, etc.)</li>
                                    <li>• Respect UAE cultural sensitivities</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Commission Terms */}
                            <div className="bg-white rounded-lg p-5 border border-blue-100">
                              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                Commission Terms
                              </h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Commission paid only on successful property sale closures</li>
                                <li>• No payment for traffic, leads, clicks, or incomplete transactions</li>
                                <li>• Sales must be verifiable direct referrals (not existing clients)</li>
                                <li>• Payment via bank transfer within 30-45 days of sale closure</li>
                                <li>• Commission amounts confirmed in writing per partnership</li>
                              </ul>
                            </div>

                            {/* Prohibited Conduct */}
                            <div className="bg-white rounded-lg p-5 border border-red-100">
                              <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">✕</span>
                                Prohibited Conduct
                              </h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Misrepresenting yourself as Desert Jewel Realty staff/agent</li>
                                <li>• Bidding on brand terms in paid ads</li>
                                <li>• Using bots, click farms, or fake engagement</li>
                                <li>• Submitting unqualified or fake buyer inquiries</li>
                                <li>• Distributing or reselling collected lead data</li>
                                <li>• Violating local laws or platform guidelines</li>
                                <li>• Posting culturally insensitive content</li>
                              </ul>
                            </div>

                            {/* Data & Privacy */}
                            <div className="bg-white rounded-lg p-5 border border-blue-100">
                              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-600" />
                                Data & Privacy
                              </h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Collect personal data only with informed user consent</li>
                                <li>• Comply with privacy laws in your country (GDPR, CCPA)</li>
                                <li>• Do not retain, share, or resell client data once referred</li>
                                <li>• Report any data breaches within 48 hours</li>
                              </ul>
                            </div>

                            {/* Termination & Legal */}
                            <div className="bg-white rounded-lg p-5 border border-blue-100">
                              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                <Award className="w-5 h-5 text-orange-600" />
                                Termination & Legal
                              </h4>
                              <div className="space-y-3 text-sm">
                                <div>
                                  <p className="font-medium text-orange-700 mb-1">Desert Jewel Realty may:</p>
                                  <ul className="space-y-1 text-xs">
                                    <li>• Terminate partnerships at any time, with or without cause</li>
                                    <li>• Deny commissions for fraudulent or existing referrals</li>
                                    <li>• Take legal action for brand misuse or false representation</li>
                                  </ul>
                                </div>
                                <div>
                                  <p className="font-medium text-blue-700 mb-1">Governing Law:</p>
                                  <p className="text-xs">UAE federal law governs; disputes resolved in Dubai courts</p>
                                </div>
                                <div>
                                  <p className="font-medium text-green-700 mb-1">Exit Process:</p>
                                  <p className="text-xs">Email partners@desertjewelrealty.com to exit program</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-800 mb-2">Acknowledgement</h4>
                            <p className="text-sm text-green-700">
                              By promoting Desert Jewel Realty, you acknowledge and agree to these Terms & Conditions 
                              and commit to acting ethically, professionally, and legally in all promotional activities.
                            </p>
                          </div>
                        </div>

                        {/* Compliance and Data Protection */}
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4 text-purple-800">Data Protection & Compliance</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-2 text-purple-700">Data Handling Requirements</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Obtain explicit consent before collecting personal data</li>
                                <li>• Secure data transmission and storage practices</li>
                                <li>• Honor data deletion requests promptly</li>
                                <li>• Never sell or share lead data with third parties</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 text-purple-700">Platform Compliance</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Follow social media platform advertising policies</li>
                                <li>• Comply with search engine guidelines</li>
                                <li>• Respect email marketing regulations</li>
                                <li>• Avoid spam and unsolicited communications</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-6 text-center">
                          <p className="text-sm text-muted-foreground">
                            <strong>Last Updated:</strong> June 2025 | 
                            <strong> Contact:</strong> For questions about these terms, contact us through WhatsApp or Telegram
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Get answers to common questions about our affiliate program
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do I track my referrals?",
                answer: "All communication and tracking happens through WhatsApp or Telegram groups. When you send leads, our team will update you on their status directly in the group chat."
              },
              {
                question: "When do I receive my commission?",
                answer: "Commissions are paid within 30 days after the property sale has been completed and all legal documents have been signed by both parties."
              },
              {
                question: "How do I send leads to you?",
                answer: "Simply message potential clients' details directly to our WhatsApp number. Our team will handle the lead and keep you updated on progress through the affiliate group."
              },
              {
                question: "What marketing materials do you provide?",
                answer: "Marketing materials including property brochures, videos, images, and promotional content are shared directly in the WhatsApp/Telegram affiliate groups for easy access and sharing."
              },
              {
                question: "How do I join the affiliate groups?",
                answer: "After your application is approved, you'll be added to our WhatsApp and/or Telegram affiliate groups based on your preference. These groups contain all marketing materials and updates."
              },
              {
                question: "Do I need real estate experience?",
                answer: "No prior real estate experience is required. Our affiliate groups provide ongoing support, training materials, and direct communication with our expert team."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our affiliate program today and start earning commissions on Dubai's most prestigious properties
            </p>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
              </DialogTrigger>
            </Dialog>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Affiliates;