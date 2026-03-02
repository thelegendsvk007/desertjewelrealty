import { motion } from 'framer-motion';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Mail, Phone, Globe, MapPin, TrendingUp, Award, Users } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  experience: string[];
  specializations: string[];
  achievements: string[];
  contactInfo: {
    email: string;
    phone: string;
    linkedin?: string;
  };
  location: string;
  languages: string[];
  education: string[];
  certifications: string[];
}

const teamMembers: Record<string, TeamMember> = {
  'safiyan-khan': {
    id: 'safiyan-khan',
    name: 'Safiyan Khan',
    title: 'Founder & Managing Director',
    bio: 'Safiyan Khan is the visionary founder and managing director of Desert Jewel Realty. With over 5 years of hands-on real estate experience and more than 25 years of deep-rooted familiarity with the UAE market, Safiyan combines strategic foresight with a tech-driven mindset. His leadership has been instrumental in shaping Desert Jewel Realty into a client-centric, innovative agency known for excellence and integrity across the region\'s competitive property landscape.',
    experience: [
      '5+ years in UAE real estate',
      '25 years of UAE residency and market insight'
    ],
    specializations: [
      'Luxury & High-End Residential Properties',
      'Off-Plan Investment Opportunities',
      'Business Development & Market Strategy',
      'International Buyer Representation',
      'Digital-First Real Estate Solutions'
    ],
    achievements: [
      'Founded and scaled Desert Jewel Realty into a high-performing real estate agency',
      'Integrated modern technology into sales, marketing, and property operations',
      'Cultivated strategic partnerships with top-tier developers and global investors',
      'Built a growing international client base with a strong reputation for service excellence'
    ],
    contactInfo: {
      email: 'safiyan.khan@desertjewelrealty.com',
      phone: '+971 58 953 2210',
      linkedin: 'https://www.linkedin.com/company/desert-jewel-realty/'
    },
    location: 'Dubai, UAE',
    languages: ['English', 'Hindi', 'Arabic'],
    education: [
      'Bachelor of Science in Computer Science - Heriot-Watt University, Dubai'
    ],
    certifications: [
      'RERA Certified Real Estate Broker',
      'Certified Property Manager (CPM)',
      'International Real Estate Specialist'
    ]
  },
  'jiten-thakker': {
    id: 'jiten-thakker',
    name: 'Jiten Thakker',
    title: 'Sales Director - India',
    bio: 'With over 30 years of success in real estate and general insurance, Jiten Thakker brings a results-driven, customer-centric approach to Desert Jewel Realty. His extensive background in business development, retail sales, CRM, and channel expansion makes him a strategic asset in driving growth and building lasting client relationships across diverse markets. Jiten is known for navigating complex business environments with clarity, consistently delivering value through innovative sales strategies and team leadership.',
    experience: [
      '30+ years in real estate and business development'
    ],
    specializations: [
      'Business Development & Expansion',
      'Channel Management & Partner Relations',
      'CRM & Customer Experience Strategy',
      'Retail Sales in Real Estate & Insurance',
      'Team Leadership & Performance Management'
    ],
    achievements: [
      'Spearheaded large-scale business expansion across real estate and insurance sectors',
      'Successfully led multi-regional retail sales initiatives with consistent YoY growth',
      'Built and nurtured high-performing teams in dynamic, customer-facing roles',
      'Established strategic distribution channels across competitive markets',
      'Recognized for excellence in client engagement and service delivery'
    ],
    contactInfo: {
      email: 'jitenthakker@desertjewelrealty.com',
      phone: '+971 58 953 2210',
      linkedin: 'https://www.linkedin.com/company/desert-jewel-realty/'
    },
    location: 'Dubai, UAE',
    languages: ['English', 'Hindi', 'Gujarati'],
    education: [
      'Diploma in Marketing Management - K J Somaiya Institute of Management Studies & Research, Mumbai (1997)',
      'Bachelor of Commerce – Financial Accounting & Auditing - SIES College, Mumbai University (1992)'
    ],
    certifications: [
      'RERA Certified Real Estate Broker',
      'Certified Property Manager (CPM)',
      'International Real Estate Specialist'
    ]
  }
};

const TeamMemberProfile = () => {
  const { id } = useParams();
  const member = id ? teamMembers[id] : null;

  if (!member) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Team Member Not Found</h1>
          <Link 
            to="/about" 
            className="text-primary hover:underline"
            aria-label="Return to About Us page"
          >
            Return to About Us
          </Link>
        </div>
      </div>
    );
  }

  const socialLinks = [
    { key: 'linkedin', label: 'LinkedIn', icon: <Globe className="w-4 h-4 mr-3 text-primary" /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 min-h-screen bg-gray-50"
    >
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/about" 
            className="inline-flex items-center text-primary hover:text-primary-dark mb-6 transition-colors"
            aria-label="Return to About Us page"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to About Us
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-montserrat font-bold mb-2">{member.name}</h1>
              <p className="text-xl text-primary mb-4">{member.title}</p>
              <p className="text-gray-600 leading-relaxed">{member.bio}</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-primary" aria-hidden="true" />
                  <a 
                    href={`mailto:${member.contactInfo.email}`} 
                    className="text-gray-600 hover:text-primary"
                    aria-label={`Email ${member.name}`}
                  >
                    {member.contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-primary" aria-hidden="true" />
                  <a 
                    href={`tel:${member.contactInfo.phone}`} 
                    className="text-gray-600 hover:text-primary"
                    aria-label={`Call ${member.name}`}
                  >
                    {member.contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-primary" aria-hidden="true" />
                  <span className="text-gray-600">{member.location}</span>
                </div>
                {socialLinks.map(({ key, label, icon }) => (
                  member.contactInfo[key as keyof typeof member.contactInfo] && (
                    <div key={key} className="flex items-center">
                      {icon}
                      <a 
                        href={member.contactInfo[key as keyof typeof member.contactInfo] as string}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary"
                        aria-label={`${label} profile for ${member.name}`}
                      >
                        {label} Profile
                      </a>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-6 h-6 mr-3 text-primary" aria-hidden="true" />
                <h2 className="text-2xl font-montserrat font-semibold">Experience</h2>
              </div>
              {member.experience.map((exp, index) => (
                <p key={index} className="text-lg text-gray-600 mb-6">{exp}</p>
              ))}

              <h3 className="font-semibold mb-4">Specializations</h3>
              <ul className="space-y-2">
                {member.specializations.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 mr-3 text-primary" aria-hidden="true" />
                <h2 className="text-2xl font-montserrat font-semibold">Key Achievements</h2>
              </div>
              <ul className="space-y-3">
                {member.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Education</h2>
              <ul className="space-y-3">
                {member.education.map((edu, index) => (
                  <li key={index} className="text-gray-600">{edu}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Certifications</h2>
              <ul className="space-y-3">
                {member.certifications.map((cert, index) => (
                  <li key={index} className="text-gray-600">{cert}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {member.languages.map((lang, index) => (
                  <span 
                    key={index} 
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-semibold text-white mb-4">
            Ready to Work with {member.name.split(' ')[0]}?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Get in touch to discuss your real estate needs and discover how our expertise can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${member.contactInfo.email}`}
              className="bg-white text-primary px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium"
              aria-label={`Send email to ${member.name}`}
            >
              Send Email
            </a>
            <a
              href={`tel:${member.contactInfo.phone}`}
              className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-primary transition-colors font-medium"
              aria-label={`Call ${member.name}`}
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TeamMemberProfile;