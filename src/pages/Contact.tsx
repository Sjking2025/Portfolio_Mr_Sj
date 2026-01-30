
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, Linkedin, Github, Twitter, Instagram, Send, CheckCircle, XCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isOrbitActive, setIsOrbitActive] = useState(false);

  // Real-time IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const istDate = now.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      setCurrentTime(istTime);
      setCurrentDate(istDate);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  // Web3Forms API integration
  // Get your free access key from: https://web3forms.com/
  const WEB3FORMS_ACCESS_KEY = "512c6a71-ccd7-4d84-aa23-63442b890a14";

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        reset();
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "sanjayias91@gmail.com",
      description: "Send me an email anytime"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+91 6383824086",
      description: "Call me during business hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Chennai, Tamil Nadu",
      description: "Available for local meetings"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Local Time (IST)",
      value: currentTime || "Loading...",
      description: currentDate || "India Standard Time"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sanjayr005/", icon: <Linkedin className="w-5 h-5" />, color: "#0077B5" },
    { name: "GitHub", url: "https://github.com/Sjking2025/", icon: <Github className="w-5 h-5" />, color: "#181717" },
    { name: "Twitter", url: "#", icon: <Twitter className="w-5 h-5" />, color: "#1DA1F2" },
    { name: "Instagram", url: "https://www.instagram.com/itz_me_sj20/", icon: <Instagram className="w-5 h-5" />, color: "#E4405F" }
  ];

  return (
    <div className="min-h-screen px-4 pt-32 pb-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">Get In Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="glass-effect p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-6">Send me a message</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full p-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <span className="text-red-400 text-sm">{errors.name.message}</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full p-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <span className="text-red-400 text-sm">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full p-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <span className="text-red-400 text-sm">{errors.subject.message}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={6}
                      className="w-full p-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <span className="text-red-400 text-sm">{errors.message.message}</span>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Success message */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-center flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" /> Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-center flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" /> {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const isClockCard = method.title === "Local Time (IST)";

                  return isClockCard ? (
                    /* Special highlighted IST Clock card */
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="relative p-[2px] rounded-2xl overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))'
                      }}
                    >
                      {/* Animated gradient border glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-50"
                        animate={{
                          boxShadow: [
                            '0 0 20px hsl(var(--primary) / 0.5)',
                            '0 0 40px hsl(var(--primary) / 0.8)',
                            '0 0 20px hsl(var(--primary) / 0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />

                      <div className="relative glass-effect p-6 rounded-2xl bg-background/95">
                        <div className="flex items-center space-x-4">
                          {/* Pulsing clock icon */}
                          <motion.div
                            className="relative"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <div className="absolute inset-0 rounded-full bg-primary/30 blur-md"></div>
                            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                              {method.icon}
                            </div>
                          </motion.div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-primary">{method.title}</h4>
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                            </div>
                            {/* Large animated time display */}
                            <motion.p
                              key={currentTime}
                              initial={{ opacity: 0.5 }}
                              animate={{ opacity: 1 }}
                              className="text-2xl font-bold gradient-text tracking-wider font-mono"
                            >
                              {method.value}
                            </motion.p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Regular contact cards */
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="glass-effect p-6 rounded-2xl flex items-center space-x-4 hover-lift"
                    >
                      <div className="text-3xl">{method.icon}</div>
                      <div>
                        <h4 className="font-semibold">{method.title}</h4>
                        <p className="text-primary font-medium">{method.value}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social links - Solar System Orbit Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="glass-effect p-8 rounded-2xl"
              >
                <div
                  className="relative h-72 flex items-center justify-center group/orbit"
                  onMouseEnter={() => setIsOrbitActive(true)}
                  onMouseLeave={() => setIsOrbitActive(false)}
                >
                  {/* Central Element - The Sun */}
                  <motion.div
                    className="absolute z-10 w-28 h-28 rounded-full flex items-center justify-center cursor-pointer"
                    animate={{
                      background: isOrbitActive
                        ? 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, #FF6B00 100%)'
                        : 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                      boxShadow: isOrbitActive
                        ? '0 0 60px #FFD700, 0 0 100px #FFA50080, 0 0 140px #FF6B0040'
                        : '0 8px 30px hsl(var(--primary) / 0.3)',
                      scale: isOrbitActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: isOrbitActive ? 1.15 : 1.05 }}
                  >
                    <motion.span
                      className="text-sm font-bold text-center leading-tight"
                      animate={{
                        scale: isOrbitActive ? 1 : 1,
                        color: isOrbitActive ? '#4A2500' : '#ffffff'
                      }}
                    >
                      {isOrbitActive ? '☀️' : "Let's\nConnect"}
                    </motion.span>
                  </motion.div>

                  {/* Orbit Ring - appears on hover */}
                  <motion.div
                    className="absolute w-56 h-56 rounded-full border-2 border-dashed"
                    animate={{
                      opacity: isOrbitActive ? 1 : 0,
                      scale: isOrbitActive ? 1 : 0.5,
                      borderColor: isOrbitActive ? 'hsl(var(--primary) / 0.4)' : 'transparent'
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Orbiting Icons */}
                  <div className={`absolute w-56 h-56 ${isOrbitActive ? 'animate-orbit' : ''}`}>
                    {socialLinks.map((social, index) => {
                      const angle = (index * 360) / socialLinks.length;
                      const radius = 112;
                      const targetX = Math.cos((angle - 90) * Math.PI / 180) * radius;
                      const targetY = Math.sin((angle - 90) * Math.PI / 180) * radius;

                      return (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute w-12 h-12 rounded-full flex items-center justify-center hover:scale-125 hover:z-20 transition-transform"
                          style={{
                            backgroundColor: social.color === '#181717' ? '#ffffff' : social.color,
                            color: social.color === '#181717' ? '#181717' : '#ffffff',
                            boxShadow: `0 4px 20px ${social.color}60`,
                            left: 'calc(50% - 24px)',
                            top: 'calc(50% - 24px)',
                          }}
                          animate={{
                            x: isOrbitActive ? targetX : 0,
                            y: isOrbitActive ? targetY : 0,
                            scale: isOrbitActive ? 1 : 0,
                            opacity: isOrbitActive ? 1 : 0,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 20,
                            delay: isOrbitActive ? index * 0.1 : 0,
                          }}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className={isOrbitActive ? 'animate-counter-orbit' : ''}>
                            {social.icon}
                          </span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-2">
                  {isOrbitActive ? 'Click any planet to connect!' : 'Hover the sun to explore'}
                </p>
              </motion.div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="glass-effect p-6 rounded-2xl text-center space-y-4"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-400">Available for new projects</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  I'm currently accepting new client work and interesting project collaborations.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
