import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const OffPlanVsReadyComparison = () => {
  const comparisonData = [
    {
      aspect: 'Price',
      offPlan: {
        value: 'Lower entry price with payment plans',
        pros: true,
        explanation: 'Generally 10-30% cheaper than ready properties of similar specifications'
      },
      ready: {
        value: 'Market price, immediate full payment or mortgage',
        pros: false,
        explanation: 'Higher immediate investment, but no construction risk'
      }
    },
    {
      aspect: 'Payment Structure',
      offPlan: {
        value: 'Stage-based payments (typically 20-40% during construction, 60-80% on handover)',
        pros: true,
        explanation: 'More manageable cash flow, less upfront capital required'
      },
      ready: {
        value: 'Full payment or mortgage (20-25% down payment)',
        pros: false,
        explanation: 'Higher immediate capital outlay but immediate ownership'
      }
    },
    {
      aspect: 'Return on Investment',
      offPlan: {
        value: 'Potential for capital appreciation during construction',
        pros: true,
        explanation: 'Properties can appreciate 15-30% from launch to handover in growing markets'
      },
      ready: {
        value: 'Immediate rental income',
        pros: true,
        explanation: 'Yields typically range from 5-8% depending on location and property type'
      }
    },
    {
      aspect: 'Risk',
      offPlan: {
        value: 'Construction delays, quality concerns, market shifts',
        pros: false,
        explanation: 'Higher risk as final product may differ from plans/expectations'
      },
      ready: {
        value: 'Market value fluctuations only, what you see is what you get',
        pros: true,
        explanation: 'Lower risk as property can be inspected and assessed before purchase'
      }
    },
    {
      aspect: 'Timeframe',
      offPlan: {
        value: '2-4 years until handover',
        pros: false,
        explanation: 'Long wait for property completion and potential returns'
      },
      ready: {
        value: 'Immediate possession',
        pros: true,
        explanation: 'Move in or rent out immediately after purchase'
      }
    },
    {
      aspect: 'Customization',
      offPlan: {
        value: 'Options for layout changes, finishes selection',
        pros: true,
        explanation: 'Some developers allow customization during early construction phases'
      },
      ready: {
        value: 'Limited to renovations',
        pros: false,
        explanation: 'Structural changes may be difficult or costly'
      }
    },
    {
      aspect: 'Inspection',
      offPlan: {
        value: 'Show apartments only, floor plans, and 3D renders',
        pros: false,
        explanation: 'Cannot inspect the actual unit prior to completion'
      },
      ready: {
        value: 'Full physical inspection possible',
        pros: true,
        explanation: 'Assess quality, views, noise levels, and community facilities'
      }
    },
    {
      aspect: 'Financing',
      offPlan: {
        value: 'Developer payment plans, limited mortgage options',
        pros: true,
        explanation: 'Often 0% interest on developer payment plans until handover'
      },
      ready: {
        value: 'Full range of mortgage options',
        pros: true,
        explanation: 'Multiple bank options, refinancing possibilities'
      }
    },
    {
      aspect: 'Rental Guarantees',
      offPlan: {
        value: 'Some developers offer 3-5 year rental guarantees',
        pros: true,
        explanation: 'Typically 5-8% guaranteed returns offered on certain developments'
      },
      ready: {
        value: 'Rare, market-based rental income',
        pros: false,
        explanation: 'Income dependent on current market conditions'
      }
    },
    {
      aspect: 'Exit Strategy',
      offPlan: {
        value: 'Sale before handover (assignment) or after',
        pros: true,
        explanation: 'Can sell assignment rights, often with 2-8% transfer fees'
      },
      ready: {
        value: 'Conventional resale process',
        pros: true,
        explanation: 'Standard transfer process, typically 4% DLD fees'
      }
    }
  ];

  const investorProfiles = [
    {
      title: 'First-time Investors',
      offPlan: {
        recommended: false,
        reason: 'Higher risk profile and longer wait time may not be suitable for first-time investors without diversified portfolios'
      },
      ready: {
        recommended: true,
        reason: 'Lower risk, immediate rental returns, tangible asset to assess and understand'
      }
    },
    {
      title: 'End Users',
      offPlan: {
        recommended: false,
        reason: 'Long wait times and potential construction issues may be frustrating for those needing immediate housing'
      },
      ready: {
        recommended: true,
        reason: 'Immediate move-in, what you see is what you get, no construction uncertainties'
      }
    },
    {
      title: 'Investors with Limited Capital',
      offPlan: {
        recommended: true,
        reason: 'Lower entry prices, staged payments, opportunity to build equity during construction period'
      },
      ready: {
        recommended: false,
        reason: 'Higher upfront capital requirement may be prohibitive'
      }
    },
    {
      title: 'Long-term Investors',
      offPlan: {
        recommended: true,
        reason: 'Potential for higher capital appreciation from launch to completion and beyond'
      },
      ready: {
        recommended: true,
        reason: 'Stable rental yields, lower risk profile, immediate income generation'
      }
    },
    {
      title: 'Diversification Strategy',
      offPlan: {
        recommended: true,
        reason: 'Can allocate capital across multiple properties with payment plans'
      },
      ready: {
        recommended: true,
        reason: 'Balance portfolio with mix of immediate income and capital stability'
      }
    }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Off-Plan vs Ready Property Comparison</CardTitle>
        <CardDescription>
          Understand the pros and cons of each investment option in the UAE real estate market
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="comparison">Feature Comparison</TabsTrigger>
            <TabsTrigger value="profiles">Investor Profiles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20%]">Aspect</TableHead>
                  <TableHead className="w-[40%]">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-blue-50">Off-Plan Properties</Badge>
                    </div>
                  </TableHead>
                  <TableHead className="w-[40%]">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-green-50">Ready Properties</Badge>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.aspect}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-start space-x-2">
                          {item.offPlan.pros ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /> : 
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          }
                          <p>{item.offPlan.value}</p>
                        </div>
                        <p className="text-xs text-muted-foreground ml-7">{item.offPlan.explanation}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-start space-x-2">
                          {item.ready.pros ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /> : 
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          }
                          <p>{item.ready.value}</p>
                        </div>
                        <p className="text-xs text-muted-foreground ml-7">{item.ready.explanation}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="profiles">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Investor Profile</TableHead>
                  <TableHead className="w-[35%]">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-blue-50">Off-Plan Suitability</Badge>
                    </div>
                  </TableHead>
                  <TableHead className="w-[35%]">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-green-50">Ready Property Suitability</Badge>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investorProfiles.map((profile, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{profile.title}</TableCell>
                    <TableCell>
                      <div className="flex items-start space-x-2">
                        {profile.offPlan.recommended ? 
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /> : 
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        }
                        <p className="text-sm">{profile.offPlan.reason}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start space-x-2">
                        {profile.ready.recommended ? 
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /> : 
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        }
                        <p className="text-sm">{profile.ready.reason}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="text-sm text-muted-foreground">
          <strong>Market Context (2025):</strong> The UAE property market currently shows strong demand for both off-plan and ready properties, 
          with developers competing through attractive payment plans and post-handover payment options. Each investment type has unique 
          advantages depending on your financial goals, risk tolerance, and timeline.
        </p>
      </CardFooter>
    </Card>
  );
};

export default OffPlanVsReadyComparison;