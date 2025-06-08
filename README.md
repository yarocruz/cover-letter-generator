# 📝 AI Cover Letter Generator

A simple, fast, and affordable AI-powered web app that generates personalized cover letters based on job descriptions and your background. Built with **Next.js**, **Tailwind CSS**, **OpenAI**, and **Stripe**.

## 🚀 Features

- 🎯 Generate high-quality, personalized cover letters in seconds
- 🤖 Powered by OpenAI GPT (3.5-turbo)
- 💬 Choose tone: Formal, Friendly, Confident
- 💵 One-time payment via Stripe (\$5 for 3 cover letters)
- ⚡ Lightweight, responsive UI (Tailwind + Next.js)
- 🔐 Environment variables for secure API access
- ☁️ Deployable to Vercel out of the box

---

## 📸 Demo

[Live Demo](https://your-deployment-url.com) – _replace with your actual deployed URL_

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) – Frontend & API routes
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [OpenAI API](https://platform.openai.com/docs/introduction) – Natural language generation
- [Stripe](https://stripe.com/) – Payment processing
- [Vercel](https://vercel.com/) – Hosting & CI/CD

---

## 🧑‍💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-cover-letter-generator.git
cd ai-cover-letter-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env.local file

```env
# OpenAI API key
OPENAI_API_KEY=your-openai-key

# Stripe keys
STRIPE_SECRET_KEY=your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
```

### 4. Run the App

```bash
npm run dev
```

## 📁 Project Structure

```bash
/pages
  index.js                # Home (cover letter form)
  pricing.js              # Pricing page
  success.js              # Post-checkout success page
  /api
    generate.js           # OpenAI integration
    create-checkout-session.js  # Stripe payment route

/styles
  globals.css             # Tailwind imports
```

## ✅ TODO / Future Features

- [ ] Login system with usage tracking
- [ ] Save cover letters to user profile
- [ ] PDF download option
- [ ] More tones / customization
- [ ] Resume + portfolio generator

## 🧠 License

MIT — free for personal and commercial use. Attribution appreciated.

## 🙋 Author

Created by Jay Cruz
Inspired by job-seeking pain, fueled by caffeine ☕️
