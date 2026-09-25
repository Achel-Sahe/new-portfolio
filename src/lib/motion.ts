import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EASE = 'expo.out'

export const STAGE = {
  header: 0.06,
  navLink: 0.16,
  social: 0.24,
  portrait: 0.1,
  wordmark: 0.16,
  eyebrow: 0.12,
  line: 0.2,
  meta: 0.44,
  actions: 0.52,
  card: 0.42,
  partners: 0.52,
  note: 0.66,
} as const
