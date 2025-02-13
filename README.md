# Stephen Wise's Personal Blog

A modern personal blog built with Next.js and Ghost CMS. This project combines the power of Ghost's content management system with a beautifully designed Next.js frontend.

## Features

- Modern, responsive design
- Ghost CMS integration for content management
- Server-side rendering with Next.js
- TailwindCSS for styling
- Automatic image optimization
- SEO-friendly

## Tech Stack

- Next.js 14
- Ghost CMS
- TailwindCSS
- TypeScript

## Local Development

1. Clone the repository:
```bash
git clone [your-repo-url]
cd [repo-name]
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
GHOST_URL=http://localhost:2368
GHOST_CONTENT_API_KEY=[your-content-api-key]
```

4. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## Ghost CMS Setup

1. Install Ghost CLI:
```bash
npm install ghost-cli@latest -g
```

2. Install Ghost locally:
```bash
ghost install local
```

3. Access Ghost Admin at `http://localhost:2368/ghost/` to create content.

## Deployment

This project is configured for deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

## License

MIT License - feel free to use this project as a template for your own blog. 