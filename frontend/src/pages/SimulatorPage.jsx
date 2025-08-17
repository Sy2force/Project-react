import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Download, FileText, Calculator, Target, TrendingUp, Award, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Card, Button, Input, Modal } from '../components/ui/index.js';

const SimulatorPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Simulation questions
  const questions = [
    {
      id: 'business_type',
      title: 'What type of business do you have?',
      type: 'single',
      options: [
        { value: 'ecommerce', label: 'E-commerce / Online Store', weight: 1.2 },
        { value: 'saas', label: 'SaaS / Software Platform', weight: 1.5 },
        { value: 'service', label: 'Service-based Business', weight: 1.0 },
        { value: 'startup', label: 'Tech Startup', weight: 1.4 },
        { value: 'enterprise', label: 'Enterprise / Corporation', weight: 1.3 },
        { value: 'nonprofit', label: 'Non-profit Organization', weight: 0.8 }
      ]
    },
    {
      id: 'budget_range',
      title: 'What is your project budget range?',
      type: 'single',
      options: [
        { value: 'small', label: '$5,000 - $15,000', weight: 0.8 },
        { value: 'medium', label: '$15,000 - $50,000', weight: 1.0 },
        { value: 'large', label: '$50,000 - $100,000', weight: 1.2 },
        { value: 'enterprise', label: '$100,000+', weight: 1.5 }
      ]
    },
    {
      id: 'timeline',
      title: 'What is your desired timeline?',
      type: 'single',
      options: [
        { value: 'urgent', label: '1-2 months (Rush)', weight: 1.3 },
        { value: 'normal', label: '3-6 months (Standard)', weight: 1.0 },
        { value: 'extended', label: '6-12 months (Extended)', weight: 0.9 },
        { value: 'flexible', label: '12+ months (Flexible)', weight: 0.8 }
      ]
    },
    {
      id: 'primary_goals',
      title: 'What are your primary business goals?',
      type: 'multiple',
      options: [
        { value: 'increase_sales', label: 'Increase Sales & Revenue', weight: 1.2 },
        { value: 'brand_awareness', label: 'Build Brand Awareness', weight: 1.0 },
        { value: 'user_engagement', label: 'Improve User Engagement', weight: 1.1 },
        { value: 'automation', label: 'Automate Business Processes', weight: 1.3 },
        { value: 'market_expansion', label: 'Expand to New Markets', weight: 1.2 },
        { value: 'customer_retention', label: 'Improve Customer Retention', weight: 1.1 }
      ]
    },
    {
      id: 'current_challenges',
      title: 'What are your biggest current challenges?',
      type: 'multiple',
      options: [
        { value: 'outdated_tech', label: 'Outdated Technology Stack', weight: 1.3 },
        { value: 'poor_ux', label: 'Poor User Experience', weight: 1.2 },
        { value: 'low_conversion', label: 'Low Conversion Rates', weight: 1.2 },
        { value: 'scalability', label: 'Scalability Issues', weight: 1.4 },
        { value: 'security', label: 'Security Concerns', weight: 1.3 },
        { value: 'integration', label: 'System Integration Problems', weight: 1.1 }
      ]
    },
    {
      id: 'target_audience',
      title: 'Who is your target audience?',
      type: 'single',
      options: [
        { value: 'b2b', label: 'Business to Business (B2B)', weight: 1.2 },
        { value: 'b2c', label: 'Business to Consumer (B2C)', weight: 1.0 },
        { value: 'b2b2c', label: 'B2B2C Platform', weight: 1.3 },
        { value: 'internal', label: 'Internal Users/Employees', weight: 0.9 }
      ]
    },
    {
      id: 'technical_complexity',
      title: 'How complex are your technical requirements?',
      type: 'single',
      options: [
        { value: 'simple', label: 'Simple (Basic website/app)', weight: 0.8 },
        { value: 'moderate', label: 'Moderate (Custom features)', weight: 1.0 },
        { value: 'complex', label: 'Complex (Advanced integrations)', weight: 1.3 },
        { value: 'enterprise', label: 'Enterprise (Mission-critical)', weight: 1.5 }
      ]
    },
    {
      id: 'growth_stage',
      title: 'What stage is your business in?',
      type: 'single',
      options: [
        { value: 'startup', label: 'Early Startup (0-2 years)', weight: 1.1 },
        { value: 'growth', label: 'Growth Stage (2-5 years)', weight: 1.2 },
        { value: 'established', label: 'Established (5+ years)', weight: 1.0 },
        { value: 'enterprise', label: 'Large Enterprise', weight: 1.3 }
      ]
    }
  ];

  // Service recommendations based on answers
  const services = [
    {
      id: 'web_development',
      name: 'Custom Web Development',
      description: 'Full-stack web application development with modern technologies',
      baseScore: 80,
      factors: ['business_type', 'technical_complexity', 'budget_range'],
      icon: '🌐',
      estimatedCost: '$15,000 - $75,000',
      timeline: '3-6 months'
    },
    {
      id: 'mobile_app',
      name: 'Mobile App Development',
      description: 'Native or cross-platform mobile applications',
      baseScore: 70,
      factors: ['business_type', 'target_audience', 'budget_range'],
      icon: '📱',
      estimatedCost: '$25,000 - $100,000',
      timeline: '4-8 months'
    },
    {
      id: 'ui_ux_design',
      name: 'UI/UX Design & Optimization',
      description: 'User interface design and user experience optimization',
      baseScore: 85,
      factors: ['current_challenges', 'primary_goals', 'target_audience'],
      icon: '🎨',
      estimatedCost: '$8,000 - $30,000',
      timeline: '2-4 months'
    },
    {
      id: 'ecommerce_platform',
      name: 'E-commerce Platform',
      description: 'Complete e-commerce solution with payment integration',
      baseScore: 60,
      factors: ['business_type', 'primary_goals', 'technical_complexity'],
      icon: '🛒',
      estimatedCost: '$20,000 - $80,000',
      timeline: '3-6 months'
    },
    {
      id: 'automation_tools',
      name: 'Business Process Automation',
      description: 'Custom automation tools and workflow optimization',
      baseScore: 65,
      factors: ['primary_goals', 'current_challenges', 'growth_stage'],
      icon: '⚡',
      estimatedCost: '$12,000 - $50,000',
      timeline: '2-5 months'
    },
    {
      id: 'analytics_dashboard',
      name: 'Analytics & Reporting Dashboard',
      description: 'Custom analytics platform with real-time insights',
      baseScore: 75,
      factors: ['business_type', 'primary_goals', 'technical_complexity'],
      icon: '📊',
      estimatedCost: '$18,000 - $60,000',
      timeline: '3-5 months'
    }
  ];

  const handleAnswerChange = (questionId, value, isMultiple = false) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(value)
          ? currentAnswers.filter(v => v !== value)
          : [...currentAnswers, value];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: value };
      }
    });
  };

  const calculateResults = () => {
    const serviceScores = services.map(service => {
      let score = service.baseScore;
      let relevanceMultiplier = 1;

      // Calculate relevance based on answers
      service.factors.forEach(factor => {
        const answer = answers[factor];
        if (answer) {
          const question = questions.find(q => q.id === factor);
          if (question) {
            if (Array.isArray(answer)) {
              // Multiple choice answers
              answer.forEach(ans => {
                const option = question.options.find(opt => opt.value === ans);
                if (option) {
                  relevanceMultiplier *= option.weight;
                }
              });
            } else {
              // Single choice answer
              const option = question.options.find(opt => opt.value === answer);
              if (option) {
                relevanceMultiplier *= option.weight;
              }
            }
          }
        }
      });

      // Apply business type specific bonuses
      const businessType = answers.business_type;
      if (businessType === 'ecommerce' && service.id === 'ecommerce_platform') {
        relevanceMultiplier *= 1.5;
      }
      if (businessType === 'saas' && (service.id === 'web_development' || service.id === 'analytics_dashboard')) {
        relevanceMultiplier *= 1.3;
      }

      const finalScore = Math.min(100, score * relevanceMultiplier);
      return { ...service, score: Math.round(finalScore), relevanceMultiplier };
    });

    // Sort by score and take top recommendations
    const topServices = serviceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // Calculate overall project metrics
    const budgetRange = answers.budget_range;
    const timeline = answers.timeline;
    const complexity = answers.technical_complexity;

    let estimatedBudget = '$25,000 - $75,000';
    let estimatedTimeline = '3-6 months';
    let riskLevel = 'Medium';

    // Adjust estimates based on answers
    if (budgetRange === 'small') estimatedBudget = '$10,000 - $30,000';
    if (budgetRange === 'large') estimatedBudget = '$50,000 - $150,000';
    if (budgetRange === 'enterprise') estimatedBudget = '$100,000+';

    if (timeline === 'urgent') {
      estimatedTimeline = '1-3 months';
      riskLevel = 'High';
    }
    if (timeline === 'extended') estimatedTimeline = '6-12 months';

    if (complexity === 'enterprise') riskLevel = 'High';
    if (complexity === 'simple') riskLevel = 'Low';

    return {
      recommendedServices: topServices,
      projectMetrics: {
        estimatedBudget,
        estimatedTimeline,
        riskLevel,
        complexityScore: Math.round(topServices.reduce((acc, s) => acc + s.score, 0) / topServices.length)
      },
      totalScore: Math.round(topServices.reduce((acc, s) => acc + s.score, 0) / topServices.length)
    };
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate and show results
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGeneratingPDF(false);
    
    // In a real implementation, this would generate and download a PDF
    alert('PDF report generated! (This is a demo - no actual PDF was created)');
  };

  const resetSimulator = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
    setShowResults(false);
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (showResults && results) {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">Project Analysis</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Based on your responses, here's our comprehensive project recommendation and analysis.
          </p>
        </motion.div>

        {/* Project Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card variant="glass" className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-6 h-6 text-neon-cyan" />
            </div>
            <h3 className="text-white font-semibold mb-2">Estimated Budget</h3>
            <p className="text-2xl font-bold text-neon-cyan">{results.projectMetrics.estimatedBudget}</p>
          </Card>

          <Card variant="glass" className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-neon-purple" />
            </div>
            <h3 className="text-white font-semibold mb-2">Timeline</h3>
            <p className="text-2xl font-bold text-neon-purple">{results.projectMetrics.estimatedTimeline}</p>
          </Card>

          <Card variant="glass" className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Risk Level</h3>
            <p className={`text-2xl font-bold ${
              results.projectMetrics.riskLevel === 'Low' ? 'text-green-400' :
              results.projectMetrics.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {results.projectMetrics.riskLevel}
            </p>
          </Card>

          <Card variant="glass" className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Match Score</h3>
            <p className="text-2xl font-bold text-emerald-400">{results.totalScore}%</p>
          </Card>
        </motion.div>

        {/* Recommended Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Recommended <span className="text-neon-cyan">Services</span>
          </h2>
          
          <div className="space-y-4">
            {results.recommendedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="text-4xl">{service.icon}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{service.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            service.score >= 90 ? 'bg-green-500' :
                            service.score >= 75 ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-sm font-semibold text-gray-300">{service.score}% match</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{service.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calculator className="w-4 h-4" />
                          <span>{service.estimatedCost}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          <span>{service.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2"
          >
            {isGeneratingPDF ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Full Report
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={resetSimulator}
            className="flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Start New Analysis
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Project <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">Simulator</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Get personalized project recommendations based on your business needs and requirements.
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold">Progress</span>
            <span className="text-neon-cyan font-semibold">{currentStep + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-neon-cyan to-neon-blue h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </Card>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card variant="glass" className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {currentQuestion.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Info className="w-4 h-4" />
                <span className="text-sm">
                  {currentQuestion.type === 'multiple' ? 'Select all that apply' : 'Choose one option'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleAnswerChange(currentQuestion.id, option.value, currentQuestion.type === 'multiple')}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      (currentQuestion.type === 'multiple' 
                        ? (answers[currentQuestion.id] || []).includes(option.value)
                        : answers[currentQuestion.id] === option.value)
                        ? 'border-neon-cyan bg-neon-cyan/10 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-neon-cyan/50 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      {(currentQuestion.type === 'multiple' 
                        ? (answers[currentQuestion.id] || []).includes(option.value)
                        : answers[currentQuestion.id] === option.value) && (
                        <CheckCircle className="w-5 h-5 text-neon-cyan" />
                      )}
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-between items-center"
      >
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          variant="primary"
          onClick={nextStep}
          disabled={!answers[currentQuestion.id] || (currentQuestion.type === 'multiple' && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0))}
          className="flex items-center gap-2"
        >
          {currentStep === questions.length - 1 ? 'Get Results' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default SimulatorPage;
