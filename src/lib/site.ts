import type { SimpleIcon } from 'simple-icons'
import {
  siGithub,
  siGmail,
  siInstagram,
  siJavascript,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  siWhatsapp,
} from 'simple-icons'

import Bokurce from '../assets/images/projects/bokurce.webp'
import FootballApi from '../assets/images/projects/football-api.webp'
import GPMtuhaha from '../assets/images/projects/gpm-tuhaha.webp'
import smp28malteng from '../assets/images/projects/smp28malteng.webp'
import NegeriTuhaha from '../assets/images/projects/tuhaha.webp'

/**
 * Single source of truth for portfolio content.
 * Every section reads from here, so copy and links are edited in one place.
 */

export const email = 'achelsahetapy10@gmail.com'

export const site = {
  name: 'Chelo Sahetapy',
  shortName: 'Chelo',
  role: 'Frontend Developer',
  email,
  location: 'West Java',
  age: 19,
} as const

export const mailto = (subject = 'Hello from your portfolio') =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`

export type StackItem = {
  name: string
  icon: SimpleIcon
}

export const stack: StackItem[] = [
  { name: 'JavaScript', icon: siJavascript },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'React.js', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'GitHub', icon: siGithub },
]

export type SocialKey = 'instagram' | 'linkedin' | 'whatsapp' | 'gmail' | 'github'

export type Social = {
  key: SocialKey
  label: string
  handle: string
  href: string
  path: string
  /** Open in a new tab. Mailto links stay in place. */
  external: boolean
  /** Surface in the navbar and the contact footer as an icon. */
  primary: boolean
}

/** Edit these, the hrefs below are derived from them. */
export const socialHandles = {
  github: 'Achel-Sahe',
  instagram: 'chelo.shtpy',
  linkedin: 'marcelino-sahetapy',
  /** Country code first, digits only, no + and no spaces. */
  whatsapp: '6281240941578',
} as const

/** Simple Icons ships no LinkedIn glyph, so its path lives here. */
const linkedinPath =
  'M6 1.5h12A4.5 4.5 0 0 1 22.5 6v12a4.5 4.5 0 0 1-4.5 4.5H6A4.5 4.5 0 0 1 1.5 18V6A4.5 4.5 0 0 1 6 1.5zM8.55 6.95a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM5.4 9.8h2.5v9.7H5.4zM10.1 9.8h2.4v1.3h.05a3.2 3.2 0 0 1 5.55 2.05v5.35h-2.5v-4.75a1.35 1.35 0 0 0-2.7 0v4.75h-2.5z'

export const socials: Social[] = [
  {
    key: 'github',
    label: 'GitHub',
    handle: socialHandles.github,
    href: `https://github.com/${socialHandles.github}`,
    path: siGithub.path,
    external: true,
    primary: true,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    handle: `@${socialHandles.instagram}`,
    href: `https://instagram.com/${socialHandles.instagram}`,
    path: siInstagram.path,
    external: true,
    primary: true,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: socialHandles.linkedin,
    href: `https://linkedin.com/in/${socialHandles.linkedin}`,
    path: linkedinPath,
    external: true,
    primary: true,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    handle: `+${socialHandles.whatsapp}`,
    href: `https://wa.me/${socialHandles.whatsapp}`,
    path: siWhatsapp.path,
    external: true,
    primary: false,
  },
  {
    key: 'gmail',
    label: 'Gmail',
    handle: email,
    href: `mailto:${email}`,
    path: siGmail.path,
    external: false,
    primary: false,
  },
]

export type Project = {
  title: string
  desc: string
  techStack: string[]
  image?: string
  imageAlt?: string
  href?: string
  /** Used for the visual placeholder until a real project screenshot is added. */
  accent?: string
}

export const projects: Project[] = [
  {
    title: 'smpn28malteng',
    desc: 'Official website for SMP Negeri 28 Maluku Tengah, showcasing school information and activities.',
    techStack: ['JavaScript', 'Tailwind', 'React.js', 'GSAP'],
    image: smp28malteng,
    imageAlt: 'SMP Negeri 28 Maluku Tengah website preview',
    href: 'https://smp28malteng.vercel.app/',
    accent: '#cdd9d1',
  },
  {
    title: 'Jemaat GPM Tuhaha',
    desc: 'Church website with GSAP animations, WebGL 3D hero, and a contact form wired to WhatsApp.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'GSAP (ScrollTrigger)'],
    image: GPMtuhaha,
    imageAlt: 'GPM Tuhaha church website preview',
    href: 'https://tuhaha.id',
    accent: '#d5d1e8',
  },
  {
    title: 'Tuhaha.id',
    desc: 'Official government website for Negeri Tuhaha, providing information about the village, government, and community.',
    techStack: ['CSS', 'React.js'],
    image: NegeriTuhaha,
    imageAlt: 'Tuhaha.id government website preview',
    href: 'https://tuhaha.id',
    accent: '#e9d6c6',
  },
  {
    title: 'Football Web',
    desc: 'Modern football stats hub for Europe\u2019s top 5 leagues with cinematic animations.',
    techStack: ['Next.js', 'React', 'Tailwind', 'API-Football', 'GSAP', 'Lenis'],
    image: FootballApi,
    imageAlt: 'Football stats website preview',
    href: 'https://football-data-zeta.vercel.app/',
    accent: '#d8dce4',
  },
  {
    title: 'Bokurce Library',
    desc: 'Library management system, PHP + MySQL, Stack data structure.',
    techStack: ['PHP', 'MySQL', 'CSS', 'JavaScript', 'GSAP'],
    image: Bokurce,
    imageAlt: 'Bokurce Library website preview',
    href: 'https://bokurce-library.lovestoblog.com/',
    accent: '#e4ded2',
  },
]
