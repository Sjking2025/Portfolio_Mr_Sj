
import React, { useState } from 'react';
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

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  // Web3Forms API integration
  // Get your free access key from: https://web3forms.com/
  const WEB3FORMS_ACCESS_KEY = "17002730-cf21-4075-8e92-a3a6678d28d7";

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
      title: "Response Time",
      value: "< 24 hours",
      description: "I'll get back to you quickly"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sanjayr005/", icon: <Linkedin className="w-5 h-5" />, color: "#0077B5" },
    { name: "GitHub", url: "https://github.com/Sjking2025/", icon: <Github className="w-5 h-5" />, color: "#181717" },
    { name: "Twitter", url: "#", icon: <Twitter className="w-5 h-5" />, color: "#1DA1F2" },
    { name: "Instagram", url: "#", icon: <Instagram className="w-5 h-5" />, color: "#E4405F" }
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
                {contactMethods.map((method, index) => (
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
                ))}
              </div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="glass-effect p-6 rounded-2xl space-y-4"
              >
                <h4 className="font-semibold text-center">Follow me on social media</h4>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-300"
                      style={{ backgroundColor: `${social.color}20`, color: social.color }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
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
