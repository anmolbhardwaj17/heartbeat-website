# The $0 Heart Rate Monitor That Lives in Your Pocket.

*No watch. No band. No gadget. Just your phone, awkwardly pressed against your chest.*

---

![HeartBeat Hero Banner](<!-- IMAGE: hero-banner.png -->)

## It started with a dumb stat

6.8 billion people have a smartphone.

Only 1.4 billion have a smartwatch or fitness band.

So there's like... 5 billion people out there carrying a device that can literally run AI models and stream Netflix in 4K, but can't tell them their own heart rate?

That felt wrong. So I did what any sane developer does at 2am — I opened a new project and started coding.

---

## So what is HeartBeat?

It's an app that turns your phone's microphone into a heart rate monitor.

You put your phone against your chest. You hit start. You wait 30 seconds. And then you see your BPM, a live waveform of your actual heartbeat, your heart rate zone, and a confidence score — all without internet, without an account, and without spending a single rupee.

![App Screenshot](<!-- IMAGE: app-screenshot.png -->)

That's the whole pitch. There's no twist.

---

## "But why though?"

Because heart rate monitoring shouldn't be a luxury.

Look, your phone's microphone can pick up your voice from across a noisy room. It can isolate your words during a phone call on a busy street. You're telling me it can't detect a literal organ thumping inside your chest cavity?

It absolutely can. The hardware has been there for years. Somebody just needed to write the software.

Hi. I'm somebody.

Every phone ships with a microphone sensitive enough to capture the low-frequency mechanical vibrations of a heartbeat. That's not marketing — that's physics. HeartBeat just takes that raw audio, cleans it up, finds the pattern, and tells you how fast your heart is beating.

Free. Open source. Runs entirely on your phone. No data goes anywhere. Not even to me. I don't want it.

---

## How it works (the non-boring version)

Three steps. Thirty seconds. Your heart rate.

![How It Works](<!-- IMAGE: how-it-works.png -->)

**Step 1: Awkwardly hold your phone against your chest**
Mic side flat against the left side of your chest. Bare skin works best. Yes, you'll look weird doing this. That's the price of innovation.

**Step 2: Don't move. Don't talk. Don't breathe too loudly.**
Just kidding about the breathing part. But seriously — stay still. The mic is picking up vibrations, and your fidgeting sounds a lot like a heartbeat to a bandpass filter.

**Step 3: Get your results**
30 seconds later: BPM, heart rate zone, beat pattern, confidence level. Saved locally. No cloud. No sync. No "please create an account to continue."

---

## The nerdy part (for my fellow engineers)

Alright, let's talk signal processing. This is the fun bit.

```
Microphone → Butterworth Bandpass (15–120 Hz) → Autocorrelation → BPM
```

### Raw audio capture

The mic records at 44,100 samples per second. CD quality. At this resolution, heartbeat vibrations are definitely in the signal — they're just drowning in a sea of noise (your breathing, room hum, that truck outside, etc.)

### Butterworth bandpass filter

A human heartbeat lives between 15 Hz and 120 Hz. Everything outside that range is useless to us.

So we throw a 4th-order Butterworth bandpass filter at it. Why Butterworth? Because it has a maximally flat frequency response in the passband — fancy way of saying it doesn't mess with the frequencies we actually care about. It just nukes everything else.

After filtering, what remains is (mostly) the rhythmic thump-thump of your heart.

### Autocorrelation

Now we need to figure out *how often* that thump repeats. Enter autocorrelation.

You take the signal, make a copy, slide one over the other, and measure how well they match at each offset. A heart beating at 72 BPM repeats every ~833ms. When you slide by exactly 833ms, the correlation spikes hard. That spike IS your heart rate.

It's computationally cheap, surprisingly robust to noise, and runs comfortably in real time on basically any phone made in the last 8 years.

### The output

Dominant autocorrelation peak → BPM. Validated against physiological bounds (40–180 BPM). Confidence score computed. Heart rate zone classified. Waveform rendered. All happening live, all on-device.

**Zero network calls. Not one. The app doesn't even have internet permission.**

---

## The stack

For the curious:

| What | How |
|------|-----|
| Android | Kotlin + Jetpack Compose |
| iOS | Swift + SwiftUI |
| DSP (Android) | Custom implementation in Kotlin |
| DSP (iOS) | Apple's vDSP / Accelerate |
| Website | React + Vite + GSAP |
| License | Open Source |

![Tech Stack](<!-- IMAGE: tech-section.png -->)

---

## Features (the quick rundown)

**Real-time BPM** — Your heart rate within seconds. Not minutes. Seconds.

**Live waveform** — You can literally watch your heartbeat draw itself on screen. It's weirdly addictive.

**Heart rate zones** — Resting, Normal, Elevated, Active, Intense. Color-coded because who reads labels.

**Session history** — Every reading saved locally. Track yourself over time. All on-device.

**30-second readings** — Place. Wait. Done.

**100% offline** — No internet. No cloud. No accounts. No tracking. No analytics. I literally cannot see your data even if I wanted to.

![Features](<!-- IMAGE: features.png -->)

---

## Things I deliberately didn't do

**No login screen.** You open the app. It works. Revolutionary, I know.

**No onboarding carousel.** You're an adult. You can figure out "press the button."

**No premium tier.** There's no "HeartBeat Pro" waiting to upsell you. Free means free. Forever.

**No ads.** Not now. Not later. Not "just one small banner." No.

**No data collection.** The app has no networking code. It is architecturally impossible for your data to leave your phone. This isn't a privacy policy promise — it's a technical fact. Go check the source code.

---

## About that iPhone version...

So here's a fun story.

The iOS version of HeartBeat? It's built. Fully functional. SwiftUI, vDSP, the whole thing. It works beautifully.

It's sitting on my Mac right now. Ready to go.

The problem? Apple charges $99/year for a developer account to publish on the App Store. And I am, how do I put this... *between funding rounds*. (Translation: I'm broke.)

So if you're an iOS user reading this with a burning desire to check your heart rate using your phone's microphone — the app exists. It's real. It works. It's just trapped behind Apple's paywall like a heart behind a ribcage. Poetic, isn't it?

**Android users:** [you're good, go download it.](https://play.google.com/store)

**iPhone users:** coming soon. Probably. Unless someone wants to [sponsor a dev account](https://anmolbhardwaj.com). Just putting that out there. No pressure. Some pressure.

---

## The honest disclaimer

HeartBeat is **not a medical device.** Full stop.

It's an experimental tool. Accuracy varies based on your phone model, mic quality, placement, ambient noise, what you're wearing, and probably the alignment of Jupiter.

Don't use it to diagnose anything. Don't use it in emergencies. Don't cancel your doctor's appointment because HeartBeat said you're fine.

Use it because it's cool. Use it to build a rough baseline. Use it because the fact that your phone can hear your heartbeat is genuinely wild and you want to see it for yourself.

---

## Why I made this (the real reason)

I grew up in a place where most people don't own a smartwatch. Not because they don't care about health — they just have other priorities for that money. A ₹30,000 fitness band isn't happening when you're stretching a budget.

But almost everyone has a phone.

I wanted to prove that basic health awareness doesn't need to cost anything. That the hardware is already there. That open source can solve real problems for real people — not just provide resume fodder for developers.

HeartBeat is small. It does one thing. But it does it for free, for everyone, forever.

---

## Try it

**Android:** [Google Play](https://play.google.com/store)
**iPhone:** *existential crisis* (coming soon)
**Source:** [GitHub](https://github.com/anmolbhardwaj17/heartbeat-website)
**Website:** [heartbeat.anmolbhardwaj.com](https://heartbeat.anmolbhardwaj.com)

---

![Footer](<!-- IMAGE: footer.png -->)

*Your heartbeat deserves to be heard.*

---

*Built by [Anmol Bhardwaj](https://anmolbhardwaj.com) — probably while his own heart rate was elevated from debugging autocorrelation at 3am.*
