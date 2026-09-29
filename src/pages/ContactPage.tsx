import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, Clock, Globe, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PreferredContactMethod } from '../types';

export const ContactPage: React.FC = () => {
  const { contactSettings, submitInquiry } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<PreferredContactMethod>('Phone');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    // Use a synthetic general inquiry listing placeholder for tracking
    submitInquiry({
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'N/A',
      contactMethod,
      message: message || 'General inquiry regarding Philmen platform offerings.',
      listing: {
        id: 'GEN-INQ',
        title: 'General Customer Support & Consultation',
        slug: 'general-support',
        type: 'Service',
        category: 'Customer Service',
        shortDescription: 'General customer consultation via Philmen contact form',
        fullDescription: 'Customer reached out through main contact page.',
        images: ['https://i.ibb.co/sJcgCgS7/Philmen.png'],
        price: 'Free Consultation',
        priceType: 'service',
        priceDisplay: 'Free Consultation',
        location: 'Accra, Ghana',
        status: 'published',
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    });

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
          Official Philmen Communications
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Contact Philmen
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Connect directly with Philmen support for product inquiries, car rental bookings, vehicle sales, and home appliance orders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Official Contact Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold font-display text-white">
              Official Philmen Desk
            </h2>

            <div className="space-y-4 text-xs">
              
              {/* Phone */}
              <div className="flex items-start gap-3.5 p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Primary Public Phone:</div>
                  <a
                    href={`tel:${contactSettings.publicPhone}`}
                    className="text-base font-bold text-white font-mono hover:text-amber-400 transition-colors"
                  >
                    {contactSettings.publicPhone}
                  </a>
                  <div className="text-[11px] text-slate-400 mt-0.5">Voice calls & inquiries</div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5 p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Primary Public WhatsApp:</div>
                  <a
                    href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-bold text-emerald-400 font-mono hover:text-emerald-300 transition-colors"
                  >
                    {contactSettings.publicWhatsApp}
                  </a>
                  <div className="text-[11px] text-slate-400 mt-0.5">Instant messaging & photos</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Booking & Support Email:</div>
                  <a
                    href={`mailto:${contactSettings.notificationEmail}`}
                    className="text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors break-all"
                  >
                    {contactSettings.notificationEmail}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5 p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Customer Service Hours:</div>
                  <div className="text-sm font-semibold text-white">
                    {contactSettings.customerServiceHours}
                  </div>
                  <div className="text-[11px] text-slate-400">Available 7 days a week</div>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3.5 p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Official Website:</div>
                  <div className="text-sm font-semibold text-white">
                    {contactSettings.website}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Interactive Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Fast Contact Form</span>
            <h2 className="text-2xl font-bold text-slate-900 font-display mt-1">Send a Message to Philmen</h2>
            <p className="text-xs text-slate-500 mt-1">
              Have a general inquiry or looking for an unlisted item? Submit your request below.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50/50 rounded-2xl border border-emerald-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Inquiry Dispatched Successfully</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{customerName}</span>. Your message has been sent to <span className="font-semibold text-slate-900">{contactSettings.notificationEmail}</span>. A Philmen representative will contact you via {contactMethod}.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCustomerName('');
                  setCustomerPhone('');
                  setCustomerEmail('');
                  setMessage('');
                }}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Darko"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0244123456"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. samuel@example.com"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    value={contactMethod}
                    onChange={e => setContactMethod(e.target.value as PreferredContactMethod)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Phone">Phone Call (0546320901)</option>
                    <option value="WhatsApp">WhatsApp (0536287637)</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Inquiry / Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can Philmen help you today? Provide any specific product or service details..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Your contact details are protected and only used by Philmen staff to reply to your inquiry.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit to Philmen</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
