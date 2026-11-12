/**
 * The site's content, kept apart from its presentation so every page and
 * every design direction renders the same words, prices, and links.
 */
import type { ImageMetadata } from 'astro';
import adamPhoto from '../assets/coaches/adam.jpg';
import cameronPhoto from '../assets/coaches/cameron.jpg';

export const contactHref = '/contact/';

export const shopUrl = 'https://www.owayo.ie/store/trilogytraining';
export const trainingPeaksUrl = 'https://www.trainingpeaks.com/my-training-plans/trilogytraining';
export const formspreeEndpoint = 'https://formspree.io/f/mwvrjqpp';

export const social = {
  instagram: { label: 'Instagram', handle: '@trilogy_training_', href: 'https://www.instagram.com/trilogy_training_/' },
  facebook: { label: 'Facebook', handle: 'Trilogy Training', href: 'https://www.facebook.com/trilogy.tri.training/' },
};

export const whatsapp = [
  { label: 'WhatsApp (UK)', number: '+44 7545 017670', href: 'https://wa.me/447545017670' },
  { label: 'WhatsApp (CH)', number: '+41 76 722 7296', href: 'https://wa.me/41767227296' },
];

export const hero = {
  tag: 'Personalised Endurance Coaching',
  titleLines: ['Train Smarter.', 'Race Stronger.'],
  subtitle:
    'Personalised triathlon, running, cycling & swimming coaching programmes built around your life.',
  primaryCta: 'Book a Free Call',
  secondaryCta: 'Plans & Pricing',
};

export const steps = [
  {
    num: '01',
    title: 'Book a Free Call',
    desc: 'Tell us about your goals, experience, and lifestyle. We’ll discuss how personalised coaching can work for you.',
  },
  {
    num: '02',
    title: 'Get Your Plan',
    desc: 'Receive a training programme built around your schedule, fitness level, and target events, delivered via TrainingPeaks or your preferred platform.',
  },
  {
    num: '03',
    title: 'Train & Improve',
    desc: 'Ongoing coaching, weekly adjustments, race strategy, and data-driven feedback to keep you progressing.',
  },
];

export const testimonials = [
  {
    quote:
      'My sporting challenge demanded that I ride over the Pyrenees from the Atlantic to the Mediterranean in 100 hours. Cycling 800kms over countless mountains. I got it done with hours to spare and in good shape by trusting Adam, trusting the process, and embracing the positive feeling that comes from following a well-structured training plan. A bout of Covid induced a massive self-doubt-wobble, but Adam’s calmness and words of wonderful wisdom became as important as the time spent on the bike. I’m in my sixties and not a life-long sportsman so this is not the exclusive domain of the elite athlete. If you are thinking of a challenge, sign up and then engage with Adam. You will be glad you did.',
    name: 'Philip',
    event: 'Pyrenees Crossing, 800km',
    coach: 'Adam',
  },
  {
    quote:
      'I started training with Cameron when I became determined to achieve my dream of a sub 4 hour marathon. This would mean knocking 20 minutes off my current time so it was a big challenge. After all the hard work, I achieved my goal. Cameron taught me so much about how to run effectively and efficiently and also how to enjoy the process and believe in myself. After this success I am now working towards my next goal of a Sprint Triathlon. Cameron provides specific targets for each of the disciplines and knows exactly what I need to do in order to improve.',
    name: 'Naomi',
    event: 'Sub-4 Hour Marathon',
    coach: 'Cameron',
  },
  {
    quote:
      'Thanks to Adam, I, a long-term road cyclist who had never run before, was able to complete a duathlon and a marathon with confidence and success! Without Adam’s custom training plans and positive mindset, I wouldn’t have been able to do it! His knowledge and expertise as a coach gave me the boost I needed to push beyond my limits and achieve personal bests in both competitions. Adam played a massive role in my accomplishments, and I am forever grateful for his support and mentorship.',
    name: 'Jason',
    event: 'Duathlon & Marathon',
    coach: 'Adam',
  },
  {
    quote:
      'Being coached by Adam gave me a clear, structured, personalised plan to follow, which enabled me to enjoy the training and fully trust that, if I followed his process, I’d get great results. I achieved a personal best race time only a few weeks after a ski injury and covid, thanks to Adam’s knowledge and experience to adapt my training. He guided me through a new plan that challenged me within my limits and I wouldn’t have had the same confidence and result without his coaching.',
    name: 'Karina',
    event: 'Personal Best Race Time',
    coach: 'Adam',
  },
  {
    quote:
      'Cameron always provides a clear, precise and effective program to follow and enjoy. He helped me train towards a marathon which was always a big goal of mine. Every step of the way he’s communicative, professional and resourceful and I couldn’t recommend him high enough. If you want any form of training be it triathlon, fitness or marathons, please don’t hesitate to be in contact. You won’t regret it!',
    name: 'Joe',
    event: 'Marathon',
    coach: 'Cameron',
  },
];

export const reasons = [
  {
    icon: '◆',
    title: 'Truly Personalised',
    desc: 'No templates. Every plan is built from scratch based on your goals, schedule, and current fitness. As your life changes, your plan adapts.',
  },
  {
    icon: '▲',
    title: 'Certified & Experienced',
    desc: 'Endurance Sport Coaching Institute and Ironman U certified coaches with 20+ years of combined experience across triathlon, running, and cycling.',
  },
  {
    icon: '◇',
    title: 'Data-Driven Progress',
    desc: 'Regular performance analysis using TrainingPeaks metrics. We track what matters and adjust your training based on real data, not guesswork.',
  },
  {
    icon: '▽',
    title: 'Life-First Coaching',
    desc: 'Training should enhance your life, not consume it. We build plans around your work, family, and commitments, not the other way around.',
  },
];

export const principles = [
  {
    icon: '◆',
    title: 'Built Around You',
    desc: 'Every training plan starts with a conversation about your life, not just your fitness. We design around your work schedule, family commitments, and personal goals.',
  },
  {
    icon: '▲',
    title: 'Communication First',
    desc: 'Coaching isn’t a one-way street. The best results come from genuine collaboration between coach and athlete, so we prioritise open dialogue, regular check-ins, and shared decision-making to keep your training aligned with how you’re feeling and performing.',
  },
  {
    icon: '◇',
    title: 'Science Meets Experience',
    desc: 'We combine evidence-based training methodology with years of real-world coaching experience. Every session has a purpose, and every plan has a structure.',
  },
  {
    icon: '▽',
    title: 'Long-Term Thinking',
    desc: 'We’re not interested in quick fixes. We build sustainable fitness that develops over months and years, so you keep improving season after season.',
  },
];

export interface Coach {
  id: string;
  name: string;
  base: string;
  photo: ImageMetadata;
  bio: string;
  careerHighs: string[];
  careerLows: string[];
}

export const coaches: Coach[] = [
  {
    id: 'adam',
    name: 'Adam Labbett',
    base: 'Switzerland',
    photo: adamPhoto,
    bio: 'Originally from the UK and now based in Switzerland, Adam has over a decade of experience in endurance sport. He specialises in building training programmes that fit around busy lifestyles, combining data-driven planning with a deep understanding of each athlete’s individual needs, whether you’re targeting your first sprint triathlon or chasing an Ironman PB. Adam believes that consistency, communication, and trust are the foundations of great coaching.',
    careerHighs: [
      'World Duathlon AG Champion',
      'European Duathlon AG Champion',
      'Ironman Copenhagen AG Winner with a time of 8:36',
      'Top 10 overall Ironman South American Championships (3rd in AG)',
      'Racing the Ironman World Championships in Hawaii',
      'Training in New Zealand for 6 months',
    ],
    careerLows: [
      'Getting hypothermia at Powerman Zoffingen Long Distance Duathlon World Championships',
      'Breaking wrist on the bike at Ironman Copenhagen (despite continuing on to win the race)',
    ],
  },
  {
    id: 'cameron',
    name: 'Cameron Keast',
    base: 'Spain',
    photo: cameronPhoto,
    bio: 'Originally from the UK and now based in Spain, Cameron brings a sport science background and a passion for helping athletes unlock their potential. He works with athletes of all levels, from complete beginners to experienced competitors. Cameron’s coaching philosophy centres on progressive overload, smart recovery, and making training something you look forward to every day.',
    careerHighs: [],
    careerLows: [],
  },
];

export const currencies = ['CHF', 'EUR', 'GBP'] as const;
export type Currency = (typeof currencies)[number];
export const defaultCurrency: Currency = 'EUR';

export interface Plan {
  name: string;
  desc: string;
  /** Monthly price per currency; a plan without one is priced on request. */
  prices?: Record<Currency, number>;
}

export const plans: Plan[] = [
  {
    name: 'Single Discipline',
    desc: 'Ongoing coaching, feedback, and structured training for one sport: swimming, cycling, or running.',
    prices: { CHF: 95, EUR: 100, GBP: 85 },
  },
  {
    name: 'Multi-Discipline',
    desc: 'Full coaching across multiple disciplines with training that adapts to your progress and schedule.',
    prices: { CHF: 185, EUR: 200, GBP: 170 },
  },
  {
    name: 'Custom',
    desc: 'Something different in mind? We’re happy to build a coaching arrangement that fits your specific needs.',
  },
];

export const premade = {
  label: 'Off the Shelf',
  title: 'Pre-Made Training Plans',
  desc: 'Prefer a ready-made plan? Browse our library of structured training plans on TrainingPeaks, designed for athletes who want expert programming without one-to-one coaching.',
  cta: 'Browse Plans on TrainingPeaks',
};

export const faqs = [
  {
    question: 'What platform do you use for training plans?',
    answer:
      'We deliver all training plans via TrainingPeaks, the industry-standard platform for endurance coaching. You’ll be able to see your workouts on your phone, sync them to your watch, and track your progress over time. That said, if you already use a different platform and prefer to stick with it, we’re always happy to work with whatever suits you best.',
  },
  {
    question: 'Can I pause my coaching?',
    answer:
      'Absolutely, you can pause at any time. Just give us a heads-up and we’ll pick things back up whenever you’re ready. No extra cost, no penalty.',
  },
  {
    question: 'Do you coach complete beginners?',
    answer:
      'Absolutely. Some of our most rewarding work has been with athletes who are completely new to endurance sport. We’ll build your fitness gradually and safely, with clear guidance at every step.',
  },
  {
    question: 'How do consultations work?',
    answer:
      'Your free initial consultation is a video call of up to 60 minutes where we learn about your goals, experience, and lifestyle. It’s also a chance for you to get to know us and make sure you’re happy that we’d work well together. Zero pressure, just an open conversation.',
  },
  {
    question: 'What if I’m training for a specific race?',
    answer:
      'Race-specific preparation is one of our specialities. We’ll build a periodised plan working backwards from your race date, with key sessions, taper strategy, race-day pacing, and nutrition guidance all included.',
  },
];

export const trainingOptions = [
  'Triathlon',
  'Ironman',
  'Marathon',
  'Running Event',
  'Cycling Event',
  'Swimming Event',
  'General Fitness',
  'Other',
];

export const referralOptions = ['Google Search', 'Instagram', 'Facebook', 'Friend / Referral', 'Other'];

export const countries = [
  { name: 'Australia', flag: '🇦🇺', dial: '+61' },
  { name: 'Austria', flag: '🇦🇹', dial: '+43' },
  { name: 'Belgium', flag: '🇧🇪', dial: '+32' },
  { name: 'Brazil', flag: '🇧🇷', dial: '+55' },
  { name: 'Canada', flag: '🇨🇦', dial: '+1' },
  { name: 'China', flag: '🇨🇳', dial: '+86' },
  { name: 'Croatia', flag: '🇭🇷', dial: '+385' },
  { name: 'Czech Republic', flag: '🇨🇿', dial: '+420' },
  { name: 'Denmark', flag: '🇩🇰', dial: '+45' },
  { name: 'Finland', flag: '🇫🇮', dial: '+358' },
  { name: 'France', flag: '🇫🇷', dial: '+33' },
  { name: 'Germany', flag: '🇩🇪', dial: '+49' },
  { name: 'Greece', flag: '🇬🇷', dial: '+30' },
  { name: 'Hong Kong', flag: '🇭🇰', dial: '+852' },
  { name: 'Hungary', flag: '🇭🇺', dial: '+36' },
  { name: 'India', flag: '🇮🇳', dial: '+91' },
  { name: 'Ireland', flag: '🇮🇪', dial: '+353' },
  { name: 'Israel', flag: '🇮🇱', dial: '+972' },
  { name: 'Italy', flag: '🇮🇹', dial: '+39' },
  { name: 'Japan', flag: '🇯🇵', dial: '+81' },
  { name: 'Luxembourg', flag: '🇱🇺', dial: '+352' },
  { name: 'Mexico', flag: '🇲🇽', dial: '+52' },
  { name: 'Netherlands', flag: '🇳🇱', dial: '+31' },
  { name: 'New Zealand', flag: '🇳🇿', dial: '+64' },
  { name: 'Norway', flag: '🇳🇴', dial: '+47' },
  { name: 'Poland', flag: '🇵🇱', dial: '+48' },
  { name: 'Portugal', flag: '🇵🇹', dial: '+351' },
  { name: 'Romania', flag: '🇷🇴', dial: '+40' },
  { name: 'Singapore', flag: '🇸🇬', dial: '+65' },
  { name: 'Slovakia', flag: '🇸🇰', dial: '+421' },
  { name: 'Slovenia', flag: '🇸🇮', dial: '+386' },
  { name: 'South Africa', flag: '🇿🇦', dial: '+27' },
  { name: 'South Korea', flag: '🇰🇷', dial: '+82' },
  { name: 'Spain', flag: '🇪🇸', dial: '+34' },
  { name: 'Sweden', flag: '🇸🇪', dial: '+46' },
  { name: 'Switzerland', flag: '🇨🇭', dial: '+41' },
  { name: 'Taiwan', flag: '🇹🇼', dial: '+886' },
  { name: 'Ukraine', flag: '🇺🇦', dial: '+380' },
  { name: 'United Arab Emirates', flag: '🇦🇪', dial: '+971' },
  { name: 'United Kingdom', flag: '🇬🇧', dial: '+44' },
  { name: 'United States', flag: '🇺🇸', dial: '+1' },
];
export const defaultCountry = 'United Kingdom';
